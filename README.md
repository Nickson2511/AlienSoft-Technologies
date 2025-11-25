# Vue Product Management App

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Folder Structure](#folder-structure)
5. [Setup Instructions](#setup-instructions)
6. [Usage](#usage)
7. [Pinia Stores](#pinia-stores)
8. [Routing](#routing)
9. [API Integration](#api-integration)
10. [Authentication Flow](#authentication-flow)
11. [Product Management Flow](#product-management-flow)
12. [Styling](#styling)
13. [Deployment](#deployment)
14. [Assumptions](#assumptions)
15. [Future Improvements](#future-improvements)
16. [Screenshots](#screenshots)
17. [License](#license)

---

## Project Overview

This is a **mini Product Management Application** built with Vue 3, Tailwind CSS, and Pinia.  
The goal is to allow users to:

- Authenticate (login)
- View products
- Add products
- Manage products

It uses the public **DummyJSON API** as the backend.

---

## Features

- **Login Page:**  
  User authentication with token storage in Pinia and localStorage.
- **Product List:**  
  - Search products by title  
  - View product details  
  - Add new products
- **Add Product Page:**  
  Form validation and submission
- **View Product Page:**  
  Shows detailed info and delete/edit options
- **State Management:**  
  Pinia handles auth and product states
- **Responsive Design:**  
  Works well on desktop, tablet, and mobile
- **Tailwind CSS:**  
  Styled according to provided mockups with `#000080` primary color

---

## Tech Stack

- Vue 3 (Composition API)  
- Pinia (State Management)  
- Vue Router (Routing)  
- Tailwind CSS (Styling)  
- Axios / Fetch (API requests)  
- GitHub Pages (Deployment)

---

## Folder Structure


src/
 ├── api/                # All API calls (clean separation)
 │    ├── auth.api.ts
 │    └── products.api.ts
 │
 ├── assets/             # Images, icons, static assets
 │
 ├── components/         # Reusable UI components
 │    ├── common/
 │    │     ├── AppButton.vue
 │    │     ├── AppInput.vue
 │    │     └── AppCard.vue
 │
 ├── composables/        # Reusable logic (like React hooks)
 │    ├── useFetch.ts
 │
 ├── layouts/            # Layout wrappers
 │    └── AppLayout.vue
 │
 ├── pages/              # Route-level views
 │    ├── Login.vue
 │    ├── Products/
 │    │      ├── ProductList.vue
 │    │      ├── ProductView.vue
 │    │      └── ProductNew.vue
 │
 ├── router/
 │    └── index.ts       # Route definitions + guards
 │
 ├── store/              # Pinia stores
 │    ├── auth.store.ts
 │    └── products.store.ts
 │
 ├── types/              # Global TypeScript interfaces
 │    ├── auth.d.ts
 │    └── product.d.ts
 │
 ├── utils/              # Helper functions
 │    └── format.ts
 │
 ├── App.vue             # Root component
 └── main.ts             # App entry



---

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/vue-product-app.git


Navigate to the project:

cd vue-product-app

Install dependencies:

npm install (ENSURE YOU SWITCH TO NODE VERSION  v20.19.5   USE NVM FOR THIS)

Start development server:

npm run dev

Open browser at http://localhost:5173


Usage

Go to Login Page: /login

Enter your username & password (dummy credentials for DummyJSON)

Click Login → redirected to Product List

Use search/filter or add new product


Pinia Stores

Auth Store (auth.store.ts)

State: token, user

Actions: login(), logout(), restoreSession()

Getter: isAuthenticated

Products Store (products.store.ts)

State: products, isLoading, error

Actions: fetchProducts(), addProduct(), updateProduct(), deleteProduct()

API calls include auth token when required


Routing

/login → Login page

/products → Product list

/products/new → Add product

/products/:id → View product

Route guards implemented for authenticated access.


API Integration

Auth API: https://dummyjson.com/auth/login

Products API: https://dummyjson.com/products

Operations:

GET /products

GET /products/:id

POST /products/add (requires token)

DELETE /products/:id (requires token)


Authentication Flow

User submits login form

API returns token and user info

Token saved in Pinia + localStorage

Protected routes check isAuthenticated getter


Product Management Flow

View Products → Table with thumbnails, title, description, category, price, stock

Add Product → Form with validation

View Single Product → Shows details with edit/delete options


Styling

Tailwind CSS used extensively

Primary color #000080 for headings, buttons, and accents

Responsive design for multiple screen sizes


Deployment

Build for production:

   npm run build


Deploy to GitHub Pages:

Live link: https://<your-username>.github.io/vue-product-app



Assumptions

DummyJSON API is used as backend

No user registration implemented

Edit and delete are optional features



Future Improvements

Add pagination for products

Add category filter and price filter

Implement product image upload to real server

Implement update product fully

Add unit tests for components

