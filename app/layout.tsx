import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import ModalProvider from "@/components/ModalProvider";
import { RevealAndTop } from "@/components/ui";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: `${CONFIG.brand} POS — Run your whole business from one place`,
  description: `${CONFIG.brand} POS: fast billing, live stock and daily WhatsApp reports for every shop in your chain.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Cormorant+Garamond:wght@500;600&family=Poppins:wght@400;500&family=Urbanist:wght@500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `try{document.documentElement.dataset.theme=localStorage.getItem('campra_theme')||'light'}catch(e){}` }} />
      </head>
      <body>
        <ModalProvider>
          <Header />
          <main>{children}</main>
          <RevealAndTop />
        </ModalProvider>
      </body>
    </html>
  );
}
