export type AppErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "CONFLICT"
  | "INTERNAL_ERROR";

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: AppErrorCode; message: string } };

export function success<T>(data: T): Result<T> {
  return { ok: true, data };
}

export function failure(code: AppErrorCode, message: string): Result<never> {
  return { ok: false, error: { code, message } };
}
