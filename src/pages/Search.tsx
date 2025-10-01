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
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Search Documents</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">All</option>
            <option>Personal</option>
            <option>Professional</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Subcategory</label>
          <input
            type="text"
            value={minor}
            onChange={(e) => setMinor(e.target.value)}
            placeholder="Name/Dept"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">From Date</label>
          <input
            type="text"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            placeholder="dd-mm-yyyy"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">To Date</label>
          <input
            type="text"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            placeholder="dd-mm-yyyy"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Tags</label>
          <TagInput tags={tags} setTags={setTags} />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium">Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600">{error}</p>}

       {/* Results */}
      {results && results.length > 0 && (
        <>
          <div className="mb-3">
            <button
              onClick={() =>
                downloadAllAsZip(
                  results.map((doc: any) => ({
                    url: doc.file_url
                  }))
                )
              }
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download All as ZIP
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-3 py-2 border">Date</th>
                  <th className="px-3 py-2 border">Major</th>
                  <th className="px-3 py-2 border">Minor</th>
                  <th className="px-3 py-2 border">Tags</th>
                  <th className="px-3 py-2 border">Remarks</th>
                  <th className="px-3 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((doc: any) => (
                  <tr key={doc.id || doc._id}>
                    <td className="px-3 py-2 border">{doc.document_date}</td>
                    <td className="px-3 py-2 border">{doc.major_head}</td>
                    <td className="px-3 py-2 border">{doc.minor_head}</td>
                    <td className="px-3 py-2 border">
                      {doc.tags?.map((t: any) => t.tag_name).join(", ")}
                    </td>
                    <td className="px-3 py-2 border">{doc.document_remarks}</td>
                    <td className="px-3 py-2 border">
                      <button
                        className="text-indigo-600 hover:underline mr-2"
                        onClick={() =>
                          handlePreview(doc.file_url)
                        }
                      >
                        Preview
                      </button>
                      <button
                        className="text-green-600 hover:underline"
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
  );
}
