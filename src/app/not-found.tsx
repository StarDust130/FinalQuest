import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex md:min-h-screen mt-40 md:mt-0 w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="space-y-4">
        <h1 className="text-9xl font-bold tracking-tighter text-foreground">
          404
        </h1>
        <div className="space-y-2">
          <p className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            Page Not Found 😵
          </p>
          <p className="text-muted-foreground">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
        </div>
        <Button asChild>
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
