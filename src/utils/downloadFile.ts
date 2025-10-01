import JSZip from "jszip";
import { saveAs } from "file-saver";
import api from "../lib/api";

// Single file download
export async function downloadFile(fileUrl: string) {
  const response = await api.get(fileUrl, { responseType: "blob" });
  saveAs(response.data, "dms-document-download");
}

// Bulk ZIP download
export async function downloadAllAsZip(files: Array<{ url: string}>) {
  const zip = new JSZip();
  await Promise.all(
    files.map(async (f, index) => {
      const resp = await api.get(f.url, { responseType: "arraybuffer" });
      zip.file("document" + (index + 1), resp.data);
    })
  );
  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "documents.zip");
}
