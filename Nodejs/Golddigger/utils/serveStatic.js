import path from "node:path";
import { access, readFile } from "node:fs/promises";
import getContentType from "./getContentType.js";
import sendResponse from "./sendResponse.js";

export default async function serveStatic(req, res, projectRoot) {
  const requestedUrl = req.url === "/" ? "/index.html" : req.url;
  const relativePath = requestedUrl.replace(/^\/+/, "");

  const candidatePaths = [
    path.join(projectRoot, "public", requestedUrl),
    path.join(projectRoot, relativePath)
  ];

  let filePath = null;

  for (const candidate of candidatePaths) {
    try {
      await access(candidate);
      filePath = candidate;
      break;
    } catch {
      // Keep checking the next candidate.
    }
  }

  try {
    if (!filePath) {
      throw Object.assign(new Error("File not found"), { code: "ENOENT" });
    }

    const fileContent = await readFile(filePath);
    const contentType = getContentType(filePath);

    sendResponse(res, 200, contentType, fileContent);
  } catch (error) {
    if (error.code === "ENOENT") {
      const page404 = await readFile(
        path.join(projectRoot, "public", "404.html")
      );

      sendResponse(res, 404, "text/html; charset=utf-8", page404);
      return;
    }

    sendResponse(res, 500, "text/plain; charset=utf-8", "Server error");
  }
}