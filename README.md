# Movie-TV-Show-App

## Overview

This is a Movie/TV Show application that allows users to explore movies and TV shows, manage their own watchlists, and rate them. The app supports user authentication, allowing only registered user to add, edit, or delete items and add comment, while guests can view movies/tv shows and their details, including comments.

## Technologies

- **React:** Frontend freamwork for building the user interface.
- **Express:** Backend framework for handling server-side logic and API endpoints.
- **MongoDB:** NoSQL database fpr storing recipe data.
- **Mongoose:** MongoDB object modeling tool for Node.js.

## Features

- **User Authentication:** Users can register, log in, and manage their accounts.
- **CRUD Operations:**
  - **Add:** Logged-in users can add new movies and TV shows.
  - **Edit:** Only the owner of an item can edit it.
  - **Delete:** Only the owner of an item can delete it.
- **Rating System:** Users can rate movies and TV shows.
- **Watchlist:** Users can add items to their watchlist.
- **Comments:**
  - **Add:** Logged-in users can add comments to movies and TV shows.
  - **View:** Guests and logged-in users can view comments.
- **Guest Access:** Guests can view items, their details, and comments.

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB (installed and running)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/movie-tv-show-app.git
   cd movie-tv-show-app
2. Navigate to the project directory
3. Install dependencies for both frontend and backend
4. Set up MongoDB:
     - install MongoDB on your machine if you haven't already.
5. Run the application:
     - start the backend server
     - start the frontend server
6. Open your browser and navigate to `http://localhost:5173` to view the application.

## Usage

1. Registration and Login:
- Navigate to the registration page to create a new account.
- Log in using your credentials to access additional features.
2. Viewing Movies/TV Shows:
- Browse the list of movies and TV shows.
- Click on an item to view detailed information, including comments.
3. Managing Items (for logged-in users):
- **Add:** Use the form to add new movies or TV shows.
- **Edit/Delete:** Access the edit or delete options from the item's detail page (only available to the owner of the item).
4. Rating:
- Rate movies and TV shows from their detail pages.
5. Watchlist:
- Add items to your watchlist from the detail pages.
6. Comments:
- **Add:** Logged-in users can add comments to movies and TV shows.
- **View:** Both guests and logged-in users can view comments on items.