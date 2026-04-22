// trigger deploy
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center py-2 gap-0.5 text-[10px] font-medium"
              )}
            >
             <div style={{ fontSize: "20px" }}>{icon}</div>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
