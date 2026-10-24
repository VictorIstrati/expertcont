import { useEffect, type ReactNode, type MouseEvent } from "react";
import { Icon } from "@expertcont/ui";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  size = "md",
  children,
  footer,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  const onBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const maxWidthClass = size === "sm" ? "max-w-md" : size === "lg" ? "max-w-4xl" : "max-w-2xl";

  return (
    <div
      className="fade-in fixed inset-0 z-[200] bg-[rgba(15,26,58,0.6)] backdrop-blur-[4px] flex items-end justify-center p-4 md:items-center"
      onClick={onBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`bg-bg-card text-text-primary w-full ${maxWidthClass} max-h-[calc(100vh-32px)] rounded-xl shadow-xl flex flex-col overflow-hidden`}
      >
        <div className="py-6 px-8 flex items-start justify-between gap-4 border-b border-border">
          <div>
            <h2 className="m-0 text-2xl font-bold">{title}</h2>
            {subtitle && <p className="mt-2 mb-0 text-text-secondary text-sm">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-sm bg-transparent border-none cursor-pointer text-inherit shrink-0"
          >
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="p-8 overflow-auto flex-1">{children}</div>
        {footer && <div className="py-4 px-8 border-t border-border bg-bg-section">{footer}</div>}
      </div>
    </div>
  );
}
