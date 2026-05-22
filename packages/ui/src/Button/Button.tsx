import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "../Icon";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  children?: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
  };

type ButtonAsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";
  const sizeClass = size === "lg" ? "btn-lg" : size === "sm" ? "btn-sm" : "";
  const className = `btn btn-${variant} ${sizeClass} ${props.className ?? ""}`.trim();

  const content = (
    <>
      {props.icon && <Icon name={props.icon} size={16} />}
      {props.children}
      {props.iconRight && <Icon name={props.iconRight} size={16} />}
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    const {
      variant: _v,
      size: _s,
      icon: _i,
      iconRight: _ir,
      className: _c,
      children: _ch,
      ...anchor
    } = props;
    return (
      <a {...anchor} className={className}>
        {content}
      </a>
    );
  }
  const {
    variant: _v,
    size: _s,
    icon: _i,
    iconRight: _ir,
    className: _c,
    children: _ch,
    ...button
  } = props as ButtonAsButton;
  return (
    <button {...button} className={className}>
      {content}
    </button>
  );
}
