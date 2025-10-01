import { Document, Page, pdfjs } from "react-pdf";

// required worker for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string | null;
}

export default function PreviewModal({
  isOpen,
  onClose,
  fileUrl,
}: PreviewModalProps) {
  if (!isOpen || !fileUrl) return null;

  // Determine file type from URL extension
  const isPdf = /\.pdf($|\?)/i.test(fileUrl);
  const isImage = /\.(jpg|jpeg|png|gif|bmp|webp|svg)($|\?)/i.test(fileUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-indigo-400/80 backdrop-blur-sm">
      <div className="relative w-11/12 max-w-3xl bg-white/95 rounded-xl shadow-2xl p-0  bg-clip-padding">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 hover:bg-indigo-200 hover:text-indigo-900 shadow transition text-2xl font-bold focus:outline-none z-50 cursor-pointer"
          aria-label="Close preview"
          style={{ background: "rgba(255,255,255,0.7)", pointerEvents: "auto" }}
        >
          ×
        </button>

        <h2 className="text-2xl font-extrabold text-indigo-800 text-center mb-4 mt-4 drop-shadow">Preview</h2>

        <div className="flex justify-center items-center h-[80vh]">
          {isPdf ? (
            <div className="h-full w-full flex justify-center items-center bg-indigo-50 rounded-xl border-2 border-indigo-100 shadow-inner overflow-y-auto">
              <Document file={fileUrl} className="h-full w-full flex justify-center items-center">
                <Page pageNumber={1} width={700} height={600} className="h-full w-full" />
              </Document>
            </div>
          ) : isImage ? (
            <div className="h-full w-full flex justify-center items-center bg-indigo-50 rounded-xl border-2 border-indigo-100 shadow-inner">
              <img
                src={fileUrl}
                alt="Preview"
                className="object-contain rounded-lg shadow max-w-full max-h-full"
                style={{ maxHeight: '65vh', maxWidth: '100%' }}
              />
            </div>
          ) : (
            <div className="text-center text-indigo-700 font-semibold w-full">Cannot preview this file type.</div>
          )}
        </div>
      </div>
    </div>
  );
}
