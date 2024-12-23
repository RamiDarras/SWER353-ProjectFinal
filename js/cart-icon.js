$(document).ready(function() {
    // Flag to prevent animation on initial load if needed
    let isInitialLoad = true;
  
    // Initial cart load
    cartReload();
  
    // Event listener for "addToCart" event
    $(document).on("addToCart", function() {
      cartReload();
      animateCart();
    });
  
    function cartReload() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      $("#total-items").text(cart.length ? cart.length : "0");
    }
  
    function animateCart() {
      // Select the <i> element inside .cart
      const cartIcon = $(".cart i");
  
      // Add the animation class
      cartIcon.addClass("animate-cart");
  
      // Remove the class after 0.5 seconds
      setTimeout(function() {
        cartIcon.removeClass("animate-cart");
      }, 500);
    }
  });
  