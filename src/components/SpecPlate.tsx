import { cn } from "@/lib/utils";

export interface SpecPlateItem {
  label: string;
  value: string;
  /** Alphanumeric/technical values (years, km, engine code…) render in the
   * monospace instrument face and are isolated as LTR so they never get
   * reshuffled inside RTL text. */
  mono?: boolean;
}

function Rivet({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute size-1.5 rounded-full bg-mist/40",
        className,
      )}
    />
  );
}

export default function SpecPlate({
  title,
  items,
  className,
}: {
  title: string;
  items: SpecPlateItem[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative border border-mist/25 bg-surface/60 p-6 sm:p-8",
        className,
      )}
    >
      <Rivet className="top-3 start-3" />
      <Rivet className="top-3 end-3" />
      <Rivet className="bottom-3 start-3" />
      <Rivet className="bottom-3 end-3" />

      <p className="text-xs font-medium uppercase tracking-[0.2em] text-rust">
        {title}
      </p>

      <dl className="mt-5 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isSecondLastOfEvenPair =
            items.length % 2 === 0 && index === items.length - 2;
          return (
            <div
              key={item.label}
              className={cn(
                "flex items-baseline justify-between gap-4 border-b border-mist/15 py-3",
                isLast && "border-b-0",
                isSecondLastOfEvenPair && "sm:border-b-0",
              )}
            >
              <dt className="text-sm text-mist">{item.label}</dt>
              <dd
                className={cn(
                  "text-start text-base font-medium text-paper",
                  item.mono && "figures font-mono",
                )}
              >
                {item.value}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
