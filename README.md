# Week 6 — PPAW: JavaScript DOM, Event Handling, and Fetch API

A responsive frontend project for the PPAW Week 6 individual assignment.

## Features

### 1. Fetch API — Product Explorer
- Fetches product data from `https://dummyjson.com/products?limit=30`.
- Parses the JSON response.
- Displays product images, names, prices, categories, and ratings in the webpage.
- Includes loading, error, and empty-result states.
- Includes a retry button and client-side product search.
- Checks `response.ok` before processing the response.

### 2. Form — DOM and Event Handling
- Uses a form submit event listener.
- Validates required fields and email format.
- Displays field errors and dynamic feedback.
- Uses an input event listener to update the character count.
- Prevents the default page reload on form submission.
- Does not send or store submitted personal information.

## Project structure

```text
Week6-PPAW-Project/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

1. Download or clone this repository.
2. Open the folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the **Live Server** extension.
4. Make sure the internet connection is active so the DummyJSON API can be reached.

## Test checklist

- [ ] Product cards load from DummyJSON.
- [ ] Loading state appears while products are being fetched.
- [ ] Search filters products by title or category.
- [ ] Reload button fetches the products again.
- [ ] Error state and retry button work when the API is unavailable.
- [ ] Empty name, invalid email, and missing resource type show validation messages.
- [ ] A valid form submission shows a success message without reloading the page.
- [ ] Browser DevTools Console has no errors that break the main features.

## GitHub submission

Create a new repository using the required format:

`Week6-Kelas[X]-[NIMLengkap]`

Replace `[X]` with your class and `[NIMLengkap]` with your full student ID. Do not submit your Week 5 repository.

Example commands (run inside this project folder after creating an empty GitHub repository):

```bash
git init
git add .
git commit -m "Complete PPAW Week 6 assignment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Replace the remote URL with your own repository URL.
