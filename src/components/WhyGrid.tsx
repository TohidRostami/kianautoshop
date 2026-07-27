import { ShieldCheck, FileText, Clock, Headset } from "lucide-react";

const icons = [ShieldCheck, FileText, Clock, Headset];

export default function WhyGrid({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-mist/15 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => {
        const Icon = icons[index % icons.length];
        return (
          <div key={item.title} className="bg-ink p-6 sm:p-7">
            <Icon className="size-6 text-rust" strokeWidth={1.5} aria-hidden />
            <h3 className="mt-4 text-base font-semibold text-paper">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-mist">
              {item.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
