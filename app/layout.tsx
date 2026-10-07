import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { LanguageProvider } from "@/components/language-provider";
import { SiteChrome } from "@/components/site-chrome";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const title = "Fitting Lab by HOWLSLAB – AI virtual try-on for fashion brands";
const description =
  "Fitting Lab is AI virtual try-on for fashion brands. Howls Lab builds brand demo rooms, shareable links, lead tracking, and the AI layer around try-on.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: "%s — HOWLSLAB",
  },
  description,
  applicationName: "HOWLSLAB",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HOWLSLAB",
    title,
    description,
    url: site.url,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <LanguageProvider>
            <SiteChrome>
              <SiteHeader />
            </SiteChrome>
            <main id="noi-dung" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <SiteChrome>
              <SiteFooter />
            </SiteChrome>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
