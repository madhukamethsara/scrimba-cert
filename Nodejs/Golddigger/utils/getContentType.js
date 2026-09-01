import path from "node:path";

export default function getContentType(fileName) {
  const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".png": "image/png",
    ".pdf": "application/pdf",
    ".ico": "image/x-icon"
  };

  const extension = path.extname(fileName);

  return contentTypes[extension] || "application/octet-stream";
}