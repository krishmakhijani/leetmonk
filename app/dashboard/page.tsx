'use client'

import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import * as Tooltip from '@radix-ui/react-tooltip'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { TagsDropdown } from '@/components/ui/TagsDropdown'
import { SearchDropdown } from '@/components/ui/search-dropdown'
import { Pagination } from '@/components/ui/Pagination'
import { PageSizeSelector } from '@/components/ui/PageSizeSelector'
import Loading from './loading'
import { LogOutIcon } from 'lucide-react'


function LeetCodeIcon({ className = "", size = 20 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            className={className}
        >
            <path
                fill="#B3B1B0"
                d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"
            />
            <path
                fill="#E7A41F"
                d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"
            />
            <path
                fill="#070706"
                d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"
            />
        </svg>
    )
}

function YouTubeIcon({ className = "", size = 20 }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width={size}
            height={size}
            className={className}
        >
            <g fillRule="evenodd" clipRule="evenodd">
                <path
                    className="transition-colors duration-200 group-hover:fill-[#E53935]"
                    fill="#F44336"
                    d="M15.32 4.06c-.434-.772-.905-.914-1.864-.968C12.498 3.027 10.089 3 8.002 3c-2.091 0-4.501.027-5.458.091-.957.055-1.429.196-1.867.969C.23 4.831 0 6.159 0 8.497v.008c0 2.328.23 3.666.677 4.429.438.772.909.912 1.866.977.958.056 3.368.089 5.459.089 2.087 0 4.496-.033 5.455-.088.959-.065 1.43-.205 1.864-.977.451-.763.679-2.101.679-4.429v-.008c0-2.339-.228-3.667-.68-4.438z"
                />
                <path
                    className="transition-colors duration-200 group-hover:fill-[#FFFFFF]"
                    fill="#FAFAFA"
                    d="M6 11.5v-6l5 3z"
                />
            </g>
        </svg>
    )
}
interface Question {
    id: string
    questionId: number
    name: string
    questionUrl: string
    questionTags: string[]
    companyTags: string[]
    totalSubmissions: number
    totalAccepted: number
    difficulty: 'Easy' | 'Medium' | 'Hard'
}

interface Filters {
    solved: string
    questionId: string
    name: string
    tags: string
    companies: string
    acceptance: string
}

const ITEMS_PER_PAGE = 15

