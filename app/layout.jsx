import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
    title: "Stable Diffusion Prompter",
    description: "Find and Share prompts for Stable Diffusion",
};

const RootLayout = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient"></div>
                </div>
                <main className="app">
                    <Nav></Nav>
                    {children}
                </main>
            </body>
        </html>
    );
};

export default RootLayout;
