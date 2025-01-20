# Cursor Rules for Project

## Project Overview

**Project Name:** Premium Subscription Management App\
**Description:** A comprehensive web application for subscription management that enhances user engagement through automated subscription detection, multi-currency support, and AI-driven insights for cost efficiency. Designed with inspirations from Apple, Bauhaus, Airbnb, and Vercel, the app prioritizes a seamless user experience with natural language input capabilities.\
**Tech Stack:**

*   **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/UI, Radix UI, Lucide Icons
*   **Backend & Storage:** Supabase
*   **AI Tools:** GPT-4o, Claude 3.5 Sonnet

**Key Features:**

*   Multi-currency support (USD, BRL, Euro, Pounds)
*   Automated subscription detection
*   Customized alerts and notifications
*   AI-driven insights for cost analysis
*   Elegant and intuitive data visualizations
*   Integration with email, WhatsApp, and Telegram

## Project Structure

**Root Directory:**\
Contains main configuration files and project documentation.

**/frontend:**\
Contains all frontend-related code, including components, styles, and assets.

*   **/components:**

    *   Dashboard
    *   SubscriptionManager
    *   AlertsPage
    *   Settings
    *   LoginSignup

*   **/assets:**

    *   Logos
    *   Icons (Lucide Icons)
    *   Images (inspired by Apple, Bauhaus, Airbnb)

*   **/styles:**

    *   GlobalStyles (Tailwind CSS configurations)
    *   ThemeStyles (shadcn/UI and Radix UI styles)

**/backend:**\
Contains all backend-related code, including API routes and database models.

*   **/controllers:**

    *   SubscriptionController
    *   UserController
    *   NotificationController

*   **/models:**

    *   SubscriptionModel
    *   UserModel
    *   NotificationModel

*   **/routes:**

    *   api/subscriptions
    *   api/users
    *   api/notifications

*   **/config:**\
    Configuration files for environment variables and application settings.

**/tests:**\
Contains unit and integration tests for both frontend and backend components.

## Development Guidelines

**Coding Standards:**

*   Use TypeScript for type safety and clarity.
*   Follow Next.js best practices for project structuring and components.
*   Adhere to Tailwind CSS conventions for consistent styling.

**Component Organization:**

*   Components should be organized into logical directories, segregated by feature (e.g., Dashboard, Settings).
*   Shared components should reside in a `shared` directory within `/components`.

## Cursor IDE Integration

**Setup Instructions:**

1.  Install Node.js and the latest version of Next.js.
2.  Clone the repository and run `npm install` to set up dependencies.
3.  Configure environment variables using the `/config/env.example` file.
4.  Start the development server using `npm run dev`.

**Key Commands:**

*   `npm run dev`: Starts the development server.
*   `npm run build`: Compiles the project for production.
*   `npm run test`: Runs the test suite.

## Additional Context

**User Roles:**

*   **Standard User:** Manages their subscriptions with basic access.
*   **Admin User (Future Consideration):** Handles user management and support requests.

**Accessibility Considerations:**

*   Ensure all components are accessible according to the Web Content Accessibility Guidelines (WCAG).
*   Utilize Radix UI components for enhanced accessibility features.
