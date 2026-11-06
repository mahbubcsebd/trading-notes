"use client";

import { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Languages, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { i18n } from "@/lib/i18n";

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const LANGUAGES: Record<string, { native: string; english: string }> = {
  bn: { native: "বাংলা", english: "Bangla" },
  en: { native: "English", english: "English" },
};

/** Swap only the leading /{lang} segment; keep the rest of the path intact. */
function swapLocale(pathname: string, next: string): string {
  const segments = pathname.split("/");
  if (i18n.languages.includes(segments[1])) {
    segments[1] = next;
    return segments.join("/") || `/${next}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const heading = currentLang === "bn" ? "ভাষা" : "Language";

  // Warm the RSC payload of the other locales so the switch is a soft, near-instant navigation.
  const prefetchOtherLocales = () => {
    for (const code of i18n.languages) {
      if (code !== currentLang) router.prefetch(swapLocale(pathname, code));
    }
  };

  const handleSwitch = (value: unknown) => {
    const next = String(value);
    if (next === currentLang || !i18n.languages.includes(next)) return;

    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
    const { search, hash } = window.location;
    startTransition(() => {
      router.push(`${swapLocale(pathname, next)}${search}${hash}`, {
        scroll: false,
      });
    });
  };

  return (
    <DropdownMenu
      onOpenChange={(open: boolean) => {
        if (open) prefetchOtherLocales();
      }}
    >
      <DropdownMenuTrigger
        onPointerEnter={prefetchOtherLocales}
        onFocus={prefetchOtherLocales}
        aria-label={`${currentLang.toUpperCase()} · ${heading}: ${LANGUAGES[currentLang]?.native ?? currentLang}`}
        className="chip group data-[popup-open]:border-mute data-[popup-open]:text-fg"
      >
        {isPending ? (
          <Loader2 size={13} className="animate-spin" aria-hidden="true" />
        ) : (
          <Languages size={13} aria-hidden="true" />
        )}
        <span>{currentLang.toUpperCase()}</span>
        <ChevronDown
          size={12}
          aria-hidden="true"
          className="opacity-60 transition-transform duration-200 group-data-[popup-open]:rotate-180"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="border-border shadow-soft w-52 rounded-xl border p-1.5 ring-0"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel
            inset={undefined}
            className="eyebrow px-2 pt-1 pb-2"
          >
            {heading}
          </DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={currentLang}
            onValueChange={handleSwitch}
          >
            {i18n.languages.map((code) => {
              const meta = LANGUAGES[code] ?? { native: code, english: code };
              const isActive = code === currentLang;
              return (
                <DropdownMenuRadioItem
                  key={code}
                  value={code}
                  inset={undefined}
                  closeOnClick
                  lang={code}
                  className="group/item [&_[data-slot=dropdown-menu-radio-item-indicator]_svg]:text-gold h-11 cursor-pointer gap-3 rounded-lg px-2 pr-8"
                >
                  <span
                    className={`flex h-7 w-8 shrink-0 items-center justify-center rounded-md border font-mono text-[10px] uppercase transition-colors ${
                      isActive
                        ? "border-gold/50 text-gold"
                        : "border-border text-muted-foreground group-focus/item:text-foreground"
                    }`}
                  >
                    {code}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col leading-tight">
                    <span className="text-sm font-medium">{meta.native}</span>
                    {meta.english !== meta.native && (
                      <span className="text-muted-foreground text-[11px]">
                        {meta.english}
                      </span>
                    )}
                  </span>
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
