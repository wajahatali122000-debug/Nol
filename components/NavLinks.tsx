"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";

export default function NavLinks({ items }: { items: readonly { href: string; label: string; icon: string }[] }) {
  const path = usePathname() || "/";
  return (
    <ul className="mx-auto flex max-w-6xl gap-1.5 overflow-x-auto px-3 py-2 text-sm font-semibold [scrollbar-width:none]">
      {items.map((n) => {
        const active = path === n.href;
        return (
          <li key={n.href} className="shrink-0">
            <Link
              href={n.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ${
                active ? "bg-accent text-brand" : "text-white/85 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon name={n.icon} className="h-4 w-4" />
              {n.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
