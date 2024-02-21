import type { Metadata } from "next";
import { EB_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({ subsets: ["latin"] });
// const inter = {
//   family: 'EB Garamond',
//   subsets: ['latin'], // Include language subsets if needed
//   weight: ['400', '700'], // Include desired font weights
//   display: 'swap', // Enable faster font loading
// };


export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create Professional Resume Free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
