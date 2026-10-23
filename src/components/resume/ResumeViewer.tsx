import { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { AlertTriangle, ChevronLeft, ChevronRight, ExternalLink, Loader2 } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Serve the PDF.js worker from the installed package (bundled by Vite).
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface ResumeViewerProps {
  /** Public path to the PDF, e.g. "/resume.pdf". */
  file: string;
  /** Accessible label / document title. */
  title: string;
}

function ViewerSkeleton() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4 bg-surface">
      <Loader2 className="size-6 animate-spin text-brand" aria-hidden="true" />
      <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
        Rendering document…
      </p>
      <div className="mx-auto aspect-[1/1.294] w-[min(90%,640px)] animate-pulse rounded-lg border border-border bg-surface-elevated/60" />
    </div>
  );
}

function ErrorFallback({ file }: { file: string }) {
  return (
    <div className="flex h-[80vh] flex-col items-center justify-center gap-4 bg-surface p-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-full border border-destructive/40 bg-destructive/10">
        <AlertTriangle className="size-5 text-destructive" aria-hidden="true" />
      </span>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">The inline preview couldn’t load.</p>
        <p className="text-sm text-muted-foreground">
          Open the resume in a new tab or download the PDF instead.
        </p>
      </div>
      <a
        href={file}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <ExternalLink className="size-4" aria-hidden="true" /> Open in New Tab
      </a>
    </div>
  );
}

export default function ResumeViewer({ file, title }: ResumeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [failed, setFailed] = useState(false);

  // Track container width for a responsive page render.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setPageNumber(1);
    setFailed(false);
  }, []);

  const onError = useCallback(() => setFailed(true), []);

  if (failed) return <ErrorFallback file={file} />;

  // Cap page width so the document never becomes uncomfortably wide on desktop.
  const pageWidth = width > 0 ? Math.min(width - 32, 820) : undefined;
  const canPrev = pageNumber > 1;
  const canNext = numPages > 0 && pageNumber < numPages;

  return (
    <div className="flex flex-col">
      <div
        ref={containerRef}
        className="max-h-[80vh] w-full overflow-auto overscroll-contain bg-surface [scrollbar-width:thin]"
      >
        <Document
          file={file}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onError}
          onSourceError={onError}
          loading={<ViewerSkeleton />}
          error={<ErrorFallback file={file} />}
          className="flex flex-col items-center gap-6 py-6"
        >
          {numPages > 0 && (
            <Page
              key={pageNumber}
              pageNumber={pageNumber}
              width={pageWidth}
              loading={
                <div className="mx-auto aspect-[1/1.294] w-[min(90%,640px)] animate-pulse rounded-lg border border-border bg-surface-elevated/60" />
              }
              className="overflow-hidden rounded-lg border border-border shadow-[0_20px_50px_-24px_rgba(0,0,0,0.75)]"
              renderTextLayer
              renderAnnotationLayer
            />
          )}
        </Document>
      </div>

      {numPages > 1 && (
        <div className="flex items-center justify-center gap-4 border-t border-border bg-surface px-5 py-3">
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
            disabled={!canPrev}
            aria-label="Previous page"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-brand/40 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            Page {pageNumber} / {numPages}
          </span>
          <button
            type="button"
            onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
            disabled={!canNext}
            aria-label="Next page"
            className="inline-flex size-8 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-brand/40 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
      <span className="sr-only">{title}</span>
    </div>
  );
}
