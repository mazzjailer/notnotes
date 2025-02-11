import { Inter } from "next/font/google";
import "./globals.css";
import Session from "@/contexts/session";
import Header from "@/components/header"

const roboto = Inter({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "notNotes",
  description: "not just a notes app.",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={roboto.className}
      >
        <Session>
          <Header />
          <div className="p-6 py-28 md:p-36 md:py-28">
            {children}
          </div>
        </Session>
      </body>
    </html>
  );
}
