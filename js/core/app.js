/* ═══════════════════════════════════════════
   FASTBIT — app.js (v2)
═══════════════════════════════════════════ */

const PRODUCTS = [
  /* ── BURGERS ── */
  {
    id: 1,
    name: "Classic Cheese Burger",
    price: 35000,
    category: "burger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
  },
  {
    id: 2,
    name: "Double Smash Burger",
    price: 52000,
    category: "burger",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80"
  },
  {
    id: 3,
    name: "Chicken Burger",
    price: 38000,
    category: "burger",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80"
  },
  {
    id: 4,
    name: "Spicy BBQ Burger",
    price: 45000,
    category: "burger",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80"
  },

  /* ── LAVASH ── */
  {
    id: 5,
    name: "Chicken Lavash",
    price: 28000,
    category: "lavash",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=80"
  },
  {
    id: 6,
    name: "Beef Lavash",
    price: 32000,
    category: "lavash",
    image: "https://images.unsplash.com/photo-1651452661510-18b1e0e33ad2?w=400&q=80"
  },
  {
    id: 7,
    name: "Veggie Lavash",
    price: 22000,
    category: "lavash",
    image: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=400&q=80"
  },
  {
    id: 8,
    name: "Mix Lavash",
    price: 36000,
    category: "lavash",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80"
  },

  /* ── DRINKS ── */
  {
    id: 9,
    name: "Pepsi 0.5L",
    price: 8000,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1629203851122-3d2c05ef2d83?w=400&q=80"
  },
  {
    id: 10,
    name: "Fresh Lemonade",
    price: 14000,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80"
  },
  {
    id: 11,
    name: "Orange Juice",
    price: 12000,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80"
  },
  {
    id: 12,
    name: "Iced Coffee",
    price: 16000,
    category: "drinks",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80"
  },

  /* ── SNACKS ── */
  {
    id: 13,
    name: "French Fries",
    price: 15000,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80"
  },
  {
    id: 14,
    name: "Onion Rings",
    price: 12000,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400&q=80"
  },
  {
    id: 15,
    name: "Chicken Wings",
    price: 28000,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80"
  },
  {
    id: 16,
    name: "Mozzarella Sticks",
    price: 18000,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&q=80"
  },
];

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
let activeCategory = "burger";
let cart = [];

/* ══════════════════════════════════════════
   DOM REFERENCES
══════════════════════════════════════════ */
const productsContainer = document.getElementById("productsGrid");
const cartBadge         = document.getElementById("cartBadge");
const cartCount         = document.getElementById("cartCount");
const cartTrigger       = document.getElementById("cartTrigger");
const cartClose         = document.getElementById("cartClose");
const cartSidebar       = document.getElementById("cartSidebar");
const cartItems         = document.getElementById("cartItems");
const cartEmpty         = document.getElementById("cartEmpty");
const cartFooter        = document.getElementById("cartFooter");
const cartTotal         = document.getElementById("cartTotal");
const btnOrder          = document.getElementById("btnOrder");
const overlay           = document.getElementById("overlay");
const toast             = document.getElementById("toast");
const sectionTitle      = document.getElementById("sectionTitle");
const sectionCount      = document.getElementById("sectionCount");
const bottomCartBtn     = document.getElementById("bottomCartBtn");

/* ══════════════════════════════════════════
   FORMAT PRICE
══════════════════════════════════════════ */
function formatPrice(amount) {
  return amount.toLocaleString("uz-UZ") + " so'm";
}

/* ══════════════════════════════════════════
   RENDER PRODUCTS
══════════════════════════════════════════ */
const CATEGORY_LABELS = {
  burger: "Burger",
  lavash: "Lavash",
  drinks: "Ichimlik",
  snacks: "Snack",
};

function renderProducts(category) {
  const filtered = PRODUCTS.filter(p => p.category === category);
  productsContainer.innerHTML = "";

  filtered.forEach((product, index) => {
    const inCart = cart.find(c => c.id === product.id);
    const qty    = inCart ? inCart.qty : 0;

    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.id = product.id;
    card.style.animationDelay = `${index * 60}ms`;

    card.innerHTML = `
      <div class="product-img-wrap">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="product-img"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80'"
        />
      </div>
      <div class="product-body">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-footer">
          <p class="product-price">${formatPrice(product.price)}</p>
          ${buildControl(product.id, qty)}
        </div>
      </div>
    `;

    productsContainer.appendChild(card);
  });

  if (sectionTitle) sectionTitle.textContent = CATEGORY_LABELS[category] || category;
  if (sectionCount) sectionCount.textContent = `— ${filtered.length} ta`;
}

function buildControl(productId, qty) {
  if (qty === 0) {
    return `<button class="add-btn" data-id="${productId}">
              <i class="fa-solid fa-plus"></i>
            </button>`;
  }
  return `<div class="qty-control">
            <button class="qty-btn" data-action="dec" data-id="${productId}">−</button>
            <span class="qty-num">${qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${productId}">+</button>
          </div>`;
}

/* ══════════════════════════════════════════
   CART LOGIC
══════════════════════════════════════════ */
function addToCart(productId) {
  const product  = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  onCartChange(productId);
}

function removeOne(productId) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;

  item.qty--;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== productId);

  onCartChange(productId);
}

