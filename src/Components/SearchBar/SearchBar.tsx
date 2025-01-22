import React from "react";

interface SearchBarProps {
  title?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  searchIcon: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  title = "Search",
  placeholder = "Search...",
  value,
  onChange,
  onClear,
  searchIcon,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-between border-b border-[#00858e5e] pb-5 ${className}`}
    >
      {title && <h5 className="text-22 text-primary font-bold">{title}</h5>}

      <div className="relative bg-white rounded-lg py-1.5 pl-10 pr-5 hidden sm:block border border-gray-300">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="p-0 placeholder:text-gray-600 text-gray-600 text-sm border-none lg:min-w-[350px] focus:outline-none"
        />
        <img
          src={searchIcon}
          className="w-4 brightness-75 absolute left-4 top-1/2 -translate-y-1/2"
          alt="search"
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
