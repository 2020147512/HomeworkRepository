fetch("product.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {
          let products = json;
          initialize(products);
        })
        .catch(function (err) {
          console.log("Fetch problem: " + err.message);
        });

function initialize(products) {
    const category = document.querySelector("#category");
    const searchTerm = document.querySelector("#searchTerm");
    const searchBtn = document.querySelector("#searchBtn");
    const main = document.querySelector("main");

    let lastCategory = category.value;
    let lastSearch = "";

    let categoryGroup;
    let finalGroup;

    finalGroup = products;
    updateDisplay();

    categoryGroup = [];
    finalGroup = [];
    searchBtn.onclick = selectCategory;

    function selectCategory(e) {
        e.preventDefault();
        categoryGroup = [];
        finalGroup = [];
        if (
            category.value === lastCategory &&
            searchTerm.value.trim() === lastSearch
          ) {
            return;
          } else {
            lastCategory = category.value;
            lastSearch = searchTerm.value.trim();
            if (category.value === "All") {
              categoryGroup = products;
              selectProducts();
            } else {
              let lowerCaseType = category.value.toLowerCase();
              for (let i = 0; i < products.length; i++) {
                if (products[i].type === lowerCaseType) {
                  categoryGroup.push(products[i]);
                }
              }
              selectProducts();
            }
          }
        }

        function selectProducts() {
          if (searchTerm.value.trim() === "") {
            finalGroup = categoryGroup;
            updateDisplay();
          } else {
            let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
            for (let i = 0; i < categoryGroup.length; i++) {
              if (categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
                finalGroup.push(categoryGroup[i]);
              }
            }
            updateDisplay();
          }
        }

        function updateDisplay() {
          while (main.firstChild) {
            main.removeChild(main.firstChild);
          }

          if (finalGroup.length === 0) {
            const para = document.createElement("p");
            para.textContent = "No results to display!";
            main.appendChild(para);

          } else {
            for (let i = 0; i < finalGroup.length; i++) {
              showProduct(finalGroup[i]);
            }
          }
        }

        

        function showProduct(product) {
          const section = document.createElement("section");
          const heading = document.createElement("button");
          const image = document.createElement("img");

          section.setAttribute("class", product.type);

          heading.textContent = "Click here"

          image.src = "images/" + product.image;
          image.alt = product.name;

          main.appendChild(section);
          heading.addEventListener('click', function(event) {
            const para = document.createElement('p');
            const name = document.createElement('h2');

            para.textContent = '$' + product.price;
            name.textContent = product.name;

            section.appendChild(para);
            section.appendChild(name);
          })
          section.appendChild(heading);
          section.appendChild(image);
        }
      }
    
 