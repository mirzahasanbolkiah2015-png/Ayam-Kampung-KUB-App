"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const NAV_ITEMS = [
  { href: "/", label: "Beranda", icon: "icon" },
  { href: "/kalkulator", label: "Pakan", icon: "icon"},
  { href: "/biaya", label: "Biaya", icon: "icon" },
  { href: "/nutrisi", label: "Input", icon: "icon" },
  { href: "/fcr", label: "FCR", icon: "icon" },
  { href: "/vaksin", label: "Vaksin", icon: "icon" },
  { href: "/panduan", label: "Panduan", icon: "icon" },
  { href: "/herbal", label: "Herbal", icon: "icon" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg">
      <div className="max-w-lg mx-auto flex">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium transition-colors",
                isActive
                  ? "text-[oklch(0.48_0.15_148)] bg-[oklch(0.92_0.06_148)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 1.8}
                className={isActive ? "text-[oklch(0.48_0.15_148)]" : ""}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
