import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function EmployeeSearch({ 
    query, 
    onQueryChange 
}) {
    return (
        <div className="relative w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search employees..."
                className=" rounded-sm border border-gray-300 bg-white pl-10 py-1 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
            />
        </div>
    );
}