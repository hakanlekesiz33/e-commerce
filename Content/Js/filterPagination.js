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
    },
    Actions: {
        //Sayfa ilk açıldığında istenilen fonksiyonları çalıştrıacak
        init: () => {
            Filter.Actions.getProducts(Filter.Apis.products); //  get all products
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

        loadMore: () => {
            debugger

        }

    },
};

Filter.Actions.init();