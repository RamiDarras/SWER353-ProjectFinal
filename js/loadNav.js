$(document).ready(function () {
 // Inject Nav HTML, etc. (only do this once!)
 $("body").prepend(`
        <div class="hamburger">
          <i class="fas fa-bars"></i>
        </div>
      <nav>
        <div class="logo font2 l white lighter">Rami<span class="bold mainRed italic xl fume">fume</span></div>
        <div class="tabs">
          <!-- Desktop Nav -->
          <ul class="desktop-menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
          
          <!-- Mobile Nav -->
          <ul class="mobile-menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="about.html">About</a></li>
          </ul>
        </div>
        <div class="cart-wrapper">
        <div class="cart">
          <a href="cart.html">
            <i class="fa-solid fa-cart-shopping"></i>
            <span id="total-items">0</span>
          </a>
        </div></div>
      </nav>
    `);

 // Handle screen size on load
 function handleScreenSize() {
  if ($(window).width() > 768) {
   $(".desktop-menu").show();
   $(".mobile-menu").hide();
   $(".hamburger").hide();
  } else {
   $(".desktop-menu").hide();
   $(".mobile-menu").hide();
   $(".hamburger").show();
  }
 }
 handleScreenSize();

 // Re-check screen size on resize
 $(window).resize(function () {
  handleScreenSize();
 });

 // Only bind this once
 $(".hamburger").click(function () {
  $(this).toggleClass("active");
  $(".mobile-menu").stop(true, true).slideToggle(300);
 });
});
