import clsx from "clsx";

export function ExternalLink({
  href,
  className,
  children,
  title,
}: LinkProps) {
  return (
    <a
      href={href}
      className={clsx(
        "text-secondary hover:text-accent-one focus:text-accent-one focus:outline-none",
        className
      )}
      target="_blank"
      rel="noreferrer"
      title={title}
    >
      {children}
    </a>
  );
}

type LinkProps = {
  children?: string;
  className?: string;
  title?: string;
  href: string;
};
