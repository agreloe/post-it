## Post it.

URL: https://postit-web.netlify.app/

For sign in with credentials, any credentials will log in.

## Overview

This document provides a comprehensive overview of the technical challenge project, including authentication, component development, dashboard generation, handling large datasets, testing, and documentation. Each task is described with implementation strategies, design patterns, and relevant approaches.

## Task 1: Authentication with Next.js

### Objectives

-   Secure routes using NextAuth.js (Auth.js) for authentication.
-   Evaluate design patterns in the implementation.
-   Create a custom domain model.

### Implementation

#### Authentication Setup with NextAuth.js

**Steps Taken**:

-   **Integration of NextAuth.js**:

    -   Installed NextAuth.js to handle authentication.
    -   Configured NextAuth.js with providers (GitHub and credentials) to support various authentication methods.

-   **Configuration**:

    -   Set up the Prisma adapter to integrate with the Prisma ORM for database management.
    -   Defined user model and related entities in the Prisma schema.

-   **Route Protection**:

    -   Implemented middleware to protect sensitive routes by redirecting unauthenticated users to the login page.

**Design Patterns**:

-   **Adapter Pattern**: Used to integrate NextAuth.js with different databases through PrismaAdapter, promoting flexibility and separation of concerns.
-   **Strategy Pattern**: Applied to manage multiple authentication providers, allowing the application to support various authentication methods without altering the core authentication logic.

## Task 2: Component Development

### Objectives

-   **Animated UI Components**: Create a UI Kit and implement a theme system with multiple theme options.
-   **Custom Hook**: Create a custom hook for handling complex state management scenarios.

### Implementation

#### Animated UI Components

**Steps Taken**:

-   **UI Kit**:

    -   Developed a set of reusable UI components using Tailwind CSS for styling.
    -   Ensured components support both light and dark themes for better user experience.

-   **Theme System**:

    -   Integrated `next-themes` library to manage theme switching.
    -   Configured Tailwind CSS to work seamlessly with the theme provider.

#### Custom Hook

**Steps Taken**:

-   **useFetch Hook**:
    -   Created a custom hook using `SWR` for data fetching, caching, and real-time updates.
    -   Applied the hook in multiple components to manage data fetching efficiently and consistently.

## Task 3: Dashboard Generation

### Objectives

-   Develop a dashboard to show a summary of information, including a graph using Chart.js.

### Implementation

**Steps Taken**:

-   **Dashboard Layout**:

    -   Designed a dashboard layout with sections to display various statistics and information.

-   **Chart Integration**:

    -   Integrated `Chart.js` to visualize data on the dashboard.
    -   Created components like `PostsChart` and `PostsLikesChart` to display user activity and engagement metrics.

## Task 4 & 5: Large Data Set Handling

### Objectives

-   Display a large set of records efficiently.
-   Implement SSR for critical pages.
-   Ensure efficient resource loading.

### Implementation

**Steps Taken**:

-   **Infinite Scroll**:

    -   Implemented an infinite scroll component to handle large datasets efficiently.
    -   Utilized `IntersectionObserver` to load more data from the DummyAPI as the user scrolls down the page.

-   **Server-Side Rendering (SSR)**:

    -   Implemented SSR for critical pages to improve initial loading times.
    -   Used Next.js server-side rendering capabilities to pre-render pages and enhance performance.

## Task 6: Testing

### Objectives

-   Perform unit testing of the application with Cypress.
-   Perform E2E testing of the application, with Jest or React Testing Library.

### Implementation

**Steps Taken**:

-   **Unit Testing with Cypress**:

    -   Set up Cypress for unit testing of components.
    -   Created tests for individual components to ensure they function correctly.
-   **E2E Testing**:

    -   Used Jest and React Testing Library for end-to-end testing.
    -   Developed comprehensive tests to cover various user flows and interactions within the application.
