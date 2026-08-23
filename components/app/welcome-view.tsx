import Image from 'next/image';
import { Button } from '@/components/ui/button';

function SahaiLogo() {
  return (
    <div className="mb-6 h-16 w-auto">
      <Image
        src="/sahai-logo-light.png"
        alt="Sahai"
        width={240}
        height={64}
        className="block h-16 w-auto dark:hidden"
        priority
      />
      <Image
        src="/sahai-logo-dark.png"
        alt="Sahai"
        width={240}
        height={64}
        className="hidden h-16 w-auto dark:block"
        priority
      />
    </div>
  );
}

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
    <div ref={ref} className="flex min-h-0 flex-1 flex-col">
      <section className="bg-background flex h-full min-h-0 flex-col items-center justify-center text-center">
        <SahaiLogo />

        <p className="text-foreground max-w-prose pt-1 leading-6 font-medium">
          Sahai se baat karein — Algoflow AI ka HIMS assistant
        </p>

        <Button
          size="lg"
          onClick={onStartCall}
          className="mt-6 w-64 rounded-full font-mono text-xs font-bold tracking-wider uppercase"
        >
          {startButtonText}
        </Button>
      </section>
    </div>
  );
};
