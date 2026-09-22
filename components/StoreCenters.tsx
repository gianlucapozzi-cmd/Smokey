import { STORE_DETAILS, type StoreId } from "@/lib/constants";

function Pin() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-6 w-6 shrink-0 text-ember"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

type StoreCentersProps = {
  variant?: "dark" | "light";
  selected?: StoreId | "";
  onSelect?: (id: StoreId) => void;
};

export function StoreCenters({
  variant = "dark",
  selected,
  onSelect,
}: StoreCentersProps) {
  const selectable = typeof onSelect === "function";
  const dark = variant === "dark";

  return (
    <ul className="space-y-1">
      {STORE_DETAILS.map((store) => {
        const isSelected = selected === store.id;
        const row = (
          <>
            <Pin />
            <span className="min-w-0 text-left">
              <span
                className={`block text-[1.05rem] font-semibold leading-tight ${
                  dark ? "text-cream" : "text-ink"
                }`}
              >
                {store.city}
              </span>
              <span
                className={`mt-0.5 block text-sm ${
                  dark ? "text-sand/70" : "text-ink/55"
                }`}
              >
                {store.cap} - {store.address}
              </span>
            </span>
          </>
        );

        if (selectable) {
          return (
            <li key={store.id}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(store.id)}
                className={`flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition ${
                  isSelected
                    ? dark
                      ? "bg-white/10 ring-2 ring-ember"
                      : "bg-ember/8 ring-2 ring-ember"
                    : dark
                      ? "hover:bg-white/5"
                      : "hover:bg-ink/4"
                }`}
              >
                {row}
              </button>
            </li>
          );
        }

        return (
          <li key={store.id} className="flex items-start gap-3 px-1 py-2.5">
            {row}
          </li>
        );
      })}
    </ul>
  );
}
