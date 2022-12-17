var Filter = {
    Apis: {
        products: "https://dummyjson.com/products",
    },
    Elements: {
        productList: document.getElementById("product-list"),
        cardTemp: document.getElementById("card-temp"),
    },
    Status: {
        products: [],
        query: "",
    },
    Actions: {
        //Sayfa ilk açıldığında istenilen fonksiyonları çalıştrıacak
        init: () => {
            debugger
            Filter.Actions.getAllProducts(); //  get all products
        },

        //search inputuna her yazı yazıldığında bu fonksiyon çalışır
        handleSearch: (sender) => {
            Filter.Status.query = sender.value;
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
                    Filter.Status.products = res.products;
                    Filter.Actions.appendProductsToHtml();
                });
        },


        //ürün listesini html e ekliyor
        appendProductsToHtml: () => {
            debugger
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

        //api'den tüm ürün listesini getiriyor
        getAllProducts: () => {
            fetch(Filter.Apis.products)
                .then(res => res.json())
                .then(res => {
                    debugger
                    Filter.Status.products = res.products;
                    Filter.Actions.appendProductsToHtml();
                });
        },

    },
};

debugger
Filter.Actions.init();