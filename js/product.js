$(document).ready(function () {
 // Define perfume images
 perfumeImages = [
  "assets/images/perfume1.png",
  "assets/images/perfume2.png",
  "assets/images/perfume3.png",
  "assets/images/perfume4.png",
  "assets/images/perfume5.png",
  "assets/images/perfume6.png"
 ];

 // Define perfumes list with unique IDs for better cart management
 const perfumesList = [
  {
   name: "Ethereal Bloom",
   description:
    "A delicate fusion of fresh florals and a hint of citrus, perfect for a light and breezy aura."
  },
  {
   name: "Velvet Noir",
   description:
    "A bold and captivating scent with deep notes of black currant and patchouli."
  },
  {
   name: "Celestial Essence",
   description:
    "An enchanting blend of white musk and amber, evoking a sense of cosmic serenity."
  },
  {
   name: "Mystic Petals",
   description:
    "Soft, powdery florals combined with subtle hints of vanilla and sandalwood."
  },
  {
   name: "Golden Horizon",
   description:
    "Warm and radiant, featuring golden amber and sweet honey undertones."
  },
  {
   name: "Amber Whisper",
   description:
    "A sensual and inviting fragrance with notes of amber and a touch of spice."
  },
  {
   name: "Lunar Bliss",
   description:
    "A dreamy blend of jasmine and lavender with a cool, airy undertone."
  },
  {
   name: "Crimson Allure",
   description:
    "A passionate mix of red berries and velvety rose petals with a warm finish."
  },
  {
   name: "Serenade Mist",
   description:
    "Light and refreshing with hints of green tea and citrus blossoms."
  },
  {
   name: "Sapphire Drift",
   description:
    "Oceanic notes mingled with sea salt and aquatic florals for a fresh escape."
  },
  {
   name: "Jasmine Eclipse",
   description:
    "A bold jasmine core balanced with earthy vetiver and a dash of spice."
  },
  {
   name: "Aurora Desire",
   description:
    "Bright and sweet, with fruity notes of pear and a heart of peony."
  },
  {
   name: "Obsidian Dream",
   description:
    "A dark, mysterious scent with smoky oud and a touch of black pepper."
  },
  {
   name: "Pearl Reverie",
   description:
    "Soft and elegant, blending white lily and creamy vanilla for a timeless feel."
  },
  {
   name: "Rosewood Charm",
   description:
    "Earthy and floral, combining the richness of rosewood with geranium petals."
  },
  {
   name: "Infinite Grace",
   description:
    "A graceful floral bouquet of tuberose and gardenia with a light citrus twist."
  },
  {
   name: "Midnight Cascade",
   description: "A seductive and rich blend of plum, dark cherry, and musk."
  },
  {
   name: "Silken Echo",
   description:
    "Smooth and velvety with soft cashmere wood and a hint of orchid."
  },
  {
   name: "Ivory Ember",
   description: "Warm and comforting with creamy sandalwood and smoky vanilla."
  },
  {
   name: "Sunlit Serenade",
   description:
    "Bright and uplifting, featuring zesty orange blossom and golden neroli."
  }
 ];
 const apiURL = "https://jsonplaceholder.typicode.com/posts"; // Placeholder
 let loadedPerfumes = [];

 // Load products via AJAX
 function loadProducts() {
  $.ajax({
   url: apiURL,
   method: "GET",
   dataType: "json",
   success: function (data) {
    // Map placeholder posts to our perfumesList
    const perfumes = data.slice(0, perfumesList.length).map((item, index) => ({
     id: index + 1,
     name: perfumesList[index].name,
     description: perfumesList[index].description,
     price: (Math.random() * 100 + 50).toFixed(2),
     image: perfumeImages[Math.floor(Math.random() * perfumeImages.length)],
     quantity: 1
    }));
    displayProducts(perfumes);
   },
   error: function (err) {
    $("#products-container").html(
     "<p>Failed to load products. Please try again later.</p>"
    );
    console.error(err);
   }
  });
 }

 // Display products in the container
 function displayProducts(perfumes) {
  const container = $("#products-container");
  container.empty();

  perfumes.forEach((perfume) => {
   const productHTML = `
       <div
         class="perfume-item"
         data-name="${perfume.name.toLowerCase()}"
         data-id="${perfume.id}"
         data-pic="${perfume.image}"
         data-price="${perfume.price}"
       >
         <img src="${perfume.image}" alt="${perfume.name}" loading="lazy" />
         <div class="perfumeName bold">
           <h3 class="s bold">${perfume.name}</h3>
         </div>
         <div class="details italic normal">
           <p>${perfume.description}</p>
           <div class="bottom">
             <p class="mainRed font2 l">$${perfume.price}</p>
             <div class="add" data-pic="${perfume.image}" data-name="${
    perfume.name
   }" data-price="${perfume.price}">
               
             </div>
           </div>
         </div>
       </div>
     `;
   container.append(productHTML);
  });
  {
   /* <i class="fa-solid fa-plus"></i> */
  }
  // After products are displayed, bind click events
  bindOverlayEvents();
 }

 // Search functionality
 $(".search-bar").on("keyup", function () {
  const query = $(this).val().toLowerCase();
  $(".perfume-item").filter(function () {
   const name = $(this).attr("data-name").toLowerCase();
   const description = $(this).find(".details p").text().toLowerCase();
   $(this).toggle(name.includes(query) || description.includes(query));
  });
 });

 // Add or update item in cart
 function addToCart(perfumeDetails) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItemIndex = cart.findIndex(
   (item) => item.name === perfumeDetails.name
  );

  if (existingItemIndex !== -1) {
   cart[existingItemIndex].quantity += 1;
  } else {
   cart.push(perfumeDetails);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  toastr.success("Perfume added to cart!");
  $(document).trigger("addToCart");
 }

 // Update cart count in UI
 function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  $("#cart-count").text(totalItems);
 }

 // Event: add to cart button
 $(document).on("click", ".add", function (event) {
  event.stopPropagation(); // Prevent triggering parent click events
  const perfumePic = $(this).data("pic");
  const perfumeName = $(this).data("name");
  const perfumePrice = parseFloat($(this).data("price"));

  const perfumeDetails = {
   image: perfumePic,
   name: perfumeName,
   price: perfumePrice,
   quantity: 1
  };
  addToCart(perfumeDetails);
 });

 // Optional: redirect to cart if .cart-icon is clicked
 $(".cart-icon").on("click", function () {
  window.location.href = "cart.html";
 });

 // Initialize cart count and load products
 updateCartCount();
 loadProducts();

 // Function to bind overlay events after products are loaded
 function bindOverlayEvents() {
  // Select overlay elements
  const overlay = $("#perfume-overlay");
  const overlayImage = $("#overlay-image");
  const overlayName = $("#overlay-name");
  const overlayDescription = $("#overlay-description");
  const overlayPrice = $("#overlay-price");
  const overlayAdd = $("#overlay-add");
  const closeButton = $(".close-button");

  // Function to show overlay
  function showOverlay(perfume) {
   const imgSrc = perfume.find("img").attr("src");
   const imgAlt = perfume.find("img").attr("alt");
   const name = perfume.find(".s").text();
   const description = perfume.find(".details p").text();
   const price = perfume.find(".mainRed").text();
   const dataPic = perfume.attr("data-pic");
   const dataName = perfume.attr("data-name");
   const dataPrice = perfume.attr("data-price");

   overlayImage.attr("src", imgSrc);
   overlayImage.attr("alt", imgAlt);
   overlayName.text(name);
   overlayDescription.text(description);
   overlayPrice.text(price);

   // Update data attributes for the add button in the overlay
   overlayAdd.attr("data-pic", dataPic);
   overlayAdd.attr("data-name", dataName);
   overlayAdd.attr("data-price", dataPrice);

   // Show the overlay
   overlay.removeClass("hidden").addClass("visible");

   // Disable body scrolling
   $("body").css("overflow", "hidden");
  }

  // Function to hide overlay
  function hideOverlay() {
   overlay.removeClass("visible").addClass("hidden");
   // Re-enable body scrolling
   $("body").css("overflow", "auto");
  }

  // Bind click event to perfume items to show overlay
  $(".perfume-item").on("click", function () {
   showOverlay($(this));
  });

  // Bind click event to close button
  closeButton.on("click", function () {
   hideOverlay();
  });

  // Also allow closing the overlay by clicking outside the content
  overlay.on("click", function (e) {
   if ($(e.target).is("#perfume-overlay")) {
    hideOverlay();
   }
  });

  // Bind click event to add button in the overlay
  overlayAdd.on("click", function (event) {
   event.stopPropagation(); // Prevent overlay click event
   const perfumePic = $(this).data("pic");
   const perfumeName = $(this).data("name");
   const perfumePrice = parseFloat($(this).data("price"));

   const perfumeDetails = {
    image: perfumePic,
    name: perfumeName,
    price: perfumePrice,
    quantity: 1
   };
   addToCart(perfumeDetails);
  });
 }
});
