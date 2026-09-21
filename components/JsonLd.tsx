/**
 * Renders a JSON-LD block. The payload is built from our own typed data, and
 * `<` is escaped so a value can never terminate the script element early.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
