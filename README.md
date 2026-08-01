# Vitrina

Vitrina is a modern e-commerce web application built with **Vue 3**, **TypeScript**, **Pinia**, and the **Fake Store API**.

The application allows users to browse products, filter them by category, view product details, manage a shopping cart and a wishlist, and switch between light and dark themes.
---
# Live Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-0071E3?style=for-the-badge&logo=vercel&logoColor=white)](https://qubica.vercel.app/)

# Features

- Browse all available products
- Dynamic categories loaded from the API
- Filter products by category
- Product detail page
- Shopping cart
- Wishlist
- Light / Dark theme
- LocalStorage persistence
- Responsive layout

---

# Technologies

- Vue 3
- TypeScript
- Pinia
- Vue Router
- Axios
- Bootstrap Icons
- CSS

---

# Project Structure

```text
src
│
├── assets
├── components
├── router
├── services
├── stores
├── types
├── views
├── App.vue
└── main.ts
```

---

# Installation

Clone the repository:

```bash
git clone https://github.com/abSarhan02/qubica.git
```

Move into the project folder:

```bash
cd qubica
```

Install dependencies:

```bash
npm install
```

Start the local server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

---

# API

This project uses the **Fake Store API**.

https://fakestoreapi.com/

---

# Main Features

## Product Catalog

Browse all available products.

## Categories

Products can be filtered using dynamic categories retrieved from the API.

## Product Detail

Each product has its own detail page with:

- image
- title
- description
- category
- rating
- price

## Shopping Cart

- Add products
- Remove products
- Update quantity
- Automatic total calculation
- LocalStorage persistence

## Wishlist

- Save favourite products
- Remove favourites
- LocalStorage persistence

## Theme

- Light mode
- Dark mode
- Theme persistence

---
## AI Usage

Artificial Intelligence was used as a supporting tool during the development of this project.

It was mainly used to discuss implementation ideas, understand Vue concepts, review code, and improve the overall structure of the application.

All code was reviewed, tested, adapted, and integrated manually.
---

# Author

**Abdelkhalek Sarhan (Ab)**
