"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, RefreshCw } from "lucide-react";
import Image from "next/image";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  const handleBack = () => {
    window.history.back();
  };

  const handleHelp = () => {
    const msg = "🙋 Hey! I'm using your app and need some help with: ";
    window.open(
      `https://wa.me/919302903537?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <div className="flex md:min-h-screen mt-30 md:mt-0 flex-col items-center justify-center px-4 py-8 text-center">
      <div className="max-w-sm w-full space-y-6">
        {/* Friendly Icon */}
        <Image
          src="/error.gif"
          alt="Error Illustration"
          width={300}
          height={300}
          className="mx-auto"
        />

        {/* Title + Subtitle */}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold sm:text-3xl text-red-500">
            😭 Oh noo. an error happened
          </h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Something went wrong while loading. You can try again, go back, or
            reach out for help.
          </p>
        </div>

        {/* Buttons Row */}
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="sm" onClick={handleBack}>
            <ArrowLeft className="mr-1 h-4 w-4" />
            Go Back
          </Button>
          <Button size="sm" onClick={reset}>
            <RefreshCw className="mr-1 h-4 w-4" />
            Try Again
          </Button>
        </div>

        {/* Help CTA */}
        <Button
          onClick={handleHelp}
          variant="ghost"
          className="mx-auto text-xs font-medium text-primary"
        >
          <MessageSquare className="mr-1 h-3 w-3" />
          Need Help? <span className="underline ml-1">Chat with us</span>
        </Button>

        {/* Dev-only error details */}
        {process.env.NODE_ENV === "development" && (
          <details className="pt-2 text-left">
            <summary className="cursor-pointer text-xs text-muted-foreground">
              Error details
            </summary>
            <pre className="mt-1 w-full overflow-auto rounded-md bg-slate-950 p-3 text-xs text-slate-50">
              {error?.message || "No error message available."}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default Error;
