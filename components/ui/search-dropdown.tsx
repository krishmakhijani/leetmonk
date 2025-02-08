
import * as Popover from '@radix-ui/react-popover'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

interface SearchDropdownProps {
    value: string
    onChange: (value: string) => void
    placeholder: string
    label: string
    options?: { label: string; value: string }[]
}

export function SearchDropdown({ value, onChange, placeholder, label, options }: SearchDropdownProps) {
    const isActive = value.length > 0

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className={`
          p-1.5
          rounded-md
          hover:bg-interactive-purple-medium
          text-text-purple-light
          transition-colors
          flex
          items-center
          gap-1.5
          text-sm
          ${isActive ? 'bg-interactive-purple-medium' : ''}
        `}>
                    {label}
                    <MagnifyingGlassIcon className="h-4 w-4" />
                    {isActive && (
                        <span className="
              w-2
              h-2
              rounded-full
              bg-solid-purple-light
            "/>
                    )}
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    className="
            z-50
            w-72
            p-3
            rounded-md
            shadow-lg
            bg-interactive-purple-dark
            border
            border-border-purple-dark
          "
                    sideOffset={5}
                    align="start"
                >
                    {options ? (
                        <div className="space-y-2">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => onChange(option.value)}
                                    className={`
                    w-full
                    px-3
                    py-2
                    text-left
                    text-sm
                    rounded-md
                    transition-colors
                    ${value === option.value
                                            ? 'bg-solid-purple-light text-white'
                                            : 'text-text-purple-light hover:bg-interactive-purple-medium'
                                        }
                  `}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder={placeholder}
                            className="
                w-full
                px-3
                py-2
                text-sm
                bg-bg-purple
                border
                border-border-purple-dark
                rounded-md
                text-text-purple-light
                placeholder:text-text-purple-dark
                focus:outline-none
                focus:border-solid-purple-light
                transition-colors
              "
                            autoFocus
                        />
                    )}
                    <Popover.Arrow className="fill-interactive-purple-dark" />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}
