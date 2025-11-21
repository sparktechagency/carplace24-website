"use client";

import { Search as SearchIcon, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  value: string;
  resultCount: number;
  onChange: (v: string) => void;
  onRestore: () => void;
};

const SearchHeader = ({ value, resultCount, onChange, onRestore }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder="Find your choice"
        className="flex-1 h-12 px-4 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name="search"
      />
      <button
        className="h-12 w-12 rounded-lg border flex items-center justify-center"
        onClick={onRestore}
      >
        <RotateCcw className="h-5 w-5 text-gray-600" />
      </button>
      <Button type="submit" className="h-12 px-5 rounded-lg">
        <SearchIcon className="mr-2" /> Search
      </Button>
    </div>
  );
};

export default SearchHeader;
