import { Logo } from "./Logo";
import { ScrollTo } from "./ScrollTo";

export function Header() {
  return (
    <header id="top" className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:h-[4.25rem] sm:px-8">
        <ScrollTo id="top" className="flex items-center" aria-label="Torna in cima">
          <Logo variant="light" />
        </ScrollTo>
        <ScrollTo id="form" className="btn-ember px-4 py-2 text-sm sm:px-5">
          Registrati
        </ScrollTo>
      </div>
    </header>
  );
}
