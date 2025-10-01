import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { searchDocuments } from "../redux/features/searchSlice";
import TagInput from "../components/TagInput";
import PreviewModal from "../components/PreviewModal";
import { downloadFile, downloadAllAsZip } from "../utils/downloadFile";

export default function Search() {
  const dispatch = useAppDispatch();
  const { results, loading, error } = useAppSelector((state) => state.search);

  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");

  // preview modal state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFileUrl, setPreviewFileUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      searchDocuments({
        major_head: major,
        minor_head: minor,
        from_date: fromDate,
        to_date: toDate,
        tags,
        searchKeyword: keyword,
      })
    );
  };

  const handlePreview = (url: string) => {
    setPreviewFileUrl(url);
    setPreviewOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-indigo-400 p-2">
      <div className="w-full max-w-5xl mx-auto bg-white/90 rounded-2xl shadow-xl p-4 sm:p-8 mt-8 mb-8">
        <h2 className="text-3xl md:text-4xl text-center font-extrabold mb-2 text-indigo-800 drop-shadow-lg">
          Search Documents
        </h2>
        <h3 className="text-center text-base sm:text-lg md:text-xl font-medium text-indigo-900 mb-6 tracking-wide">
          Find, preview, and download your files securely
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-1">Category</label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            >
              <option value="" className="bg-indigo-50 text-indigo-700 font-semibold">All</option>
              <option className="bg-blue-50 text-blue-700 font-semibold">Personal</option>
              <option className="bg-indigo-50 text-indigo-700 font-semibold">Professional</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-1">Subcategory</label>
            <input
              type="text"
              value={minor}
              onChange={(e) => setMinor(e.target.value)}
              placeholder="Name/Dept"
              className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-1">From Date</label>
            <input
              type="text"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="dd-mm-yyyy"
              className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-indigo-700 mb-1">To Date</label>
            <input
              type="text"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="dd-mm-yyyy"
              className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-indigo-700 mb-1">Tags</label>
            <TagInput tags={tags} setTags={setTags} />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-indigo-700 mb-1">Keyword</label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full border-2 border-indigo-200 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-800 font-semibold focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:from-indigo-700 hover:to-blue-600 transition text-lg tracking-wide py-2 mt-2"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>

        {error && <p className="text-red-600 text-center font-semibold mb-4">{error}</p>}

        {/* Results */}
        {results && results.length > 0 && (
          <>
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between items-center gap-2">
              <span className="text-indigo-700 font-semibold text-lg">Results: {results.length}</span>
              <button
                onClick={() =>
                  downloadAllAsZip(
                    results.map((doc: any) => ({
                      url: doc.file_url
                    }))
                  )
                }
                className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow hover:from-green-600 hover:to-green-700 transition"
              >
                Download All as ZIP
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-md bg-white/80">
              <table className="w-full border rounded-lg overflow-hidden">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="px-3 py-2 border text-indigo-800 font-bold">Date</th>
                    <th className="px-3 py-2 border text-indigo-800 font-bold">Category</th>
                    <th className="px-3 py-2 border text-indigo-800 font-bold">Subcategory</th>
                    <th className="px-3 py-2 border text-indigo-800 font-bold">Tags</th>
                    <th className="px-3 py-2 border text-indigo-800 font-bold">Remarks</th>
                    <th className="px-3 py-2 border text-indigo-800 font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((doc: any, idx: number) => (
                    <tr key={doc.id || doc._id} className={idx % 2 === 0 ? "bg-blue-50/60" : "bg-indigo-50/60"}>
                      <td className="px-3 py-2 border text-indigo-900 font-medium">{doc.document_date}</td>
                      <td className="px-3 py-2 border text-blue-700 font-semibold">{doc.major_head}</td>
                      <td className="px-3 py-2 border text-indigo-700 font-semibold">{doc.minor_head}</td>
                      <td className="px-3 py-2 border text-blue-700 font-medium">
                        {doc.tags?.map((t: any) => t.tag_name).join(", ")}
                      </td>
                      <td className="px-3 py-2 border text-indigo-900">{doc.document_remarks}</td>
                      <td className="px-3 py-2 border">
                        <button
                          className="text-indigo-600 hover:underline font-semibold mr-2"
                          onClick={() =>
                            handlePreview(doc.file_url)
                          }
                        >
                          Preview
                        </button>
                        <button
                          className="text-green-600 hover:underline font-semibold"
                          onClick={() =>
                            downloadFile(doc.file_url)
                          }
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Preview modal */}
        <PreviewModal
          isOpen={previewOpen}
          onClose={() => setPreviewOpen(false)}
          fileUrl={previewFileUrl}
        />
      </div>
    </div>
  );
}
