var Filter = {
    Apis: {
        categories: "https://dummyjson.com/products/categories",
        products: "https://dummyjson.com/products",
        getProductsOfCategory: "https://dummyjson.com/products/category/"
    },
    Elements: {
        categorySelect: document.getElementById("category-select"),
        productList: document.getElementById("product-list"),
        cardTemp: document.getElementById("card-temp"),
        clearButton: document.getElementById("clear-button"),
    },
    Status: {
        categories: [],
        products: [],
    },
    Actions: {
        //Sayfa ilk açıldığında istenilen fonksiyonları çalıştıracak
        init: () => {
            Filter.Actions.getAllCategories(); //  get all categories
            Filter.Actions.getProducts(Filter.Apis.products); //  get all products
        },

        //kategori selecti değiştiğinde çalışacak fonksiyon
        handleCategoryChange: (sender) => {
            let apiUrl = "";

            if (sender.value) {
                apiUrl = Filter.Apis.getProductsOfCategory + sender.value;
                Filter.Elements.clearButton.classList.add("show");
            }
            else {
                apiUrl = Filter.Apis.products;
                Filter.Elements.clearButton.classList.remove("show");
            }

            Filter.Actions.getProducts(apiUrl);

        },

        //api'den tüm kategori listesini getiriyor
        getAllCategories: () => {
            fetch(Filter.Apis.categories)
                .then(res => res.json())
                .then(res => {
                    Filter.Status.categories = res;
                    Filter.Actions.appendCategoriesToHtml();
                });
        },

        //kategori listesini html'e ekliyor
        appendCategoriesToHtml: () => {
            for (let i = 0; i < Filter.Status.categories.length; i++) {
                const ctg = Filter.Status.categories[i];

                const option = document.createElement("option");
                option.setAttribute("value", ctg);

                var text = ctg.replaceAll("-", " ");
                var firstChar = text.charAt(0).toLocaleUpperCase();
                text = firstChar + text.substring(1);
                option.innerText = text;
                Filter.Elements.categorySelect.appendChild(option);
            }
        },

        //ürün listesini html e ekliyor
        appendProductsToHtml: () => {
            Filter.Elements.productList.innerHTML = "";
            for (let i = 0; i < Filter.Status.products.length; i++) {
                const product = Filter.Status.products[i];

                var div = document.createElement("div");
                div.innerHTML = Filter.Elements.cardTemp.innerHTML;

                div.querySelector("a").setAttribute("href", "/product?id=" + product.id);
                div.querySelector("img").setAttribute("src", product.thumbnail);
                div.querySelector("img").setAttribute("alt", product.title);
                div.querySelector("h5").innerText = product.title;
                div.querySelector("p").innerText = product.description;
                div.querySelector("p.price").innerHTML =
                    "Category: " + product.category + "<br/>" +
                    "Price: " + product.price + "$<br/>" +
                    "Rating: " + product.rating + "<br/>" +
                    "Discount: " + product.discountPercentage + "%";

                Filter.Elements.productList.appendChild(div.querySelector("a"));

            }
        },

        //api'den tüm ürün listesini getiriyor
        getProducts: (apiUrl) => {
            fetch(apiUrl)
                .then(res => res.json())
                .then(res => {
                    Filter.Status.products = res.products;
                    Filter.Actions.appendProductsToHtml();
                });
        },

        clear: () => {
            //1.yol
            Filter.Elements.categorySelect.value = "";
            Filter.Actions.handleCategoryChange(Filter.Elements.categorySelect);

            //2.yol
            // Filter.Elements.categorySelect.value = "";
            // Filter.Elements.clearButton.classList.remove("show");
            // Filter.Actions.getProducts(Filter.Apis.products);
        }

    },
};

Filter.Actions.init();