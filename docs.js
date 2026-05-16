 const products = [
      {
        id: 1,
        name: "Classic Denim Jacket",
        category: "Fashion",
        price: 1499,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 2499,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 3,
        name: "Minimal Backpack",
        category: "Accessories",
        price: 999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 4,
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 3999,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 5,
        name: "Running Sneakers",
        category: "Fashion",
        price: 1999,
        rating: 4.4,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80"
      },
      {
        id: 6,
        name: "Desk Lamp",
        category: "Home",
        price: 799,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80"
      }
    ];

    let cart = [];
    let selectedCategory = "All";

    function displayProducts(productList) {
      const productGrid = document.getElementById("productGrid");
      productGrid.innerHTML = "";

      if (productList.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
      }

      productList.forEach(product => {
        productGrid.innerHTML += `
          <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
              <div class="price-row">
                <span class="tag">${product.category}</span>
                <span class="rating">⭐ ${product.rating}</span>
              </div>
              <h3>${product.name}</h3>
              <div class="price-row">
                <span class="price">₹${product.price}</span>
              </div>
              <button class="btn add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
          </div>
        `;
      });
    }

    function filterCategory(category, button) {
      selectedCategory = category;

      const buttons = document.querySelectorAll(".category-buttons button");
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      filterProducts();
    }

    function filterProducts() {
      const searchValue = document.getElementById("searchInput").value.toLowerCase();

      const filtered = products.filter(product => {
        const matchCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchSearch = product.name.toLowerCase().includes(searchValue);
        return matchCategory && matchSearch;
      });

      displayProducts(filtered);
    }

    function addToCart(productId) {
      const product = products.find(item => item.id === productId);
      const existingProduct = cart.find(item => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      updateCart();
    }

    function updateCart() {
      const cartCount = document.getElementById("cartCount");
      const cartItems = document.getElementById("cartItems");
      const cartTotal = document.getElementById("cartTotal");
      const cartTotalBox = document.getElementById("cartTotalBox");

      let totalItems = 0;
      let totalPrice = 0;

      cartItems.innerHTML = "";

      if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
        cartTotalBox.style.display = "none";
      } else {
        cart.forEach(item => {
          totalItems += item.quantity;
          totalPrice += item.price * item.quantity;

          cartItems.innerHTML += `
            <div class="cart-item">
              <img src="${item.image}" alt="${item.name}">
              <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
                <div class="quantity-controls">
                  <button onclick="changeQuantity(${item.id}, -1)">-</button>
                  <span>${item.quantity}</span>
                  <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
              </div>
            </div>
          `;
        });

        cartTotalBox.style.display = "block";
      }

      cartCount.textContent = totalItems;
      cartTotal.textContent = `₹${totalPrice}`;
    }

    function changeQuantity(productId, change) {
      const item = cart.find(product => product.id === productId);
      if (!item) return;

      item.quantity += change;

      if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== productId);
      }

      updateCart();
    }

    function removeFromCart(productId) {
      cart = cart.filter(product => product.id !== productId);
      updateCart();
    }

    function openCart() {
      document.getElementById("cartSidebar").classList.add("open");
      document.getElementById("overlay").classList.add("show");
    }

    function closeCart() {
      document.getElementById("cartSidebar").classList.remove("open");
      document.getElementById("overlay").classList.remove("show");
    }

    function checkout() {
      if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      alert("Checkout successful! Thank you for shopping.");
      cart = [];
      updateCart();
      closeCart();
    }

    function subscribeUser(event) {
      event.preventDefault();
      alert("Thank you for subscribing!");
      event.target.reset();
    }

    displayProducts(products);
    updateCart();
