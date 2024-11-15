# Product Filtering System (React.js)

## Overview

This project is a **Dynamic Filtering System for a Product Catalog** built with **React.js (without TypeScript)**. The system allows users to filter products based on multiple criteria such as category, price range, brand, and rating. It supports real-time filtering, sorting, responsive design, and user feedback. The application also ensures performance optimization for large datasets and includes features like sorting, persistent preferences, and testing.

## Features

- **Data Fetching:** Fetches product data from mock data (could be swapped with an API) and handles pagination if necessary.
- **Filter Options:** Allows filtering by category, brand, price range, and rating in a sidebar or filter panel.
- **Real-Time Filtering:** Filters update in real time as users interact with the filter options, with debouncing to avoid unnecessary renders.
- **Responsive Design:** Ensures a smooth experience on both desktop and mobile devices. The filter menu is collapsible on smaller screens.
- **User Feedback:** Displays a loading spinner while fetching or applying filters and shows a "no products found" message if no products match the current filters.
- **Optimization:** Uses memoization and efficient filtering logic for improved performance with large datasets.
- **Sorting (Bonus):** Adds the ability to sort products by price, rating, and popularity. Sorting integrates with filtering.
- **Persistent Preferences (Bonus):** Saves user preferences (filters and sorting) to **localStorage**, allowing them to persist across page reloads.
- **Testing (Required):** Unit tests to check the functionality of the filtering system using Jest and React Testing Library.

## Installation

Follow the steps below to get your environment set up.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/product-filtering-system.git
```
