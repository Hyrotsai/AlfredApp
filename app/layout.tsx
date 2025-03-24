import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import Image from "next/image";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.webp",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-[#006FEE] font-sans antialiased bg-opacity-30 overflow-hidden",
          fontSans.variable,
        )}
      >
        <Image
          alt="Fondo"
          className="fixed w-screen h-screen z-[-1] object-cover"
          fill={true}
          src="/avion1.jpg"
        />
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            {/* <main className="container max-w-7xl pt-16 flex-grow"> {children}</main>*/}
            <main className="w-full pt-2 flex-grow">{children}</main>
            <ThemeSwitch />
          </div>
        </Providers>
      </body>
    </html>
  );
}
