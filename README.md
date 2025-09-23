# Rick & Morty Characters App

A small single-page application built with **React 19 + TypeScript**, using **TanStack Query**, **TanStack Router**, and **TanStack Table**.  
App fetches data from the [Rick & Morty API](https://rickandmortyapi.com/documentation) and provides filtering, pagination, and character detail pages.

## Project Setup

This project was bootstrapped with **[Vite](https://vitejs.dev/)** using the official **React + TypeScript template**.

## Features
- Paginated list of characters
- Filtering by **name** and **status**
- Clear filters button
- Refresh button (with debounce) to re-fetch the current page
- Character details available on a dedicated route
- Pagination and filter state persisted in the URL (shareable link, survives refresh)
- Basic error handling 

## Not Implemented
- **Page size selection for pagination**  
  Rick & Morty API does not provide a way to control `pageSize` (number of results per page).  
  The API always returns a fixed number of results per page (`20`) and because of that I decided to not implement any custom solution 
that could make the entire solution problematic.

## Getting Started

### Prerequisites
- **Node.js >=22**

```bash
# Install dependencies
yarn install
```

```bash
# Run app
yarn dev
```

