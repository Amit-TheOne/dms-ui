import React, { useState } from "react";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function TagInput({ tags, setTags }: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = input.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        setInput("");
      }
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter tag and press Enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        className="w-full border px-3 py-2 rounded"
      />
      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded flex items-center"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
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
