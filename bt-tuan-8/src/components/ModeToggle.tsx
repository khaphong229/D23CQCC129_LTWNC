'use client';

import {
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleMount = () => {
      setMounted(true);
    };
    handleMount();
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="rounded-full w-10"
        aria-label="Toggle Theme"
      >
        <div className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      className="rounded-full w-10"
      aria-label="Toggle Theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark'
        ? (
            <Sun className="size-5" />
          )
        : (
            <Moon className="size-5" />
          )}
    </Button>

  );
}
