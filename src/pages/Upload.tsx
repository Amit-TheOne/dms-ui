import React, { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { uploadDocument, reset } from "../redux/features/uploadSlice";
import TagInput from "../components/TagInput";

export default function Upload() {
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector((state) => state.upload);

  const [date, setDate] = useState<string>(new Date().toLocaleDateString("en-GB"));
  const [major, setMajor] = useState("Personal");
  const [minor, setMinor] = useState("");
  const [remarks, setRemarks] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  // Show modal when upload is successful, then auto-close and reset form after 5s
  useEffect(() => {
    if (success) {
      setShowSuccessModal(true);
      const timer = setTimeout(() => {
        setShowSuccessModal(false);
        setDate(new Date().toLocaleDateString("en-GB"));
        setMajor("Personal");
        setMinor("");
        setRemarks("");
        setTags([]);
        setFile(null);
        setUsername("");
        dispatch(reset());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-indigo-400 p-2">
      <div className="w-full max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-xl p-4 sm:p-8 mt-8 mb-8">
        <h2 className="text-3xl md:text-4xl text-center font-extrabold mb-2 text-indigo-800 drop-shadow-lg">
          Upload Document
        </h2>
        <h3 className="text-center text-base sm:text-lg md:text-xl font-medium text-indigo-900 mb-6 tracking-wide">
          Add a new document with details and tags
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-1">Document Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          {/* Major Head */}
          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-1">Category</label>
            <select
              value={major}
              onChange={(e) => {
                setMajor(e.target.value);
                setMinor("");
              }}
              className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            >
              <option className="bg-indigo-50 text-indigo-700 font-semibold">Personal</option>
              <option className="bg-blue-50 text-blue-700 font-semibold">Professional</option>
            </select>
          </div>

          {/* Minor Head */}
          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-1">
              {major === "Personal" ? "Name" : "Department"}
            </label>
            <select
              value={minor}
              onChange={(e) => setMinor(e.target.value)}
              className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            >
              <option value="" className="bg-indigo-50 text-indigo-700 font-semibold">--select--</option>
              {minorOptions.map((m, idx) => (
                <option
                  key={m}
                  value={m}
                  className={idx % 2 === 0 ? "bg-blue-50 text-blue-700 font-semibold" : "bg-indigo-50 text-indigo-700 font-semibold"}
                >
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-indigo-700 mb-1">Tags</label>
            <TagInput tags={tags} setTags={setTags} />
          </div>

          {/* Remarks */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-indigo-700 mb-1">Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
              rows={1}
            />
          </div>

          {/* Username */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-indigo-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          {/* File Upload */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-indigo-700 mb-1">Upload File</label>
            <div className="flex items-center space-x-2">
              <label htmlFor="file-upload" className="bg-indigo-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-indigo-700 transition">
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

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:from-indigo-700 hover:to-blue-600 transition text-lg tracking-wide py-2 mt-2"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>

        {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}
        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-2xl shadow-2xl px-8 py-6 max-w-sm w-full flex flex-col items-center">
              <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2 2l4-4" />
              </svg>
              <p className="text-green-600 text-center font-bold text-lg mb-2">File uploaded successfully!</p>
              <p className="text-gray-700 text-center text-sm">This will close automatically in 5 seconds.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
