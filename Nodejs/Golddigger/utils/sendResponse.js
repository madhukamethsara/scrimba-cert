export default function sendResponse(res, statusCode, contentType, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", contentType);
  res.end(body);
}