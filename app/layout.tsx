import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HideOnHome } from "@/components/site-chrome";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "HOWL LAB — Những sản phẩm đã làm ra",
    template: "%s — HOWL LAB",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: "HOWL LAB — Những sản phẩm đã làm ra",
    description: site.description,
    url: site.url,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider>
          <HideOnHome>
            <SiteHeader />
          </HideOnHome>
          <main id="noi-dung" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <HideOnHome>
            <SiteFooter />
          </HideOnHome>
        </ThemeProvider>
      </body>
    </html>
  );
}
