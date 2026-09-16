type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const src = variant === "light" ? "/logo-inv.svg" : "/logo.svg";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="SOSmoke"
      className={`h-7 w-auto sm:h-8 ${className}`}
    />
  );
}
