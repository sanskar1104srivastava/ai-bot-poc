import { Geist, Geist_Mono, Outfit, Roboto_Slab } from 'next/font/google';
import { headers } from 'next/headers';
import { ThemeProvider } from '@/components/app/theme-provider';
import { cn } from '@/lib/shadcn/utils';
import { getAppConfig, getStyles } from '@/lib/utils';
import '@/styles/globals.css';

// Geist / Geist Mono — the same pair the Sahai HIMS app uses.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// The slide deck's typefaces (docs/Interactive Animation Slides): a slab serif
// for headlines, Outfit for everything else. Loaded through next/font so they
// are self-hosted and do not shift layout on first paint.
const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-roboto-slab',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const hdrs = await headers();
  const appConfig = await getAppConfig(hdrs);
  const styles = getStyles(appConfig);
  const { pageTitle, pageDescription } = appConfig;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        geistSans.variable,
        geistMono.variable,
        robotoSlab.variable,
        outfit.variable,
        'font-sans antialiased'
      )}
    >
      <head>
        {styles && <style>{styles}</style>}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </head>
      <body className="h-dvh overflow-hidden">
        <ThemeProvider
          attribute="class"
          // A kiosk has one look. Without forcedTheme the page followed the
          // machine's OS theme and rendered dark on a dark-mode desktop.
          forcedTheme="light"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
