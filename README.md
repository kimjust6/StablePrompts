# StablePrompts

StablePrompts is a web application utilizing Next.js, developed to facilitate the discovery, creation, and distribution of artificial intelligence prompts. The platform provides a streamlined interface for efficient prompt management and image synthesis via the Google Gemini API.

## Core Functionalities

- **Prompt Discovery**: Access a comprehensive registry of community-generated prompts.
- **Image Synthesis**: Generate visual assets from textual descriptions utilizing the Google Gemini Flash model.
- **User Management**: Dedicated user profiles for portfolio management and prompt sharing.
- **Advanced Search**: Filter and retrieve prompts based on tags, keywords, or content attributes.
- **Performance Optimization**: Implements lazy loading architectures to enhance initial payload delivery and rendering performance.

## Installation and Configuration

### System Requirements

- Node.js (v18.0.0 or later)
- MongoDB Instance
- Google Cloud Project with Gemini API Access

### Deployment Instructions

1.  **Repository Cloning**:
    ```bash
    git clone https://github.com/kimjust6/StablePrompts.git
    cd StablePrompts
    ```

2.  **Dependency Installation**:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Establish a `.env` file in the root directory containing the following credentials:
    ```
    GOOGLE_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    MONGODB_URI=your_mongodb_connection_string
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    GEMINI_API_KEY=your_gemini_api_key
    ```

4.  **Application Startup**:
    Execute the development server:
    ```bash
    npm run dev
    ```

5.  **Access**:
    Navigate to [http://localhost:3000](http://localhost:3000) in a supported web browser.

## Technical Stack

- **Framework**: Next.js 15
- **Styling Architecture**: Tailwind CSS
- **Database**: MongoDB (Mongoose ODM)
- **Authentication System**: NextAuth.js
- **AI Integration**: Google Gemini Flash

## Contribution Guidelines

Contributions are encouraged. Please submit issues or pull requests to the repository for feature enhancements or defect resolution.
