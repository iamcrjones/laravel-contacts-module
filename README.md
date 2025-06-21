# CRM Application - Contacts Module

This project demonstrates a modular monolith architecture built with Laravel 11 on the backend and React with TypeScript on the frontend, focusing on the management of customer contacts.

## 1. Architecture Overview

The application is structured as a **feature/namespace modular monolith**. This means that while it's deployed as a single application, core business domains (like 'Contacts') are encapsulated into distinct modules within the codebase, with a strong emphasis on each module owning its own concerns.

**Key Architectural Principles Applied:**

-   **Modular Monolith:** The codebase is organized by feature (domain) rather than by technical type at the top level. This promotes high cohesion within a domain and significantly reduces coupling between domains.
-   **Full Feature Separation:** Each module aims to be as self-contained as possible, including its API controllers, forms, and resources.
-   **Separation of Concerns:** Distinct layers are maintained to separate responsibilities:
    -   **HTTP Layer (within module):** Handles incoming requests and outgoing responses specific to the module (Controllers, Form Requests, API Resources).
    -   **Domain/Business Logic Layer (Actions):** Contains the core logic and rules for each business domain.
    -   **Persistence Layer:** Handles database interactions (Eloquent Models).
-   **Strong Types:** The backend in PHP uses strong type hinting as well as route model binding to help ensure the application is typed as strong as possible given the time.
-   **Clear API/CLI Interface:** The backend exposes a RESTful API and command-line interfaces for core contact operations.
-   **Frontend SPA:** A React Single Page Application provides a rich user experience for managing contacts.

## 2. Code Structure and Rationale

### Backend (Laravel 11)

The backend leverages Laravel 11's streamlined structure and follows a strict modular approach.

**Rationale for Backend Structure:**

-   **`app/Modules/` for Domain Logic:** The `app/Modules/Contacts` directory encapsulates _all_ concerns related to the Contacts domain, including its API controllers (`Modules/Contacts/Http/Controllers/ContactsController.php`). This provides the strongest possible boundary for the module without it becoming it's own isolated package.
-   **Module-Specific `Http/` Folder:** Each module now has its own `Http/` folder, containing its `Controllers`, `Requests`, and `Resources`. This makes the module entirely self-contained regarding its HTTP interface.
-   **Action Pattern:** Business logic remains in single-responsibility "Action" classes, called from the module's own controllers.
-   **Data Transfer Objects (DTOs), Custom Validation Rules, CLI Commands:** These continue to reside within the module, reinforcing its self-contained nature.

### Frontend (React with TypeScript)

**Rationale for Frontend Structure:**

-   **Feature-Based Component Organization:** Components related to `Contacts` are grouped under `pages/Contacts/`.
-   **API Client Layer:** A dedicated `lib/api.ts` file centralizes all API calls, keeping component logic focused on UI and state.
-   **TypeScript:** Provides type safety across the frontend, ensuring data consistency and improving developer productivity.
-   **Shadcn UI & Tailwind CSS:** Chosen for building a scalable, accessible, and aesthetically pleasing UI with a focus on large-scale CRUD applications. Shadcn provides pre-built, customizable UI primitives.
-   **React Router DOM:** Manages client-side routing for seamless navigation within the SPA.

## 3. Acceptance Criteria Fulfilled

-   **API / CLI Interface:**
    -   **Upserted (created / updated):** Implemented via `ContactsController@store` (for create), `ContactsController@update` (for update), and `contacts:upsert` CLI command.
    -   **Deleted:** Implemented via `ContactsController@destroy` planned `contacts:delete` CLI command.
    -   **Read:** Implemented via `ContactsController@show` (single read) and `ContactsController@index` (all/filtered read), and `contacts:read` CLI command.
    -   **Called:** Implemented via `ContactsController@call` and `CallContactAction` with mocked responses.
-   **Data Validation:**
    -   Backend validation for phone numbers (E164, AU/NZ) and email validity is implemented using Laravel Form Requests (`ContactUpsertRequest`) and custom `Rules`.
    -   Basic client-side validation using `useState` in the `CreateContactDialog` and `zod` in the `EditContactDialog`.
-   **React-based Frontend:** A React SPA (`ContactListPage`) is built that interacts with the majority of the backend API endpoints (Create, Edit, Delete, Read/List, Call).
-   **Modular Monolith:** The backend is organized into a `Modules/Contacts` domain, clearly separating domain logic from the application's HTTP entry points.
-   **Testing:** PHPUnit tests are provided for the `Contact` model, demonstrating testability of business logic.

## 4. Concessions & Future Improvements

**Concessions (due to time/scope):**

-   **Finish Frontend Validation:** zod and react-hook-form are currently only use in the EditContactDialog, this should be added to the create dialog.
-   **Frontend Search Ability:** add the ability to search for specific contacts on the frontend.
-   **Frontend Error Handling UX:** Error messages are displayed but could be enhanced with toast notifications, clearer inline feedback, and more sophisticated state management for global errors.
-   **Cross-Module Communication:** For this single-module example, cross-module communication patterns (e.g., events, interfaces) were not explicitly demonstrated, but the modular structure lays the groundwork for them.
-   **Database Transactions in Actions:** While the prompt mentions transactions, they were not explicitly added to the Action classes. For multi-resource manipulations, transactions would be critical within the action to ensure atomicity.

**Future Improvements / Given More Time or Scope:**

-   **Frontend Global State Management:** Implement a more robust global state management solution (e.g., Zustand, Redux Toolkit, React Context API) for shared data like contacts list, loading states, and notifications, avoiding prop drilling in large component trees.
-   **Dedicated Frontend Utilities:** Create specific hooks (e.g., `useContactsApi`) for abstracting API calls and managing loading/error states within components.
-   **Pagination/Sorting/Filtering on Frontend:** Enhance the `ContactListPage` with actual server-side pagination, sorting, and more advanced filtering capabilities, consuming appropriate API endpoints.
-   **Integration Testing (Frontend):** Add Cypress or Playwright for end-to-end testing to ensure the full application flow works correctly.
-   **Jest w/ react testing library:** Add jest with react testing library for unit testing on the front end.
-   **Backend Policies & Authorization:** Implement Laravel Policies for fine-grained authorization control over Contact resources (e.g., "only managers can delete contacts").
-   **Enhanced Error Responses:** Provide more structured and detailed error responses from the API for better client-side handling of validation errors or other failures.
-   **Queues for Asynchronous Operations:** For potentially long-running tasks (like an actual call integration), leverage Laravel queues to perform actions asynchronously, improving API response times.
-   **Environment-Specific Configuration for Call Simulation:** Abstract the call simulation logic further so that in production, it seamlessly switches to a real VoIP service, while retaining the mock for development/testing.
