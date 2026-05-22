import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Icon } from "../Icon";

export interface ArrowLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  children: ReactNode;
}

export function ArrowLink({ href = "#", children, className, ...rest }: ArrowLinkProps) {
  return (
    <a {...rest} href={href} className={`btn-link ${className ?? ""}`.trim()}>
      {children}
      <span className="arrow">
        <Icon name="arrow-right" size={16} />
      </span>
    </a>
  );
}
