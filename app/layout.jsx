import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { Analytics } from '@vercel/analytics/react';
export const metadata = {
    title: "Stable Prompts",
    description: "Find and Share prompts for Stable Diffusion",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <Provider>
                    <div className="main">
                        <div className="gradient"></div>
                    </div>
                    <main className="app">
                        <Nav></Nav>
                        {children}
                        <Analytics />
                    </main>
                </Provider>
            </body>
        </html>
    );
};

export default RootLayout;
