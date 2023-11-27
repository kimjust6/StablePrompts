import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
export const metadata = {
  title: "Stable Prompts",
  description: "Find and Share prompts for Stable Diffusion",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Provider>
            <div className="main">
              <div className="gradient"></div>
            </div>
            <main className="app">
              <Nav />
              {children}
              <Analytics />
            </main>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
