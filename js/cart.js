$(document).ready(function () {
 let cart = JSON.parse(localStorage.getItem("cart")) || [];
 let removeIndex = null; // To keep track of which item to remove

 // Display cart items on page load
 displayCart();

 // Listen for cart updates from other parts of the app
 $(document).on("addToCart", function () {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();
  displayCart();
 });

 // ========== FUNCTIONS ==========

 // Display cart items
 function displayCart() {
  const container = $("#cart-container");
  container.empty();

  let total = 0;

  if (cart.length === 0) {
   container.html("<p>Your cart is empty.</p>");
   $("#cart-total").text("0.00");
   return;
  }

  cart.forEach((perfume, index) => {
   const imageSrc = perfume.image ? perfume.image : "placeholder.jpg";
   const productHTML = `
        <div class="cart-item" data-index="${index}">
          <img
            src="${imageSrc}"
            alt="${perfume.name}"
            onerror="this.src='placeholder.jpg';"
          />
          <div class="cart-item-details">
            <div class="name-price">
              <h3>${perfume.name}</h3>
              <h3>$${Number(perfume.price).toFixed(2)}</h3>
            </div>
            <div class="br"></div>
            <div class="quantity-controls">
              <p>Quantity</p>
              <button
                class="decrease-quantity"
                data-index="${index}"
                aria-label="Decrease quantity"
              >
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="quantity">${perfume.quantity}</span>
              <button
                class="increase-quantity"
                data-index="${index}"
                aria-label="Increase quantity"
              >
                <i class="fa-solid fa-plus"></i>
              </button>
              <button
                class="remove-from-cart"
                data-index="${index}"
                aria-label="Remove from cart"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      `;
   container.append(productHTML);

   total += Number(perfume.price) * Number(perfume.quantity);
  });

  $("#cart-total").text(total.toFixed(2));
 }

 // Update quantity
 function updateQuantity(index, delta) {
  if (index < 0 || index >= cart.length) return;
  cart[index].quantity += delta;

  if (cart[index].quantity <= 0) {
   openConfirmModal(index);
  } else {
   localStorage.setItem("cart", JSON.stringify(cart));
   displayCart();
   updateCartCount();
   toastr.info(`Quantity updated for ${cart[index].name}.`);
  }
 }

 // Remove item from cart
 function removeFromCart(index) {
  const removedItem = cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  displayCart();
  toastr.warning(`${removedItem[0].name} removed from cart.`);
 }

 // Confirmation modal open
 function openConfirmModal(index) {
  removeIndex = index;
  const perfumeName = cart[index].name;
  $("#confirm-message").text(
   `Are you sure you want to remove "${perfumeName}" from your cart?`
  );
  $("#confirm-modal").addClass("active");
  $("#main-content").addClass("blur");
  $("#confirm-remove").focus();
 }

 // Confirmation modal close
 function closeConfirmModal() {
  removeIndex = null;
  $("#confirm-modal").removeClass("active");
  $("#main-content").removeClass("blur");
 }

 // Update cart count in UI
 function updateCartCount() {
  const totalQuantity = cart.reduce(
   (acc, item) => acc + Number(item.quantity),
   0
  );
  $("#cart-count").text(totalQuantity);
 }

 // ========== EVENT LISTENERS ==========

 // Increase quantity
 $(document).on("click", ".increase-quantity", function () {
  const index = $(this).data("index");
  updateQuantity(index, 1);
 });

 // Decrease quantity
 $(document).on("click", ".decrease-quantity", function () {
  const index = $(this).data("index");
  updateQuantity(index, -1);
 });

 // Remove from cart
 $(document).on("click", ".remove-from-cart", function () {
  const index = $(this).data("index");
  openConfirmModal(index);
 });

 // Confirm removal
 $("#confirm-remove").on("click", function () {
  if (removeIndex !== null) {
   removeFromCart(removeIndex);
   closeConfirmModal();
  }
 });

 // Cancel removal or close modal
 $("#cancel-remove, .close-button").on("click", function () {
  closeConfirmModal();
 });

 // Close modal on outside click
 $(window).on("click", function (event) {
  if ($(event.target).is("#confirm-modal")) {
   closeConfirmModal();
  }
 });

 // Trap focus in modal
 $("#confirm-modal").on("keydown", function (e) {
  if (e.key === "Tab") {
   const focusable = $("#confirm-modal")
    .find("button, .close-button")
    .filter(":visible");
   const firstFocusable = focusable.first();
   const lastFocusable = focusable.last();

   if (e.shiftKey) {
    // Shift + Tab
    if ($(document.activeElement).is(firstFocusable)) {
     e.preventDefault();
     lastFocusable.focus();
    }
   } else {
    // Tab
    if ($(document.activeElement).is(lastFocusable)) {
     e.preventDefault();
     firstFocusable.focus();
    }
   }
  }
  if (e.key === "Escape") {
   closeConfirmModal();
  }
 });

 // Checkout button
 $("#checkout-button").on("click", function () {
  if (cart.length === 0) {
   toastr.error("Your cart is empty.");
   return;
  }

  // Show confirmation for checkout
  Swal.fire({
   title: "Proceed to Checkout?",
   text: "Are you sure you want to proceed with your purchase?",
   icon: "question",
   showCancelButton: true,
   confirmButtonColor: "var(--mainRed)",
   cancelButtonColor: "#6c757d",
   confirmButtonText: "Yes, Checkout"
  }).then((result) => {
   if (result.isConfirmed) {
    // Show the tick animation modal
    Swal.fire({
     title: "Processing your purchase...",
     html:
      '<div class="tick-animation"><i class="fa-solid fa-check-circle"></i></div>',
     showConfirmButton: false,
     allowOutsideClick: false,
     didOpen: () => {
      // Optionally do something when open
     }
    });

    // Simulate processing time
    setTimeout(() => {
     // Close the animation modal
     Swal.close();

     // Show success message
     Swal.fire({
      title: "Thank you for your purchase!",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
     });

     // Clear cart
     cart = [];
     localStorage.setItem("cart", JSON.stringify(cart));
     updateCartCount();
     displayCart();
     $("#total-items").text(0);
    }, 1000);
   }
  });
 });

 // Initialize cart count on load
 updateCartCount();
});
