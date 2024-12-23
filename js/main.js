$(document).ready(function () {
 perfumeImages = [
  "assets/images/perfume1.png",
  "assets/images/perfume2.png",
  "assets/images/perfume3.png",
  "assets/images/perfume4.png",
  "assets/images/perfume5.png",
  "assets/images/perfume6.png"
 ];
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
 const apiURL = "https://jsonplaceholder.typicode.com/posts"; // Placeholder API

 // Fetch and display random products as 'featured'
 function loadProducts() {
  $.ajax({
   url: apiURL,
   method: "GET",
   dataType: "json",
   success: function (data) {
    // Take 3 random posts as a sample
    const perfumes = data.slice(0, 3).map(() => {
     const randomItem =
      perfumesList[Math.floor(Math.random() * perfumesList.length)];
     return {
      id: Math.floor(Math.random() * 10000),
      name: randomItem.name,
      description: randomItem.description,
      price: (Math.random() * 100 + 50).toFixed(2),
      image: perfumeImages[Math.floor(Math.random() * perfumeImages.length)]
     };
    });
    displayProducts(perfumes);
   },
   error: function (err) {
    $("#products-grid").html(
     "<p>Failed to load products. Please try again later.</p>"
    );
    console.error(err);
   }
  });
 }

 function displayProducts(perfumes) {
  const container = $("#products-grid");
  container.empty();

  perfumes.forEach((perfume) => {
   const productHTML = `
       <div class="perfume-item" data-name="${perfume.name.toLowerCase()}">
         <img src="${perfume.image}" alt="${perfume.name}" />
         <div class="perfumeName bold">
           <h3 class="s light">${perfume.name}</h3>
         </div>
         <div class="details italic normal">
           <p>${perfume.description}</p>
         </div>
       </div>
     `;
   container.append(productHTML);
  });
 }

 // Clicking on a featured product
 $("#products-grid").on("click", ".perfume-item", function () {
  window.location.href = "products.html";
 });

 // "View Products" button
 $(".view-products").on("click", function () {
  window.location.href = "products.html";
 });

 loadProducts();
});
