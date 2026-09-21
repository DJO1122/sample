/**
 * Lead fields end up in an HTML email. Everything that comes from the form is
 * escaped before it is interpolated, and control characters are stripped so a
 * submission cannot forge extra header lines.
 */
const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

/** Removes control characters and collapses runaway whitespace. */
export function cleanText(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

/** Safe for an email subject line or a single-line header value. */
export function cleanSingleLine(value: string): string {
  return cleanText(value).replace(/[\r\n]+/g, " ");
}
