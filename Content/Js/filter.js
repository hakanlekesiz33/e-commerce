var Filter = {
    Apis: {
        categories: "https://dummyjson.com/products/categories",
        products: "https://dummyjson.com/products",
    },
    Elements: {
        categoryList: document.getElementById("category-list"),
        productList: document.getElementById("product-list"),
        cardTemp: document.getElementById("card-temp"),
        categoryTemp: document.getElementById("category-list-item-temp"),
    },
    Status: {
        categories: [],
        products: [],
        query: "",
        selectedCategories: [],
        sort: "",
    },
    Actions: {
        //Sayfa ilk açıldığında istenilen fonksiyonları çalıştrıacak
        init: () => {
            Filter.Actions.getAllCategories(); //  get all categories
            Filter.Actions.getAllProducts(); //  get all products
        },

        //search inputuna her yazı yazıldığında bu fonksiyon çalışır
        handleSearch: (sender) => {
            Filter.Status.query = sender.value;
            Filter.Actions.filter();
        },

        handleCategoryChange: () => {
            const checkedCategories = document.querySelectorAll("#category-list input:checked");
            const checkedIds = [];
            for (let i = 0; i < checkedCategories.length; i++) {
                const element = checkedCategories[i];
                checkedIds.push(element.getAttribute("id"));
            }

            Filter.Status.selectedCategories = checkedIds;
            Filter.Actions.filter();
        },
        //kategorileri saerch value'ya göre gizliyip gösterecek
        handleCategorySearch: (sender) => {
            var categoriesLiEl = document.querySelectorAll("#category-list li");

            for (let i = 0; i < categoriesLiEl.length; i++) {
                const element = categoriesLiEl[i];
                var categoryName = element.querySelector("label").innerText;
                if (categoryName.toLocaleLowerCase().includes(sender.value.toLocaleLowerCase())) {
                    element.style.display = "flex";
                }
                else {
                    element.style.display = "none";
                    element.querySelector("input").checked = false;
                }


            }
        },

        //filtreleme fonskiynları
        filter: () => {
            let apiUrl = "";
            if (Filter.Status.query) {
                apiUrl = Filter.Apis.products + "/search?q=" + Filter.Status.query;
            }
            else {
                apiUrl = Filter.Apis.products;
            }

            fetch(apiUrl)
                .then(res => res.json())
                .then(res => {
                    var selectedCategories = Filter.Status.selectedCategories;

                    if (selectedCategories.length > 0) {
                        Filter.Status.products = res.products.filter(x => selectedCategories.includes(x.category))
                    }
                    else {
                        Filter.Status.products = res.products;
                    }

                    Filter.Actions.appendProductsToHtml();
                });
        },

        //kategori listesini html'e ekliyor
        appendCategoriesToHtml: () => {
            Filter.Elements.categoryList.innerHTML = "";

            for (let i = 0; i < Filter.Status.categories.length; i++) {
                const ctg = Filter.Status.categories[i];
                var div = document.createElement("div");
                div.innerHTML = Filter.Elements.categoryTemp.innerHTML;
                //div.querySelector("input").id = ctg;
                div.querySelector("input").setAttribute("id", ctg);
                div.querySelector("label").setAttribute("for", ctg);

                var text = ctg.replaceAll("-", " ");
                var firstChar = text.charAt(0).toLocaleUpperCase();
                text = firstChar + text.substring(1);

                div.querySelector("label").innerText = text;
                Filter.Elements.categoryList.appendChild(div.querySelector("li"));
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

                Filter.Elements.productList.appendChild(div.querySelector("a"));

            }
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

        //api'den tüm ürün listesini getiriyor
        getAllProducts: () => {
            fetch(Filter.Apis.products)
                .then(res => res.json())
                .then(res => {
                    Filter.Status.products = res.products;
                    Filter.Actions.appendProductsToHtml();
                });
        },

        //var olan filtreleri temizleyecez
        clear: () => {

        },
    },
};

Filter.Actions.init();