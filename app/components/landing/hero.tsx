import { Button } from "~/components/ui/button";
import { Link } from "react-router";

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
}

export function Hero({ title, subtitle, ctaText, ctaLink, image }: HeroProps) {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex flex-col items-center gap-4 text-center">
        <h1 className="font-sans text-3xl font-bold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="max-w-2xl leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          {subtitle}
        </p>
        <div className="space-x-4">
          <Link to={ctaLink}>
            <Button size="lg">{ctaText}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
