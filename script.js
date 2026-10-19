const API_URL = "https://dummyjson.com/products?limit=30";

const productGrid = document.querySelector("#product-grid");
const loadingState = document.querySelector("#loading-state");
const errorState = document.querySelector("#error-state");
const errorMessage = document.querySelector("#error-message");
const emptyState = document.querySelector("#empty-state");
const productCount = document.querySelector("#product-count");
const searchInput = document.querySelector("#search-input");
const retryButton = document.querySelector("#retry-button");
const errorRetryButton = document.querySelector("#error-retry-button");

let products = [];

function showLoading() {
  loadingState.hidden = false;
  errorState.hidden = true;
  emptyState.hidden = true;
  productGrid.replaceChildren();
  productCount.textContent = "Loading products…";
}

function showError(message) {
  loadingState.hidden = true;
  errorState.hidden = false;
  emptyState.hidden = true;
  productGrid.replaceChildren();
  productCount.textContent = "Products unavailable";
  errorMessage.textContent = message;
}

function createProductCard(product) {
  const article = document.createElement("article");
  article.className = "product-card";

  const imageWrap = document.createElement("div");
  imageWrap.className = "product-image-wrap";
  const image = document.createElement("img");
  image.className = "product-image";
  image.src = product.thumbnail;
  image.alt = product.title;
  image.loading = "lazy";
  image.onerror = () => {
    image.hidden = true;
    imageWrap.textContent = "Image unavailable";
  };
  imageWrap.append(image);

  const info = document.createElement("div");
  info.className = "product-info";

  const category = document.createElement("p");
  category.className = "product-category";
  category.textContent = product.category || "Product";

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.title;

  const bottom = document.createElement("div");
  bottom.className = "product-bottom";

  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = `$${Number(product.price).toFixed(2)}`;

  const rating = document.createElement("span");
  rating.className = "product-rating";
  rating.textContent = `★ ${Number(product.rating || 0).toFixed(1)}`;

  bottom.append(price, rating);
  info.append(category, name, bottom);
  article.append(imageWrap, info);
  return article;
}

function renderProducts(items) {
  productGrid.replaceChildren();
  const fragment = document.createDocumentFragment();

  items.forEach((product) => fragment.append(createProductCard(product)));
  productGrid.append(fragment);

  emptyState.hidden = items.length !== 0;
  productCount.textContent = `${items.length} product${items.length === 1 ? "" : "s"} shown`;
}

async function loadProducts() {
  showLoading();
  retryButton.disabled = true;
  errorRetryButton.disabled = true;

  try {
    const response = await fetch(API_URL);

    // fetch() does not reject automatically for HTTP errors such as 404.
    if (!response.ok) {
      throw new Error(`The server returned HTTP ${response.status}.`);
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.products)) {
      throw new Error("The API response did not contain a valid products list.");
    }

    products = data.products;
    loadingState.hidden = true;
    errorState.hidden = true;
    filterProducts();
  } catch (error) {
    console.error("Unable to fetch products:", error);
    showError(error.message || "An unexpected error occurred. Please try again.");
  } finally {
    retryButton.disabled = false;
    errorRetryButton.disabled = false;
  }
}

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(query)
      || (product.category || "").toLowerCase().includes(query);
  });
  renderProducts(filteredProducts);
}

retryButton.addEventListener("click", loadProducts);
errorRetryButton.addEventListener("click", loadProducts);
searchInput.addEventListener("input", filterProducts);

// Form DOM and event handling
const resourceForm = document.querySelector("#resource-form");
const nameInput = document.querySelector("#full-name");
const emailInput = document.querySelector("#email");
const resourceInput = document.querySelector("#resource-type");
const detailsInput = document.querySelector("#details");
const charCount = document.querySelector("#char-count");
const formFeedback = document.querySelector("#form-feedback");

const errorFields = {
  name: document.querySelector("#name-error"),
  email: document.querySelector("#email-error"),
  resource: document.querySelector("#resource-error")
};

function setFieldError(input, errorElement, message) {
  errorElement.textContent = message;
  input.classList.toggle("invalid", Boolean(message));
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateForm() {
  let isValid = true;
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const resource = resourceInput.value;

  let nameError = "";
  let emailError = "";
  let resourceError = "";

  if (name.length < 2) {
    nameError = "Please enter at least 2 characters.";
  } else if (name.length > 60) {
    nameError = "Name must be 60 characters or fewer.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    emailError = "Email address is required.";
  } else if (!emailPattern.test(email)) {
    emailError = "Enter a valid email address.";
  }

  if (!resource) {
    resourceError = "Please choose a resource type.";
  }

  setFieldError(nameInput, errorFields.name, nameError);
  setFieldError(emailInput, errorFields.email, emailError);
  setFieldError(resourceInput, errorFields.resource, resourceError);

  isValid = !nameError && !emailError && !resourceError;
  return isValid;
}

function showFormFeedback(message, type) {
  formFeedback.textContent = message;
  formFeedback.className = `form-feedback ${type}`;
  formFeedback.hidden = false;
}

[nameInput, emailInput, resourceInput].forEach((input) => {
  input.addEventListener("input", () => {
    // Clear field-level errors as the user corrects their input.
    if (input === nameInput) setFieldError(input, errorFields.name, "");
    if (input === emailInput) setFieldError(input, errorFields.email, "");
    if (input === resourceInput) setFieldError(input, errorFields.resource, "");
    formFeedback.hidden = true;
  });
});

detailsInput.addEventListener("input", () => {
  charCount.textContent = detailsInput.value.length;
});

resourceForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    showFormFeedback("Please fix the highlighted fields and submit again.", "error");
    return;
  }

  const name = nameInput.value.trim();
  const resource = resourceInput.value;
  showFormFeedback(
    `Thanks, ${name}! Your request for "${resource}" has been recorded in this demo. No data was sent to a server.`,
    "success"
  );

  resourceForm.reset();
  charCount.textContent = "0";
  [nameInput, emailInput, resourceInput].forEach((input) => input.classList.remove("invalid"));
  Object.values(errorFields).forEach((element) => { element.textContent = ""; });
  [nameInput, emailInput, resourceInput].forEach((input) => input.removeAttribute("aria-invalid"));
});

// Load API data when the page starts.
loadProducts();
