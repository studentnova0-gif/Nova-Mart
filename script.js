"use strict";

/* =========================================================
   NOVA MART — COMPLETE JAVASCRIPT
   Search • Products • Cart • Wishlist
   Product Modal • Menus • Countdown • Notifications
   LocalStorage • Back To Top • Responsive Features
========================================================= */


/* =========================================================
   1. PRODUCT DATABASE
========================================================= */

const products = [
    {
        id: 1,
        title: "Apple iPhone 15 Pro Max 256GB",
        category: "mobile",
        price: 289999,
        oldPrice: 319999,
        discount: 9,
        rating: 4.8,
        reviews: 245,
        seller: "NOVA Official Store",
        delivery: "FREE delivery",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        title: "Samsung Galaxy S24 Ultra 5G",
        category: "mobile",
        price: 279999,
        oldPrice: 309999,
        discount: 10,
        rating: 4.7,
        reviews: 189,
        seller: "Samsung Store",
        delivery: "FREE delivery",
        image: "https://images.unsplash.com/photo-1707235926464-9e3f5f8f7c7b?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        title: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 5999,
        oldPrice: 8999,
        discount: 33,
        rating: 4.5,
        reviews: 421,
        seller: "NOVA Electronics",
        delivery: "FREE delivery",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        title: "Smart Watch Series 9",
        category: "electronics",
        price: 7999,
        oldPrice: 11999,
        discount: 33,
        rating: 4.4,
        reviews: 312,
        seller: "Tech World",
        delivery: "Delivery available",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        title: "Men's Premium Casual Jacket",
        category: "fashion",
        price: 4499,
        oldPrice: 6999,
        discount: 36,
        rating: 4.6,
        reviews: 156,
        seller: "Fashion Hub",
        delivery: "FREE delivery",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        title: "Women's Premium Handbag",
        category: "fashion",
        price: 3999,
        oldPrice: 5999,
        discount: 33,
        rating: 4.5,
        reviews: 204,
        seller: "Style Store",
        delivery: "FREE delivery",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        title: "Modern LED Table Lamp",
        category: "home",
        price: 2499,
        oldPrice: 3999,
        discount: 38,
        rating: 4.3,
        reviews: 97,
        seller: "Home Essentials",
        delivery: "Delivery available",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        title: "Modern Comfortable Sofa",
        category: "home",
        price: 45999,
        oldPrice: 59999,
        discount: 23,
        rating: 4.6,
        reviews: 68,
        seller: "Home Gallery",
        delivery: "Delivery available",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        title: "Premium Face Care Set",
        category: "beauty",
        price: 2999,
        oldPrice: 4999,
        discount: 40,
        rating: 4.7,
        reviews: 335,
        seller: "Beauty Shop",
        delivery: "FREE delivery",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        title: "Professional Makeup Kit",
        category: "beauty",
        price: 4999,
        oldPrice: 7499,
        discount: 33,
        rating: 4.5,
        reviews: 142,
        seller: "Beauty World",
        delivery: "FREE delivery",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        title: "Professional Football",
        category: "sports",
        price: 1999,
        oldPrice: 2999,
        discount: 33,
        rating: 4.4,
        reviews: 89,
        seller: "Sports Arena",
        delivery: "FREE delivery",
        image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        title: "Premium Running Shoes",
        category: "sports",
        price: 5999,
        oldPrice: 8999,
        discount: 33,
        rating: 4.6,
        reviews: 223,
        seller: "Sports Store",
        delivery: "FREE delivery",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    }
];


/* =========================================================
   2. CART & WISHLIST
========================================================= */