export default function DashboardPage() {
    const router = useRouter()
    const [questions, setQuestions] = useState<Question[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(ITEMS_PER_PAGE)
    const [solvedQuestions, setSolvedQuestions] = useState<number[]>([])
    const [filters, setFilters] = useState<Filters>({
        solved: '',
        questionId: '',
        name: '',
        tags: '',
        companies: '',
        acceptance: ''
    })

    useEffect(() => {
        fetchQuestions()
        fetchSolvedQuestions()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [filters])

    const fetchSolvedQuestions = async () => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('/api/v1/user/completed', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await res.json()
            setSolvedQuestions(data.completed || [])
        } catch (error) {
            console.error('Error fetching solved questions:', error)
        }
    }

    const handleSolvedChange = async (questionId: number, checked: boolean) => {
        try {
            const token = localStorage.getItem('token')
            const res = await fetch('/api/v1/user/completed', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId,
                    solved: checked
                })
            })

            if (!res.ok) throw new Error('Failed to update solved status')

            setSolvedQuestions(prev =>
                checked
                    ? [...prev, questionId]
                    : prev.filter(id => id !== questionId)
            )
        } catch (error) {
            console.error('Error updating solved status:', error)
        }
    }

    const fetchQuestions = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            const res = await fetch('/api/v1/questions', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!res.ok) {
                if (res.status === 401) {
                    localStorage.removeItem('token')
                    router.push('/login')
                    return
                }
                throw new Error('Failed to fetch questions')
            }

            const data = await res.json()
            setQuestions(data.questions)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    const getAcceptanceRate = (accepted: number, total: number) => {
        return ((accepted / total) * 100).toFixed(1) + '%'
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize)
        setCurrentPage(1)
    }
    const filteredQuestions = questions.filter(question => {
        const matchesSolved = filters.solved === '' ||
            (filters.solved === 'solved' && solvedQuestions.includes(question.questionId)) ||
            (filters.solved === 'unsolved' && !solvedQuestions.includes(question.questionId))

        const matchesId = question.questionId.toString().includes(filters.questionId.toLowerCase())
        const matchesName = question.name.toLowerCase().includes(filters.name.toLowerCase())
        const matchesTags = filters.tags === '' || question.questionTags.some(tag =>
            tag.toLowerCase().includes(filters.tags.toLowerCase())
        )
        const matchesCompanies = filters.companies === '' || question.companyTags.some(company =>
            company.toLowerCase().includes(filters.companies.toLowerCase())
        )
        const acceptance = (question.totalAccepted / question.totalSubmissions) * 100
        const matchesAcceptance = filters.acceptance === '' ||
            acceptance.toString().includes(filters.acceptance)

        return matchesSolved && matchesId && matchesName && matchesTags && matchesCompanies && matchesAcceptance
    })

    const totalPages = Math.ceil(filteredQuestions.length / pageSize)
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentQuestions = filteredQuestions.slice(startIndex, endIndex)

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-purple flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-bg-purple flex items-center justify-center">
                <div className="text-red-500">Error: {error}</div>
            </div>
        )
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/')
    }

    return (
        <div>
            <div className="min-h-screen bg-bg-purple p-8">
                <div className="w-full mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-solid-purple-light">
                            LEETMONK Dashboard
                        </h1>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleLogout}
                                className="
            px-4
            py-2
            text-sm
            bg-red-600
            hover:bg-red-400
            text-text-purple-light
            rounded-md
            transition-colors
            flex
            items-center
            gap-2
            h-10
        "
                            >
                                <LogOutIcon className="w-5 h-5" />
                                Logout
                            </button>

                            {Object.values(filters).some(v => v !== '') && (
                                <button
                                    onClick={() => setFilters({
                                        solved: '',
                                        questionId: '',
                                        name: '',
                                        tags: '',
                                        companies: '',
                                        acceptance: ''
                                    })}
                                    className="h-10 px-4 py-2 text-sm bg-interactive-purple-medium hover:bg-interactive-purple-light text-text-purple-light rounded-md transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="rounded-md border border-border-purple-dark overflow-hidden">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="hover:bg-interactive-purple-medium">
                                    <TableHead className="text-text-purple-light w-24 p-4">
                                        <SearchDropdown
                                            label="Solved"
                                            value={filters.solved}
                                            onChange={(value) => setFilters(prev => ({ ...prev, solved: value }))}
                                            placeholder="Filter solved status..."
                                            options={[
                                                { label: 'All', value: '' },
                                                { label: 'Solved', value: 'solved' },
                                                { label: 'Unsolved', value: 'unsolved' }
                                            ]}
                                        />
                                    </TableHead>
                                    <TableHead className="text-text-purple-light w-28 p-4">
                                        <SearchDropdown
                                            label="Number"
                                            value={filters.questionId}
                                            onChange={(value) => setFilters(prev => ({ ...prev, questionId: value }))}
                                            placeholder="Search by question number..."
                                        />
                                    </TableHead>

                                    <TableHead className="text-text-purple-light p-4 min-w-[300px]">
                                        <SearchDropdown
                                            label="Name"
                                            value={filters.name}
                                            onChange={(value) => setFilters(prev => ({ ...prev, name: value }))}
                                            placeholder="Search by question name..."
                                        />
                                    </TableHead>

                                    <TableHead className="text-text-purple-light w-28 p-4 text-center">
                                        <span>Question</span>
                                    </TableHead>

                                    <TableHead className="text-text-purple-light w-28 p-4 text-center">
                                        <span>Solution</span>
                                    </TableHead>

                                    <TableHead className="text-text-purple-light p-4 min-w-[200px]">
                                        <SearchDropdown
                                            label="Tags"
                                            value={filters.tags}
                                            onChange={(value) => setFilters(prev => ({ ...prev, tags: value }))}
                                            placeholder="Search by tags..."
                                        />
                                    </TableHead>

                                    <TableHead className="text-text-purple-light p-4 min-w-[200px]">
                                        <SearchDropdown
                                            label="Companies"
                                            value={filters.companies}
                                            onChange={(value) => setFilters(prev => ({ ...prev, companies: value }))}
                                            placeholder="Search by companies..."
                                        />
                                    </TableHead>

                                    <TableHead className="text-text-purple-light w-48 p-4">
                                        <SearchDropdown
                                            label="Acceptance"
                                            value={filters.acceptance}
                                            onChange={(value) => setFilters(prev => ({ ...prev, acceptance: value }))}
                                            placeholder="Search by acceptance rate..."
                                        />
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {currentQuestions.map((question) => (
                                    <TableRow
                                        key={question.id}
                                        className="hover:bg-interactive-purple-medium group"
                                    >
                                        <TableCell className="p-4">
                                            <Checkbox
                                                checked={solvedQuestions.includes(question.questionId)}
                                                onCheckedChange={(checked) =>
                                                    handleSolvedChange(question.questionId, checked as boolean)
                                                }
                                                className="border-border-purple-dark data-[state=checked]:bg-solid-purple-light data-[state=checked]:border-solid-purple-light"
                                            />
                                        </TableCell>

                                        <TableCell className="p-4 font-medium text-text-purple-light">
                                            {question.questionId}
                                        </TableCell>

                                        <TableCell className="p-4 text-text-purple-light font-medium">
                                            <div className="truncate">
                                                {question.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-4 text-center">
                                            <Tooltip.Provider>
                                                <Tooltip.Root>
                                                    <Tooltip.Trigger asChild>
                                                        <Link
                                                            href={question.questionUrl}
                                                            target="_blank"
                                                            className="inline-flex items-center justify-center"
                                                        >
                                                            <LeetCodeIcon
                                                                size={20}
                                                                className="hover:scale-110 transition-transform duration-200 group-hover:opacity-90"
                                                            />
                                                        </Link>
                                                    </Tooltip.Trigger>
                                                    <Tooltip.Portal>
                                                        <Tooltip.Content
                                                            className="bg-interactive-purple-dark px-3 py-1 rounded text-sm text-text-purple-light"
                                                            sideOffset={5}
                                                        >
                                                            Solve on LeetCode
                                                            <Tooltip.Arrow className="fill-interactive-purple-dark" />
                                                        </Tooltip.Content>
                                                    </Tooltip.Portal>
                                                </Tooltip.Root>
                                            </Tooltip.Provider>
                                        </TableCell>

                                        <TableCell className="p-4 text-center">
                                            <Tooltip.Provider>
                                                <Tooltip.Root>
                                                    <Tooltip.Trigger asChild>
                                                        <Link
                                                            href={`https://www.youtube.com/results?search_query=${question.questionId}+${question.name}+leetcode+solution`}
                                                            target="_blank"
                                                            className="inline-flex items-center justify-center"
                                                        >
                                                            <YouTubeIcon
                                                                size={20}
                                                                className="hover:scale-110 transition-transform duration-200"
                                                            />
                                                        </Link>
                                                    </Tooltip.Trigger>
                                                    <Tooltip.Portal>
                                                        <Tooltip.Content
                                                            className="bg-interactive-purple-dark px-3 py-1 rounded text-sm text-text-purple-light"
                                                            sideOffset={5}
                                                        >
                                                            Watch Solution
                                                            <Tooltip.Arrow className="fill-interactive-purple-dark" />
                                                        </Tooltip.Content>
                                                    </Tooltip.Portal>
                                                </Tooltip.Root>
                                            </Tooltip.Provider>
                                        </TableCell>

                                        <TableCell className="p-4">
                                            <TagsDropdown
                                                tags={question.questionTags}
                                                visibleCount={2}
                                                type="question"
                                            />
                                        </TableCell>

                                        <TableCell className="p-4">
                                            <TagsDropdown
                                                tags={question.companyTags}
                                                visibleCount={2}
                                                type="company"
                                            />
                                        </TableCell>

                                        <TableCell className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-full bg-interactive-purple-dark rounded-full h-2">
                                                    <div
                                                        className="bg-solid-purple-light h-2 rounded-full transition-all duration-300"
                                                        style={{
                                                            width: `${(question.totalAccepted / question.totalSubmissions) * 100}%`
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-sm text-text-purple-light whitespace-nowrap">
                                                    {getAcceptanceRate(question.totalAccepted, question.totalSubmissions)}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {filteredQuestions.length > ITEMS_PER_PAGE && (
                        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                            <PageSizeSelector
                                pageSize={pageSize}
                                onPageSizeChange={handlePageSizeChange}
                            />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
