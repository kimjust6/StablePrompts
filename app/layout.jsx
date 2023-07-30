import "@styles/globals.css";

export const metadata = {
    title: "Stable Diffusion Prompter",
    description: "Find and Share prompts for Stable Diffusion",
};

const RootLayout = ({children}) => {
    return (
        <html lang="en">
            <body>
                <div className="main">
                    <div className="gradient"></div>
                    <main className="app">{children}</main>
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
