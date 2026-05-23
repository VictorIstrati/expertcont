export type ModalKey = "booking" | "review" | "ask-question" | "quote";

const EVT = "expertcont-modal";

interface DetailOpen {
  action: "open";
  key: ModalKey;
  payload?: Record<string, unknown>;
}
interface DetailClose {
  action: "close";
  key: ModalKey;
}
type Detail = DetailOpen | DetailClose;

export function openModal(key: ModalKey, payload?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(EVT, { detail: { action: "open", key, payload } as Detail }),
  );
}

export function closeModal(key: ModalKey) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVT, { detail: { action: "close", key } as Detail }));
}

/**
 * Subscribe to modal events. Returns an unsubscribe function.
 * The callback receives the parsed detail object.
 */
export function onModalEvent(cb: (d: Detail) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: Event) => {
    const ev = e as CustomEvent<Detail>;
    if (ev.detail) cb(ev.detail);
  };
  window.addEventListener(EVT, handler);
  return () => window.removeEventListener(EVT, handler);
}