function removeAll(productId) {
  cart = cart.filter(c => c.id !== productId);
  onCartChange(productId);
}

function onCartChange(productId) {
  updateCartBadge();
  refreshCardControl(productId);
  renderCartSidebar();
}

/* ── Badge ─────────────────────────────── */
function updateCartBadge() {
  const total = cart.reduce((sum, c) => sum + c.qty, 0);

  [cartBadge, cartCount].forEach(el => {
    if (!el) return;
    el.textContent = total;
    el.classList.toggle("visible", total > 0);
  });
}

/* ── Refresh only the changed card's control ── */
function refreshCardControl(productId) {
  const card = productsContainer.querySelector(`[data-id="${productId}"]`);
  if (!card) return;

  const footer = card.querySelector(".product-footer");
  if (!footer) return;

  const old = footer.querySelector(".add-btn, .qty-control");
  if (old) old.remove();

  const inCart = cart.find(c => c.id === productId);
  const qty    = inCart ? inCart.qty : 0;

  footer.insertAdjacentHTML("beforeend", buildControl(productId, qty));
}

/* ══════════════════════════════════════════
   CART SIDEBAR RENDER
══════════════════════════════════════════ */
function renderCartSidebar() {
  const empty = cart.length === 0;
  if (cartEmpty)  cartEmpty.style.display  = empty ? "flex"  : "none";
  if (cartFooter) cartFooter.style.display = empty ? "none"  : "flex";

  cartItems.querySelectorAll(".cart-item").forEach(el => el.remove());

  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-item";
    row.dataset.id = item.id;
    row.innerHTML = `
      <div class="cart-item__img">
        <img src="${item.image}" alt="${item.name}" />
      </div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__price">${formatPrice(item.price * item.qty)}</div>
      </div>
      <div class="cart-item__actions">
        <div class="qty-control">
          <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
        </div>
        <button class="cart-item__remove" data-id="${item.id}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;
    cartItems.appendChild(row);
  });

  if (cartTotal) {
    const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
    cartTotal.textContent = formatPrice(total);
  }
}

/* ══════════════════════════════════════════
   CART OPEN / CLOSE
══════════════════════════════════════════ */
function openCart() {
  if (cartSidebar) {
    cartSidebar.classList.add("open");
    cartSidebar.setAttribute("aria-hidden", "false");
  }
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  if (cartSidebar) {
    cartSidebar.classList.remove("open");
    cartSidebar.setAttribute("aria-hidden", "true");
  }
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

/* ══════════════════════════════════════════
   ORDER
══════════════════════════════════════════ */
function placeOrder() {
  if (cart.length === 0) return;

  /* 1. Build order object */
  const order = {
    id:         Date.now().toString(),
    table:      document.getElementById("tableNumber")?.textContent || "—",
    timestamp:  new Date().toISOString(),
    status:     "new",
    items:      cart.map(({ id, name, price, qty }) => ({
                  id, name, price, qty, total: price * qty
                })),
    grandTotal: cart.reduce((s, c) => s + c.price * c.qty, 0),
  };

  /* 2. Save to localStorage — append if exists, create if not */
  try {
    const existing = JSON.parse(localStorage.getItem("orders") || "[]");
    existing.push(order);
    localStorage.setItem("orders", JSON.stringify(existing));
  } catch (err) {
    console.error("localStorage write failed:", err);
  }

  /* 3. Log */
  console.log("✅ ORDER PLACED:", order);
  console.log("📦 All orders:", JSON.parse(localStorage.getItem("orders")));

  /* 4. Clear cart */
  cart = [];
  updateCartBadge();
  renderCartSidebar();
  renderProducts(activeCategory);
  closeCart();

  /* 5. Toast */
  if (toast) {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3200);
  }
}

/* ══════════════════════════════════════════
   EVENTS
══════════════════════════════════════════ */

/* Products — add + qty */
productsContainer.addEventListener("click", e => {
  const addBtn = e.target.closest(".add-btn");
  const qtyBtn = e.target.closest(".qty-btn");

  if (addBtn) addToCart(Number(addBtn.dataset.id));

  if (qtyBtn) {
    const id = Number(qtyBtn.dataset.id);
    qtyBtn.dataset.action === "inc" ? addToCart(id) : removeOne(id);
  }
});

/* Cart sidebar — qty + remove */
cartItems.addEventListener("click", e => {
  const qtyBtn    = e.target.closest(".qty-btn");
  const removeBtn = e.target.closest(".cart-item__remove");

  if (qtyBtn) {
    const id = Number(qtyBtn.dataset.id);
    qtyBtn.dataset.action === "inc" ? addToCart(id) : removeOne(id);
  }

  if (removeBtn) removeAll(Number(removeBtn.dataset.id));
});

/* Category tabs */
document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderProducts(activeCategory);
  });
});

/* Cart open / close */
cartTrigger?.addEventListener("click", openCart);
cartClose?.addEventListener("click", closeCart);
overlay?.addEventListener("click", closeCart);
bottomCartBtn?.addEventListener("click", e => { e.preventDefault(); openCart(); });
btnOrder?.addEventListener("click", placeOrder);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeCart();
});

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(activeCategory);
  renderCartSidebar();
  updateCartBadge();
});