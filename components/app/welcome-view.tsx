import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText,
  onStartCall,
  ref,
}: React.ComponentProps<'div'> & WelcomeViewProps) => {
  return (
    <div ref={ref} className="flex flex-col items-center justify-center px-4">
      <section className="bg-background flex w-full max-w-md flex-col items-center gap-6 text-center">
        {/* Avatar */}
        <div className="relative">
          <div className="border-primary/20 ring-primary/10 size-28 overflow-hidden rounded-full border-4 shadow-xl ring-4">
            <Image
              src="/avartar_new.jpeg"
              alt="AlgoFlow AI Interviewer"
              width={112}
              height={112}
              className="size-full object-cover"
            />
          </div>
          {/* Online indicator */}
          <span className="border-background absolute right-1 bottom-1 size-4 rounded-full border-2 bg-green-500" />
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Ready for your interview?</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your AI interviewer is online. You&apos;ll have a live video session with a built-in
            notes editor to write your answers and code.
          </p>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {['Voice & Video', 'Notes Editor', 'Code Snippets', 'Real-time AI'].map((f) => (
            <span
              key={f}
              className="bg-primary/8 text-primary rounded-full px-3 py-1 text-xs font-medium"
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Button
          size="lg"
          onClick={onStartCall}
          className="w-full max-w-xs rounded-full font-mono text-xs font-bold tracking-wider uppercase"
        >
          {startButtonText}
        </Button>

        <p className="text-muted-foreground text-xs">
          Make sure your microphone is enabled before starting.
        </p>
      </section>
    </div>
  );
};
