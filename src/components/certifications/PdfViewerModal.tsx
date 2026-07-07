import { Download, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PdfViewerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  /** Public path to the PDF, e.g. "/certificates/oracle-java.pdf". */
  file?: string;
}

/**
 * Lazy PDF preview — the <iframe> mounts only while the dialog is open, so no
 * certificate PDF is fetched at startup (loaded only when requested).
 */
export function PdfViewerModal({
  open,
  onOpenChange,
  title,
  subtitle,
  file,
}: PdfViewerModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0">
        <DialogHeader className="flex-row items-start justify-between gap-4 border-b border-border p-5">
          <div className="min-w-0">
            <DialogTitle className="truncate text-left">{title}</DialogTitle>
            {subtitle && (
              <DialogDescription className="mt-1 text-left">{subtitle}</DialogDescription>
            )}
          </div>
          {file && (
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={file}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-foreground transition-colors hover:border-brand/40"
              >
                <ExternalLink className="size-3.5" /> Open
              </a>
              <a
                href={file}
                download
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-brand/90"
              >
                <Download className="size-3.5" /> Download
              </a>
            </div>
          )}
        </DialogHeader>
        <div className="h-[70vh] w-full bg-surface">
          {open && file ? (
            <iframe
              src={`${file}#view=FitH`}
              title={`${title} — certificate preview`}
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-sm text-muted-foreground">
              Certificate preview is not available yet.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
