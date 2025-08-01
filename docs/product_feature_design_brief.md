# One Hundred Destination - Design Brief

## 1. Overview
This document outlines the user flows, key UI components, and interaction patterns for the "One Hundred Destination" application, based on the Adobe XD design and the project's vision.

## 2. User Flows & UI Components

### 2.1. Home Page Flow

*   **User Goal:** Discover the purpose of the site and initiate exploration.
*   **Flow:**
    1.  User lands on the Home Page.
    2.  User sees the main title "100 Dream Destinations" and a world map background.
    3.  User clicks the "Start Exploring" button.
*   **Key UI Components:**
    *   `TitleComponent`: Displays "100 Dream Destinations".
    *   `FullMapComponent`: Displays the interactive world map as a background.
    *   `BtnComponent`: "Start Exploring" button.
*   **Interaction Details:**
    *   Clicking "Start Exploring" transitions to the Continent Selection view.

### 2.2. Continent Selection Flow

*   **User Goal:** Select a continent to explore destinations within it.
*   **Flow:**
    1.  User views the world map with continent labels.
    2.  User hovers/clicks on a continent label (e.g., "Asia").
    3.  The selected continent label highlights.
    4.  User clicks the selected continent label.
*   **Key UI Components:**
    *   `FullMapComponent`: Displays the interactive world map.
    *   `BtnContinent`: Buttons/labels for each continent (e.g., "North America", "Europe", "Asia", "South America", "Africa", "Australia").
*   **Interaction Details:**
    *   Continent labels are clickable.
    *   Clicking a continent transitions to the Continent Detail Page for that continent.

### 2.3. Continent Detail Page Flow

*   **User Goal:** Browse destinations within a selected continent and view their details.
*   **Flow:**
    1.  User lands on the Continent Detail Page (e.g., "Australia").
    2.  User sees a map of the continent on the left and a list of destinations on the right.
    3.  User scrolls through the list of destinations.
    4.  User clicks on a destination list item (e.g., "Sydney, Australia").
    5.  A Destination Detail Pop-up/Modal appears.
*   **Key UI Components:**
    *   `FullMapComponent`: Displays the specific continent map.
    *   `BtnSelectorCity`: List items for each city/destination.
    *   Navigation buttons: "Back" button, "Previous Continent" arrow, "Next Continent" arrow.
    *   (Hidden/Commented) Placeholder elements: Blue dots and donut alongside `BtnSelectorCity`.
*   **Interaction Details:**
    *   Clicking a destination list item triggers the modal.
    *   "Back" button navigates to the previous screen (Continent Selection).
    *   Continent navigation arrows cycle through continents.

### 2.4. Destination Detail Pop-up/Modal Flow

*   **User Goal:** View detailed information about a specific destination.
*   **Flow:**
    1.  Modal appears after selecting a destination.
    2.  User sees an image, city/country name, and expandable detail sections (e.g., "Opera House").
    3.  User clicks on an expandable detail section to reveal more text.
    4.  User clicks the "X" button or outside the modal to close it.
*   **Key UI Components:**
    *   Modal container.
    *   Image display.
    *   Text elements for city/country.
    *   Expandable sections (e.g., `BtnComponent` or similar for "Opera House", "Harbour Bridge", "Bondi Beach").
    *   Close button (`X`).
*   **Interaction Details:**
    *   Expandable sections toggle visibility of descriptive text.
    *   Modal can be dismissed by clicking the "X" or outside its bounds.

## 3. Considerations

*   **Responsiveness:** All layouts (Home, Continent Selection, Continent Detail, Modals) must be fully responsive across desktop, tablet, and mobile devices.
*   **Accessibility:** Ensure proper semantic HTML, ARIA attributes where necessary, and keyboard navigation for all interactive elements.
*   **Performance:** Adhere to static site generation best practices, especially for image optimization (WebP, lazy loading) to meet the project's performance goals.
*   **Hidden Elements:** The blue dots and donut elements associated with destination list items will be included in the code but hidden or commented out for future use, as per user request.

This brief will serve as a guide for implementing the UI/UX of the "One Hundred Destination" project.
