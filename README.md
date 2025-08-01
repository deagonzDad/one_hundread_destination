# One Hundred Destination

## Project Overview

"One Hundred Destination" is a static web application designed to allow users to explore a curated list of 100 dream travel destinations across the globe. Built with Astro, the project prioritizes performance, responsiveness, and an intuitive user experience, translating a detailed design into a functional and visually appealing site.

## Features

### Home Page
- Displays the main title "100 Dream Destinations" with an interactive world map background.
- Features a prominent "Start Exploring" button to begin the journey.

### Continent Selection
- Presents an interactive world map where users can select a continent.
- Continent labels highlight on hover/click, leading to a detailed view of destinations within that continent.

### Continent Detail Page
- Shows a map of the selected continent alongside a scrollable list of destinations.
- Allows users to click on a destination to view more details.
- Includes navigation for moving back to continent selection or cycling through other continents.

### Destination Detail Pop-up/Modal
- Provides in-depth information about a specific destination, including images and expandable detail sections.
- Designed for easy dismissal to return to the continent's destination list.

## Technology Stack

- **Frontend Framework:** Astro
- **Language:** TypeScript
- **Output:** Static Site Generation

## Key UI Components

- `TitleComponent`: For main titles.
- `FullMapComponent`: For interactive world maps (global and continent-specific).
- `BtnComponent`: General-purpose buttons like "Start Exploring".
- `BtnContinent`: Interactive buttons/labels for continent selection.
- `BtnSelectorCity`: List items for individual cities/destinations.

## Design & Development Considerations

- **Responsiveness:** The application is designed to be fully responsive, ensuring optimal viewing and interaction across desktop, tablet, and mobile devices.
- **Accessibility:** Adherence to accessibility standards, including semantic HTML and keyboard navigation, is a core principle.
- **Performance:** Leveraging static site generation and optimizing assets (e.g., WebP images, lazy loading) to ensure fast load times and a smooth user experience.

## Getting Started

(Further instructions on how to set up the project locally, install dependencies, and run the development server would typically go here.)

## Project Structure

(A brief overview of the project's directory structure can be added here.)