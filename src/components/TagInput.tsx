import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchTags, clearSuggestions } from "../redux/features/tagSlice";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function TagInput({ tags, setTags }: TagInputProps) {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const { suggestions } = useAppSelector((state) => state.tags);

  // Fetch suggestions when typing
  useEffect(() => {
    if (input.trim().length > 1) {
      dispatch(fetchTags(input));
    } else {
      dispatch(clearSuggestions());
    }
  }, [input, dispatch]);

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInput("");
      dispatch(clearSuggestions());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input.trim());
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Enter tag"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
      />

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border-2 border-indigo-200 w-full rounded-lg mt-1 shadow-lg overflow-hidden">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="px-4 py-2 cursor-pointer font-medium text-indigo-800 hover:bg-indigo-100 focus:bg-indigo-200 transition"
              onClick={() => addTag(suggestion.label)}
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}

      {/* Existing tags */}
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 px-3 py-1 rounded-full flex items-center font-semibold shadow-sm border border-indigo-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => setTags(tags.filter((t) => t !== tag))}
              className="ml-2 text-red-500 hover:text-red-700 font-bold focus:outline-none"
              aria-label={`Remove tag ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
