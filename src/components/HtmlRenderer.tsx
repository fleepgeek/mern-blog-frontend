import DOMPurify from "dompurify";

type HtmlRendererProps = {
  html: string;
  className?: string;
};

export default function HtmlRenderer({ html, className }: HtmlRendererProps) {
  const sanitizedHtml = DOMPurify.sanitize(html);
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
}
