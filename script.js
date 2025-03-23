'use strict';

// ---------------------
// MOBILE MENU
// ---------------------
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {
  const mobileMenuCloseFunc = function () {
    mobileMenu[i].classList.remove('active');
    overlay.classList.remove('active');
  };

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    mobileMenu[i].classList.add('active');
    overlay.classList.add('active');
  });

  mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  overlay.addEventListener('click', mobileMenuCloseFunc);
}

// ---------------------
// ACCORDION
// ---------------------
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {
  accordionBtn[i].addEventListener('click', function () {
    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let j = 0; j < accordion.length; j++) {
      if (clickedBtn) break;

      if (accordion[j].classList.contains('active')) {
        accordion[j].classList.remove('active');
        accordionBtn[j].classList.remove('active');
      }
    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');
  });
}

// ---------------------
// FILTERS & SEARCH
// ---------------------
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ JS Loaded & DOM Ready");

  const genderFilter = document.getElementById("availabilityFilter");
  const brandFilter = document.getElementById("brandFilter");
  const searchInput = document.getElementById("searchInput");

  if (genderFilter && brandFilter && searchInput) {
    genderFilter.addEventListener("change", filterProducts);
    brandFilter.addEventListener("change", filterProducts);
    searchInput.addEventListener("keyup", filterProducts);
  }

  filterProducts(); // initial run to show all
});

function filterProducts() {
  const selectedGender = document.getElementById("availabilityFilter").value;
  const selectedBrand = document.getElementById("brandFilter").value;
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product");

  console.log(`🔍 Filtering - Gender: ${selectedGender}, Brand: ${selectedBrand}, Search: ${searchTerm}`);

  products.forEach(product => {
    const productGender = product.getAttribute("data-gender");
    const productBrand = product.getAttribute("data-brand");
    const productTitle = product.querySelector(".product-title").textContent.toLowerCase();

    const genderMatch = selectedGender === "all" || productGender === selectedGender;
    const brandMatch = selectedBrand === "all" || productBrand === selectedBrand;
    const searchMatch = productTitle.includes(searchTerm);

    if (genderMatch && brandMatch && searchMatch) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}

// ---------------------
// CART
// ---------------------

// ----------------------
// MINI CART HOVER LOGIC
// ----------------------
const cartIcon = document.getElementById("cartIcon");
const miniCart = document.getElementById("miniCart");

cartIcon.addEventListener("mouseenter", () => {
  miniCart.style.display = "block";
});

miniCart.addEventListener("mouseleave", () => {
  miniCart.style.display = "none";
});

cartIcon.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!miniCart.matches(":hover")) {
      miniCart.style.display = "none";
    }
  }, 300);
});

// -----------------------------
// CART FUNCTIONALITY + STORAGE
// -----------------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Wait for DOM content
document.addEventListener("DOMContentLoaded", () => {
  // Setup Add to Cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productEl = btn.closest(".product");
      const title = productEl.querySelector(".product-title").textContent.trim();
      const price = productEl.querySelector(".product-price").textContent.trim();
      const imgSrc = productEl.querySelector("img").src;

      const existing = cart.find((item) => item.title === title);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ title, price, imgSrc, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateMiniCart();
    });
  });

  updateMiniCart(); // Initial load
});

// ------------------------
// UPDATE MINI CART UI
// ------------------------
function updateMiniCart() {
  const cartItemsContainer = document.getElementById("miniCartItems");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartCount = document.querySelector(".count");

  cartItemsContainer.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("mini-cart-item");
    itemEl.innerHTML = `
      <div class="mini-cart-product">
        <img src="${item.imgSrc}" alt="${item.title}" class="mini-cart-img">
        <div class="mini-cart-info">
          <p>${item.title}</p>
          <p>${item.price}</p>
          <p>Qty: ${item.quantity}</p>
        </div>
        <button class="remove-btn" data-index="${index}">&times;</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);

    const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ""));
    total += priceValue * item.quantity;
    count += item.quantity;
  });

  cartSubtotal.textContent = total.toFixed(2);
  if (cartCount) cartCount.textContent = count;

  // ✅ Add remove button event listeners here
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateMiniCart();
    });
  });
}

// procced to checkout button 
document.querySelector(".view-cart-btn").addEventListener("click", () => {
  window.location.href = "/mybag.html"; // or wherever your full cart page is
});

document.querySelector(".checkout-btn").addEventListener("click", () => {
  window.location.href = "/mybag.html"; // create this page or adjust the path
});


// USER DROPDOWN LOGIC
const userIcon = document.querySelector(".header-user-actions button:nth-child(1)");
const userDropdown = document.getElementById("userDropdown");

userIcon.addEventListener("mouseenter", () => {
  userDropdown.style.display = "block";
});

userDropdown.addEventListener("mouseleave", () => {
  userDropdown.style.display = "none";
});

userIcon.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!userDropdown.matches(":hover")) {
      userDropdown.style.display = "none";
    }
  }, 300);
});


// Make mobile nav buttons behave like desktop

document.getElementById("mobileHomeBtn").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("mobileSearchBtn").addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.scrollIntoView({ behavior: "smooth" });
    searchInput.focus();
  }
});

document.getElementById("mobileUserBtn").addEventListener("mouseenter", () => {
  document.getElementById("userDropdown").style.display = "block";
});

document.getElementById("mobileUserBtn").addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!document.getElementById("userDropdown").matches(":hover")) {
      document.getElementById("userDropdown").style.display = "none";
    }
  }, 300);
});

document.getElementById("mobileCartBtn").addEventListener("mouseenter", () => {
  document.getElementById("miniCart").style.display = "block";
});

document.getElementById("mobileCartBtn").addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!document.getElementById("miniCart").matches(":hover")) {
      document.getElementById("miniCart").style.display = "none";
    }
  }, 300);
});