let cart = JSON.parse(localStorage.getItem("novaMartCart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("novaMartWishlist")) || [];


/* =========================================================
   3. DOM ELEMENTS
========================================================= */

const productsContainer =
    document.getElementById("productsContainer");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");

const searchInput =
    document.getElementById("searchInput");

const categorySelect =
    document.getElementById("category");


/* =========================================================
   4. FORMAT PRICE
========================================================= */

function formatPrice(price) {
    return "Rs. " + Number(price).toLocaleString("en-PK");
}


/* =========================================================
   5. RENDER PRODUCTS
========================================================= */

function renderProducts(list = products) {

    if (!productsContainer) return;

    if (list.length === 0) {

        productsContainer.innerHTML = `
            <div class="empty-state">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }

    productsContainer.innerHTML = list.map(product => {

        const isLiked = wishlist.includes(product.id);

        return `
            <article class="product-card">

                <div class="product-image-wrap">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                        loading="lazy"
                        onerror="this.src='https://via.placeholder.com/500x500?text=NOVA+MART'"
                    >

                    <span class="product-badge">
                        -${product.discount}%
                    </span>

                    <button
                        class="product-wishlist ${isLiked ? "active" : ""}"
                        onclick="toggleWishlist(${product.id})"
                        aria-label="Add to wishlist"
                    >
                        ${isLiked ? "♥" : "♡"}
                    </button>

                </div>

                <div class="product-info">

                    <h3
                        class="product-title"
                        onclick="openProductModal(${product.id})"
                    >
                        ${product.title}
                    </h3>

                    <div class="product-rating">

                        <span class="stars">
                            ${createStars(product.rating)}
                        </span>

                        <span class="review-count">
                            ${product.reviews}
                        </span>

                    </div>

                    <div class="product-price">
                        ${formatPrice(product.price)}
                    </div>

                    <div class="product-old-price">
                        ${formatPrice(product.oldPrice)}
                    </div>

                    <div class="discount">
                        ${product.discount}% OFF
                    </div>

                    <div class="delivery-text">
                        ${product.delivery}
                    </div>

                    <div class="product-seller">
                        Sold by ${product.seller}
                    </div>

                    <div class="product-actions">

                        <button
                            class="add-cart-btn"
                            onclick="addToCart(${product.id})"
                        >
                            Add to Cart
                        </button>

                        <button
                            class="buy-now-btn"
                            onclick="buyNow(${product.id})"
                        >
                            Buy Now
                        </button>

                    </div>

                </div>

            </article>
        `;

    }).join("");
}


/* =========================================================
   6. CREATE STAR RATING
========================================================= */

function createStars(rating) {

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= Math.round(rating)) {
            stars += "★";
        } else {
            stars += "☆";
        }

    }

    return stars;
}


/* =========================================================
   7. SEARCH PRODUCTS
========================================================= */

function searchProducts() {

    const query =
        searchInput?.value.trim().toLowerCase() || "";

    const selectedCategory =
        categorySelect?.value || "all";

    const filtered = products.filter(product => {

        const matchesSearch =
            product.title.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.seller.toLowerCase().includes(query);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);

    if (filtered.length > 0) {

        document
            .getElementById("productsSection")
            ?.scrollIntoView({
                behavior: "smooth"
            });

    }

    hideSearchSuggestions();
}


/* =========================================================
   8. SEARCH ENTER KEY
========================================================= */

if (searchInput) {

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            searchProducts();
        }

    });

    searchInput.addEventListener(
        "input",
        showSearchSuggestions
    );
}


/* =========================================================
   9. SEARCH SUGGESTIONS
========================================================= */

function showSearchSuggestions() {

    const suggestions =
        document.querySelector(".search-suggestions");

    if (!suggestions || !searchInput) return;

    const query =
        searchInput.value.trim().toLowerCase();

    if (!query) {

        suggestions.classList.remove("show");
        suggestions.innerHTML = "";

        return;
    }

    const matches = products
        .filter(product =>
            product.title.toLowerCase().includes(query)
        )
        .slice(0, 6);

    if (!matches.length) {

        suggestions.innerHTML = `
            <div class="suggestion-item">
                No products found
            </div>
        `;

    } else {

        suggestions.innerHTML = matches.map(product => `
            <div
                class="suggestion-item"
                onclick="selectSuggestion(${product.id})"
            >

                <img
                    src="${product.image}"
                    alt=""
                >

                <span>
                    ${product.title}
                </span>

            </div>
        `).join("");

    }

    suggestions.classList.add("show");
}


function selectSuggestion(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;

    if (searchInput) {
        searchInput.value = product.title;
    }

    hideSearchSuggestions();

    openProductModal(id);
}


function hideSearchSuggestions() {

    const suggestions =
        document.querySelector(".search-suggestions");

    if (suggestions) {
        suggestions.classList.remove("show");
    }
}


/* =========================================================
   10. CATEGORY FILTER
========================================================= */

function filterCategory(category) {

    if (categorySelect) {
        categorySelect.value = category;
    }

    const filtered =
        products.filter(product =>
            category === "all" ||
            product.category === category
        );

    renderProducts(filtered);

    document
        .getElementById("productsSection")
        ?.scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================================================
   11. CATEGORY SELECT CHANGE
========================================================= */

if (categorySelect) {

    categorySelect.addEventListener(
        "change",
        function () {

            const category = this.value;

            const filtered =
                products.filter(product =>
                    category === "all" ||
                    product.category === category
                );

            renderProducts(filtered);
        }
    );
}


/* =========================================================
   12. ADD TO CART
========================================================= */

function addToCart(productId) {

    const product =
        products.find(item => item.id === productId);

    if (!product) return;

    const existing =
        cart.find(item => item.id === productId);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: product.id,
            quantity: 1
        });

    }

    saveCart();

    updateCartUI();

    showNotification(
        `${product.title} added to cart`
    );
}


/* =========================================================
   13. BUY NOW
========================================================= */

function buyNow(productId) {

    const product =
        products.find(item => item.id === productId);

    if (!product) return;

    const existing =
        cart.find(item => item.id === productId);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }

    saveCart();

    updateCartUI();

    checkout();
}


/* =========================================================
   14. SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "novaMartCart",
        JSON.stringify(cart)
    );
}


/* =========================================================
   15. UPDATE CART
========================================================= */

function updateCartUI() {

    if (cartCount) {

        const totalItems =
            cart.reduce(
                (sum, item) =>
                    sum + item.quantity,
                0
            );

        cartCount.textContent = totalItems;
    }

    renderCart();
}


/* =========================================================
   16. RENDER CART
========================================================= */

function renderCart() {

    if (!cartItems) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div style="font-size:50px;">
                    🛒
                </div>

                <h3>Your cart is empty</h3>

                <p>
                    Add products to start shopping.
                </p>

            </div>
        `;

        if (cartTotal) {
            cartTotal.textContent = "Rs. 0";
        }

        return;
    }

    let total = 0;

    cartItems.innerHTML = cart.map(item => {

        const product =
            products.find(p => p.id === item.id);

        if (!product) return "";

        const itemTotal =
            product.price * item.quantity;

        total += itemTotal;

        return `
            <div class="cart-item">

                <img
                    src="${product.image}"
                    alt="${product.title}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${product.title}
                    </h4>

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                    <div class="cart-quantity">

                        <button
                            onclick="changeQuantity(${product.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${product.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                    <button
                        class="remove-cart"
                        onclick="removeFromCart(${product.id})"
                    >
                        Remove
                    </button>

                </div>

                <div class="cart-item-total">
                    ${formatPrice(itemTotal)}
                </div>

            </div>
        `;

    }).join("");

    if (cartTotal) {
        cartTotal.textContent = formatPrice(total);
    }
}


/* =========================================================
   17. CHANGE CART QUANTITY
========================================================= */

function changeQuantity(productId, amount) {

    const item =
        cart.find(product =>
            product.id === productId
        );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart =
            cart.filter(product =>
                product.id !== productId
            );
    }

    saveCart();

    updateCartUI();
}


/* =========================================================
   18. REMOVE FROM CART
========================================================= */

function removeFromCart(productId) {

    cart =
        cart.filter(item =>
            item.id !== productId
        );

    saveCart();

    updateCartUI();

    showNotification(
        "Product removed from cart"
    );
}


/* =========================================================
   19. OPEN CART
========================================================= */

function openCart() {

    const overlay =
        document.querySelector(".cart-overlay");

    const sidebar =
        document.querySelector(".cart-sidebar");

    if (overlay) {
        overlay.classList.add("active");
    }

    if (sidebar) {
        sidebar.classList.add("active");
    }

    document.body.classList.add("cart-open");

    updateCartUI();
}


/* =========================================================
   20. CLOSE CART
========================================================= */

function closeCart() {

    const overlay =
        document.querySelector(".cart-overlay");

    const sidebar =
        document.querySelector(".cart-sidebar");

    if (overlay) {
        overlay.classList.remove("active");
    }

    if (sidebar) {
        sidebar.classList.remove("active");
    }

    document.body.classList.remove("cart-open");
}


/* =========================================================
   21. CHECKOUT
========================================================= */

function checkout() {

    if (cart.length === 0) {

        showNotification(
            "Your cart is empty"
        );

        return;
    }

    const total =
        cart.reduce((sum, item) => {

            const product =
                products.find(
                    p => p.id === item.id
                );

            return sum +
                (
                    product
                        ? product.price * item.quantity
                        : 0
                );

        }, 0);

    localStorage.setItem(
        "novaMartCheckoutTotal",
        total
    );

    showNotification(
        "Proceeding to checkout..."
    );

    setTimeout(() => {

        window.location.href =
            "checkout.html";

    }, 700);
}


/* =========================================================
   22. WISHLIST
========================================================= */

function toggleWishlist(productId) {

    const index =
        wishlist.indexOf(productId);

    if (index === -1) {

        wishlist.push(productId);

        showNotification(
            "Added to wishlist ❤️"
        );

    } else {

        wishlist.splice(index, 1);

        showNotification(
            "Removed from wishlist"
        );
    }

    localStorage.setItem(
        "novaMartWishlist",
        JSON.stringify(wishlist)
    );

    renderProducts(
        getCurrentlyDisplayedProducts()
    );
}


/* =========================================================
   23. GET CURRENT PRODUCTS
========================================================= */

function getCurrentlyDisplayedProducts() {

    const query =
        searchInput?.value.trim().toLowerCase() || "";

    const category =
        categorySelect?.value || "all";

    return products.filter(product => {

        const searchMatch =
            !query ||
            product.title.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.seller.toLowerCase().includes(query);

        const categoryMatch =
            category === "all" ||
            product.category === category;

        return searchMatch && categoryMatch;
    });
}


/* =========================================================
   24. PRODUCT MODAL
========================================================= */

function openProductModal(productId) {

    const product =
        products.find(item =>
            item.id === productId
        );

    if (!product) return;

    let modal =
        document.querySelector(".product-modal");

    if (!modal) {

        modal =
            document.createElement("div");

        modal.className =
            "modal-overlay product-modal";

        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">

            <button
                class="modal-close"
                onclick="closeProductModal()"
            >
                ×
            </button>

            <div class="modal-product">

                <div class="modal-product-image">

                    <img
                        src="${product.image}"
                        alt="${product.title}"
                    >

                </div>

                <div class="modal-product-details">

                    <span class="product-badge">
                        -${product.discount}%
                    </span>

                    <h2>
                        ${product.title}
                    </h2>

                    <div class="product-rating">

                        <span class="stars">
                            ${createStars(product.rating)}
                        </span>

                        <span>
                            ${product.rating} / 5
                        </span>

                        <span>
                            (${product.reviews} reviews)
                        </span>

                    </div>

                    <h3 class="product-price">
                        ${formatPrice(product.price)}
                    </h3>

                    <p class="product-old-price">
                        ${formatPrice(product.oldPrice)}
                    </p>

                    <p>
                        <strong>Seller:</strong>
                        ${product.seller}
                    </p>

                    <p>
                        ${product.delivery}
                    </p>

                    <div class="modal-actions">

                        <button
                            class="add-cart-btn"
                            onclick="addToCart(${product.id}); closeProductModal();"
                        >
                            Add to Cart
                        </button>

                        <button
                            class="buy-now-btn"
                            onclick="buyNow(${product.id}); closeProductModal();"
                        >
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>

        </div>
    `;

    modal.classList.add("active");
}


function closeProductModal() {

    const modal =
        document.querySelector(".product-modal");

    if (modal) {
        modal.classList.remove("active");
    }
}


/* =========================================================
   25. MOBILE MENU
========================================================= */

function toggleMenu() {

    const navbar =
        document.querySelector(".navbar");

    if (!navbar) return;

    navbar.classList.toggle("active");
}


/* =========================================================
   26. MEGA MENU
========================================================= */

function toggleMegaMenu() {

    const menu =
        document.querySelector(".mega-menu");

    if (!menu) return;

    menu.classList.toggle("active");
}


/* =========================================================
   27. HERO SHOP BUTTON
========================================================= */

function scrollToProducts() {

    const section =
        document.getElementById(
            "productsSection"
        );

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================================================
   28. SORT PRODUCTS
========================================================= */

function sortProducts(type) {

    let sorted =
        [...getCurrentlyDisplayedProducts()];

    if (type === "low") {

        sorted.sort(
            (a, b) => a.price - b.price
        );

    } else if (type === "high") {

        sorted.sort(
            (a, b) => b.price - a.price
        );

    } else if (type === "rating") {

        sorted.sort(
            (a, b) => b.rating - a.rating
        );

    } else if (type === "discount") {

        sorted.sort(
            (a, b) => b.discount - a.discount
        );
    }

    renderProducts(sorted);
}


/* =========================================================
   29. FILTER BY PRICE
========================================================= */

function filterByPrice(maxPrice) {

    const filtered =
        getCurrentlyDisplayedProducts()
            .filter(product =>
                product.price <= maxPrice
            );

    renderProducts(filtered);
}


/* =========================================================
   30. LOAD MORE
========================================================= */

let visibleProducts = 8;

function loadMoreProducts() {

    visibleProducts += 4;

    renderProducts(
        products.slice(
            0,
            visibleProducts
        )
    );

    const button =
        document.querySelector(
            ".load-more-btn"
        );

    if (
        button &&
        visibleProducts >= products.length
    ) {

        button.style.display = "none";
    }
}


/* =========================================================
   31. ACCOUNT MENU
========================================================= */

function toggleAccountMenu() {

    const menu =
        document.querySelector(
            ".account-menu"
        );

    if (!menu) return;

    menu.classList.toggle("active");
}


/* =========================================================
   32. CLICK OUTSIDE ACCOUNT MENU
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const wrapper =
            document.querySelector(
                ".account-wrapper"
            );

        const menu =
            document.querySelector(
                ".account-menu"
            );

        if (
            wrapper &&
            menu &&
            !wrapper.contains(event.target)
        ) {

            menu.classList.remove("active");
        }
    }
);


/* =========================================================
   33. CLOSE SEARCH SUGGESTIONS
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const searchContainer =
            document.querySelector(
                ".search-container"
            );

        if (
            searchContainer &&
            !searchContainer.contains(
                event.target
            )
        ) {

            hideSearchSuggestions();
        }
    }
);


/* =========================================================
   34. CART OVERLAY CLICK
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            event.target.classList.contains(
                "cart-overlay"
            )
        ) {

            closeCart();
        }
    }
);


/* =========================================================
   35. ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeCart();
            closeProductModal();
            hideSearchSuggestions();
        }
    }
);


/* =========================================================
   36. FLASH SALE COUNTDOWN
========================================================= */

let countdownTime = 6 * 60 * 60;

function updateCountdown() {

    const countdown =
        document.querySelector(
            ".countdown"
        );

    if (!countdown) return;

    if (countdownTime <= 0) {

        countdown.innerHTML =
            "SALE ENDED";

        return;
    }

    const hours =
        Math.floor(
            countdownTime / 3600
        );

    const minutes =
        Math.floor(
            (countdownTime % 3600) / 60
        );

    const seconds =
        countdownTime % 60;

    countdown.innerHTML = `
        <span>
            ${String(hours).padStart(2, "0")}
        </span>
        :
        <span>
            ${String(minutes).padStart(2, "0")}
        </span>
        :
        <span>
            ${String(seconds).padStart(2, "0")}
        </span>
    `;

    countdownTime--;
}

setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   37. NOTIFICATION
========================================================= */

function showNotification(message) {

    let notification =
        document.querySelector(
            ".notification"
        );

    if (!notification) {

        notification =
            document.createElement("div");

        notification.className =
            "notification";

        document.body.appendChild(
            notification
        );
    }

    notification.textContent =
        message;

    notification.classList.add("show");

    clearTimeout(
        window.novaNotificationTimer
    );

    window.novaNotificationTimer =
        setTimeout(() => {

            notification.classList.remove(
                "show"
            );

        }, 2500);
}


/* =========================================================
   38. BACK TO TOP
========================================================= */

const backTop =
    document.querySelector(
        ".back-top"
    );

window.addEventListener(
    "scroll",
    function () {

        if (!backTop) return;

        if (window.scrollY > 500) {

            backTop.classList.add(
                "show"
            );

        } else {

            backTop.classList.remove(
                "show"
            );
        }
    }
);


if (backTop) {

    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
}


/* =========================================================
   39. NEWSLETTER
========================================================= */

function subscribeNewsletter(event) {

    if (event) {
        event.preventDefault();
    }

    const emailInput =
        document.querySelector(
            "#newsletterEmail"
        );

    if (!emailInput) {

        showNotification(
            "Newsletter subscription received"
        );

        return;
    }

    const email =
        emailInput.value.trim();

    if (!email) {

        showNotification(
            "Please enter your email"
        );

        return;
    }

    if (!email.includes("@")) {

        showNotification(
            "Please enter a valid email"
        );

        return;
    }

    localStorage.setItem(
        "novaMartNewsletter",
        email
    );

    emailInput.value = "";

    showNotification(
        "Subscribed successfully 🎉"
    );
}


/* =========================================================
   40. COUPON COPY
========================================================= */

function copyCoupon(code) {

    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard
            .writeText(code)
            .then(() => {

                showNotification(
                    `Coupon ${code} copied`
                );

            })
            .catch(() => {

                showNotification(
                    `Coupon: ${code}`
                );
            });

    } else {

        showNotification(
            `Coupon: ${code}`
        );
    }
}


/* =========================================================
   41. PRODUCT IMAGE ZOOM
========================================================= */

document.addEventListener(
    "click",
    function (event) {

        const image =
            event.target.closest(
                ".product-image-wrap img"
            );

        if (!image) return;

        const productCard =
            image.closest(
                ".product-card"
            );

        if (!productCard) return;

        const title =
            productCard.querySelector(
                ".product-title"
            );

        const product =
            products.find(item =>
                item.title ===
                title?.textContent.trim()
            );

        if (product) {
            openProductModal(
                product.id
            );
        }
    }
);


/* =========================================================
   42. MOBILE BOTTOM NAVIGATION
========================================================= */

function mobileHome() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function mobileProducts() {

    scrollToProducts();
}


function mobileCart() {

    openCart();
}


function mobileAccount() {

    const account =
        document.querySelector(
            ".account"
        );

    if (account) {
        account.click();
    }
}


/* =========================================================
   43. SAVE RECENT SEARCH
========================================================= */

function saveRecentSearch(query) {

    if (!query) return;

    let searches =
        JSON.parse(
            localStorage.getItem(
                "novaMartSearches"
            )
        ) || [];

    searches =
        searches.filter(
            item => item !== query
        );

    searches.unshift(query);

    searches =
        searches.slice(0, 10);

    localStorage.setItem(
        "novaMartSearches",
        JSON.stringify(searches)
    );
}


/* =========================================================
   44. IMPROVED SEARCH
========================================================= */

const originalSearchProducts =
    searchProducts;

searchProducts = function () {

    const query =
        searchInput?.value.trim() || "";

    if (query) {
        saveRecentSearch(query);
    }

    originalSearchProducts();
};


/* =========================================================
   45. INITIALIZE WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderProducts();

        updateCartUI();

        updateCountdown();

        console.log(
            "NOVA MART JavaScript loaded successfully."
        );
    }
);


/* =========================================================
   46. GLOBAL FUNCTIONS
   Makes inline HTML onclick work
========================================================= */

window.searchProducts =
    searchProducts;

window.toggleMenu =
    toggleMenu;

window.toggleMegaMenu =
    toggleMegaMenu;

window.scrollToProducts =
    scrollToProducts;

window.filterCategory =
    filterCategory;

window.openCart =
    openCart;

window.closeCart =
    closeCart;

window.checkout =
    checkout;

window.addToCart =
    addToCart;

window.buyNow =
    buyNow;

window.removeFromCart =
    removeFromCart;

window.changeQuantity =
    changeQuantity;

window.toggleWishlist =
    toggleWishlist;

window.openProductModal =
    openProductModal;

window.closeProductModal =
    closeProductModal;

window.sortProducts =
    sortProducts;

window.filterByPrice =
    filterByPrice;

window.loadMoreProducts =
    loadMoreProducts;

window.toggleAccountMenu =
    toggleAccountMenu;

window.copyCoupon =
    copyCoupon;

window.subscribeNewsletter =
    subscribeNewsletter;

window.mobileHome =
    mobileHome;

window.mobileProducts =
    mobileProducts;

window.mobileCart =
    mobileCart;

window.mobileAccount =
    mobileAccount;


/* =========================================================
   NOVA MART END
========================================================= */