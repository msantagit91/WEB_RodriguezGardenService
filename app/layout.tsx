import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RODRIGUEZ GARDEN SERVICE",
  description:
    "Mantenimiento profesional de zonas verdes, poda, césped, cercas vivas y control de plagas para hogares y empresas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
