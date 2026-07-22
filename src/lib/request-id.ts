export function requestId(headers: Headers) {
  return headers.get("x-request-id") || crypto.randomUUID();
}
