
interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}

export function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="
          w-full
          px-2
          py-1
          text-sm
          bg-interactive-purple-dark
          border
          border-border-purple-dark
          rounded-md
          text-text-purple-light
          placeholder:text-text-purple-dark
          focus:outline-none
          focus:border-solid-purple-light
          transition-colors
        "
        />
    );
}
