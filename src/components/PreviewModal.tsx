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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-3xl rounded shadow-lg p-4 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-3">Preview</h2>

        {isPdf ? (
          <div className="h-[70vh] overflow-y-auto border">
            <Document file={fileUrl}>
              <Page pageNumber={1} width={700} />
            </Document>
          </div>
        ) : isImage ? (
          <img
            src={fileUrl}
            alt="Preview"
            className="max-h-[70vh] mx-auto object-contain"
          />
        ) : (
          <div className="text-center text-gray-500">Cannot preview this file type.</div>
        )}
      </div>
    </div>
  );
}
