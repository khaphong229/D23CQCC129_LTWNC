import { Menu } from 'lucide-react';
import Link from 'next/link';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import ModeToggle from '@/components/ModeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

type HeaderItem = {
  title: string;
  href: string;
};

const navItems: HeaderItem[] = [
  { title: 'About', href: '#about' },
  { title: 'Stack', href: '#stack' },
  { title: 'Blog', href: '#blog' },
  { title: 'Experience', href: '#experience' },
  { title: 'Projects', href: '#projects' },
];

const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    const yOffset = -100;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

export default function Header() {
  return (
    <header className="sticky top-5 z-50 w-full px-4">
      <div className="mx-auto max-w-7xl">
        <nav className="border rounded-md flex h-20 items-center gap-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-1 px-4">
          <Link href="/" className="inline-flex flex-1 items-center gap-2">
            <span className="color-primary-text text-2xl font-bold tracking-tight">khaphong.io.vn</span>
          </Link>
          <div className="hidden gap-2 lg:inline-flex">
            {navItems.map((item: HeaderItem) => (
              <Button key={item.title} asChild variant="ghost">
                <a
                  href={item.href}
                  onClick={e => handleNavClick(e, item.href.replace('#', ''))}
                >
                  {item.title}
                </a>
              </Button>
            ))}
            <Button asChild variant="ghost">
              <Link href="/about">Trang Giới thiệu (SEO)</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/sign-in">Đăng nhập</Link>
            </Button>
          </div>
          <div className="inline-flex flex-1 justify-end gap-2">
            <div className="hidden lg:block">
              <LocaleSwitcher />
            </div>
            <ModeToggle />
          </div>

          <Sheet>
            <SheetTrigger asChild className="ml-auto lg:hidden">
              <Button variant="outline" size="icon" aria-label="Open Menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-[90%] max-w-sm flex-col px-6 py-6">
              <SheetTitle>
                <Link href="/" className="inline-flex items-center gap-2">
                  <span className="color-primary-text text-2xl font-bold tracking-tight">khaphong.io.vn</span>
                </Link>
              </SheetTitle>
              <nav className="-mx-4 my-6 flex flex-1 flex-col gap-2">
                {navItems.map((item: HeaderItem) => (
                  <Button key={item.title} asChild className="justify-start text-base" variant="ghost">
                    <a
                      href={item.href}
                      onClick={e => handleNavClick(e, item.href.replace('#', ''))}
                    >
                      {item.title}
                    </a>
                  </Button>
                ))}
                <Button asChild className="justify-start text-base" variant="ghost">
                  <Link href="/about">Trang Giới thiệu (SEO)</Link>
                </Button>
                <Button asChild className="justify-start text-base" variant="outline">
                  <Link href="/sign-in">Đăng nhập</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
