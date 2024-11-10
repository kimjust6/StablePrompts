import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
export const metadata = {
  title: "Stable Diffusion Prompts",
  description:
    "Find and Share prompts for Stable Diffusion.  Generate your own images with prompt engineering.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Provider>
              <main className="app">
                <Nav />
                {children}
                {/* <Analytics /> */}
              </main>
            </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
