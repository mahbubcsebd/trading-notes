'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (newLang: string) => {
    // Replace the current language in the pathname with the new one
    // e.g. /bn/learn -> /en/learn
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);

    // Create an explicit cookie for fumadocs next-i18n-router
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    router.push(newPath);
  };

  return (
    <Select value={currentLang} onValueChange={handleSwitch}>
      <SelectTrigger className="w-auto h-8 bg-transparent border-border text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors rounded-md px-3">
        <Globe size={13} className="mr-2" />
        <span>{currentLang.toUpperCase()}</span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bn" className="text-xs">
          বাংলা (BN)
        </SelectItem>
        <SelectItem value="en" className="text-xs">
          English (EN)
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
