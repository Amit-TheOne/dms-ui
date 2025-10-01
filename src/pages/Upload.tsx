import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { uploadDocument, reset } from "../redux/features/uploadSlice";
import TagInput from "../components/TagInput";

export default function Upload() {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector((state) => state.upload);

  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString("en-GB") // dd/mm/yyyy
  );
  const [major, setMajor] = useState("Personal");
  const [minor, setMinor] = useState("");
  const [remarks, setRemarks] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState("");

  const minorOptions = useMemo(
    () =>
      major === "Personal"
        ? ["John", "Tom", "Emily"]
        : ["Accounts", "HR", "IT", "Finance"],
    [major]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!["application/pdf", "image/png", "image/jpeg"].includes(f.type)) {
      alert("Only PDF and image files allowed");
      return;
    }
    setFile(f);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    const dataObj = {
      major_head: major,
      minor_head: minor,
      document_date: date,
      document_remarks: remarks,
      tags: tags.map((t) => ({ tag_name: t })),
      user_id: username,
    };

    formData.append("file", file);
    formData.append("data", JSON.stringify(dataObj));

    dispatch(uploadDocument({ formData }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date */}
        <div>
          <label className="block text-sm font-medium">Document Date</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Major Head */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={major}
            onChange={(e) => {
              setMajor(e.target.value);
              setMinor("");
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option>Personal</option>
            <option>Professional</option>
          </select>
        </div>

        {/* Minor Head */}
        <div>
          <label className="block text-sm font-medium">
            {major === "Personal" ? "Name" : "Department"}
          </label>
          <select
            value={minor}
            onChange={(e) => setMinor(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">--select--</option>
            {minorOptions.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium">Tags</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        {/* Remarks */}
        <div>
          <label className="block text-sm font-medium">Remarks</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium">Upload File</label>
          <div className="flex items-center space-x-2">
            <label htmlFor="file-upload" className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700">
              Choose File
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <span className="text-sm text-gray-600">
              {file ? file.name : "No File Chosen"}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {success && (
        <p className="mt-4 text-green-600">
          File uploaded successfully!
          <button
            className="ml-2 underline text-sm"
            onClick={() => dispatch(reset())}
          >
            Reset
          </button>
        </p>
      )}
    </div>
  );
}
