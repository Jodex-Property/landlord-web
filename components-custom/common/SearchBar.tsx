'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Search for properties, clients, etc."
        className="pr-14 rounded-md shadow-md"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-950 p-2 rounded-full text-white hover:bg-blue-900 transition"
      >
        <Search className="h-3 w-3" />
      </button>
    </div>
  );
};

export default SearchBar;
