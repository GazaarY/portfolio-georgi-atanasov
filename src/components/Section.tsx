import * as React from "react";

type SectionProps = React.PropsWithChildren<{
  id: string;
  as?: React.ElementType;     // ← no JSX namespace
  className?: string;
}>;

export default function Section({
  id,
  as: Tag = "section",
  className = "",
  children,
}: SectionProps) {
  const label = id.replace(/-/g, " ");
  const Component = Tag as React.ElementType;

  return (
    <Component
      id={id}
      aria-label={label}
      className={`gy-container scroll-mt-24 py-12 md:py-16 ${className}`}
    >
      {children}
    </Component>
  );
}
