
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDownIcon } from '@radix-ui/react-icons'

interface TagsDropdownProps {
    tags: string[]
    visibleCount?: number
    type: 'question' | 'company'
}

const BRIGHT_COLORS = [
    'bg-[#FF4D4D] text-white',
    'bg-[#FFB302] text-gray-900',
    'bg-[#00CC66] text-white',
    'bg-[#FF8C1A] text-white',
    'bg-[#1AC8ED] text-gray-900',
    'bg-[#FF6B35] text-white',
    'bg-[#2DD881] text-gray-900',
    'bg-[#FFD301] text-gray-900',
    'bg-[#00A3FF] text-white',
    'bg-[#FF8427] text-white',
    'bg-[#00B894] text-white',
    'bg-[#FFA41B] text-gray-900',
    'bg-[#38B000] text-white',
    'bg-[#FF5714] text-white',
    'bg-[#4CB944] text-white',
    'bg-[#FFB700] text-gray-900',
    'bg-[#FF7F11] text-white',
    'bg-[#2D936C] text-white',
    'bg-[#FF9505] text-white',
    'bg-[#9BC53D] text-gray-900',
]

const tagColorMap = new Map<string, string>()
let colorIndex = 0

const getRandomColor = (tag: string) => {
    if (!tagColorMap.has(tag)) {
        tagColorMap.set(tag, BRIGHT_COLORS[colorIndex % BRIGHT_COLORS.length])
        colorIndex++
    }
    return tagColorMap.get(tag)!
}

export function TagsDropdown({ tags, visibleCount = 2 }: TagsDropdownProps) {
    const visibleTags = tags.slice(0, visibleCount)
    const hiddenTags = tags.slice(visibleCount)

    return (
        <div className="flex items-center gap-2">
            {visibleTags.map((tag) => (
                <span
                    key={tag}
                    className={`
            px-2.5
            py-1
            text-xs
            font-medium
            rounded-full
            ${getRandomColor(tag)}
            shadow-sm
            hover:opacity-90
            transition-all
            duration-200
            border
            border-opacity-20
            border-white
          `}
                >
                    {tag}
                </span>
            ))}

            {hiddenTags.length > 0 && (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button className="
              px-2.5
              py-1
              text-xs
              font-medium
              rounded-full
              bg-solid-purple-light
              text-white
              hover:bg-solid-purple-dark
              transition-all
              duration-200
              flex
              items-center
              gap-1
              shadow-sm
            ">
                            +{hiddenTags.length} <ChevronDownIcon />
                        </button>
                    </DropdownMenu.Trigger>

                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="
                z-50
                bg-bg-purple
                rounded-lg
                p-2.5
                shadow-xl
                border
                border-border-purple-dark
                min-w-[150px]
              "
                            sideOffset={5}
                        >
                            <div className="flex flex-col gap-2">
                                {hiddenTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`
                      px-2.5
                      py-1
                      text-xs
                      font-medium
                      rounded-full
                      ${getRandomColor(tag)}
                      hover:opacity-90
                      transition-all
                      duration-200
                      whitespace-nowrap
                      shadow-sm
                      border
                      border-opacity-20
                      border-white
                    `}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            )}
        </div>
    )
}
