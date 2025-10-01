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
        className="w-full border px-3 py-2 rounded"
      />

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border w-full rounded mt-1 shadow">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="px-3 py-2 hover:bg-indigo-100 cursor-pointer"
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
            className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => setTags(tags.filter((t) => t !== tag))}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
