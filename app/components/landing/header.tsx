import { Link } from "react-router";
import { Button } from "~/components/ui/button";

interface HeaderProps {
  brand: string;
  ctaText: string;
  ctaLink: string;
}

export function Header({ brand, ctaText, ctaLink }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" to="/">
            <span className="font-bold sm:inline-block">{brand}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/admin"
              reloadDocument
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Link
              to={ctaLink}
              reloadDocument={ctaLink === "/admin" || ctaLink === "/admin/"}
            >
              <Button>{ctaText}</Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
