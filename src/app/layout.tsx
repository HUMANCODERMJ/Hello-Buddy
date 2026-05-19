import type { Metadata } from "next";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ViewProvider } from "@/contexts/ViewContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hi Buddy | Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
function setVh() {
  document.documentElement.style.setProperty('--app-vh', window.innerHeight + 'px');
}
setVh();
window.addEventListener('resize', setVh);
`,
          }}
        />
        <ThemeProvider>
          <ViewProvider>{children}</ViewProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
