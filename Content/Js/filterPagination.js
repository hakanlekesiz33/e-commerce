var Filter = {
    Apis: {
        products: "https://dummyjson.com/products",
    },
    Elements: {
        productList: document.getElementById("product-list"),
        cardTemp: document.getElementById("card-temp"),
        showMore: document.getElementById("show-more-button"),
    },
    Status: {
        products: [],
        limit: 30,
        skip: 0
    },
    Actions: {
        //Sayfa ilk açıldığında istenilen fonksiyonları çalıştrıacak
        init: () => {
            const apiUrl = Filter.Apis.products + "?limit=" + Filter.Status.limit + "&skip=" + Filter.Status.skip;
            debugger
            Filter.Actions.getProducts(apiUrl); //  get all products
        },

        //ürün listesini html e ekliyor
        appendProductsToHtml: () => {
        
            for (let i = 0; i < Filter.Status.products.length; i++) {
                const product = Filter.Status.products[i];

                var div = document.createElement("div");
                div.innerHTML = Filter.Elements.cardTemp.innerHTML;

                div.querySelector("a").setAttribute("href", "/ProductDetails.html?id=" + product.id);
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
                    debugger

                    if ((res.limit + res.skip) < res.total) {
                        Filter.Elements.showMore.style.display = "block";
                    }
                    else {
                        Filter.Elements.showMore.style.display = "none";
                    }

                    Filter.Actions.appendProductsToHtml();
                });
        },

        showMore: () => {
            debugger
            const skip = Filter.Status.skip + Filter.Status.limit;
            Filter.Status.skip = skip;
            const apiUrl = Filter.Apis.products + "?limit=" + Filter.Status.limit + "&skip=" + skip;
            Filter.Actions.getProducts(apiUrl); //  get all products
        }

    },
};

Filter.Actions.init();