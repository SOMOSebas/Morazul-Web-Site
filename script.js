
document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const cartModal = document.getElementById("cart-modal");
  const closeCart = document.getElementById("close-cart");
  const cartItemsList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const clearCart = document.getElementById("clear-cart");

  const sizeModal = document.getElementById("size-modal");
  const sizeSelect = document.getElementById("size-select");
  const confirmSize = document.getElementById("confirm-size");
  const cancelSize = document.getElementById("cancel-size");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let selectedProduct = null;

  cartIcon.addEventListener("click", () => {
    cartModal.style.display = "flex";
    renderCart();
  });

  closeCart.addEventListener("click", () => (cartModal.style.display = "none"));
  window.addEventListener("click", e => {
    if (e.target === cartModal) cartModal.style.display = "none";
    if (e.target === sizeModal) sizeModal.style.display = "none";
  });

  clearCart.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });

  function renderCart() {
    cartItemsList.innerHTML = "";
    let total = 0;
    cart.forEach((item, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} (Talla: ${item.size}) - $${item.price}
        <button onclick="removeItem(${i})">X</button>`;
      cartItemsList.appendChild(li);
      total += item.price;
    });
    cartTotal.textContent = `Total: $${total}`;
  }

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  window.removeItem = i => {
    cart.splice(i, 1);
    saveCart();
    renderCart();
  };

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", e => {
      const product = e.target.closest(".product");
      selectedProduct = {
        name: product.querySelector("h3").textContent,
        price: parseFloat(product.querySelector(".price").textContent.replace("$", "")),
      };
      sizeSelect.value = "";
      sizeModal.style.display = "flex";
    });
  });

  confirmSize.addEventListener("click", () => {
    const size = sizeSelect.value;
    if (!size) return alert("Selecciona una talla");
    cart.push({ ...selectedProduct, size });
    saveCart();
    sizeModal.style.display = "none";
    alert("Producto agregado al carrito");
  });

  cancelSize.addEventListener("click", () => {
    sizeModal.style.display = "none";
  });

  renderCart();
});
