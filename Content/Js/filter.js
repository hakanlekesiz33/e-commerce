var Filter = {
    Apis: {
        categories: "https://dummyjson.com/products/categories",
    },
    Elements: {
        categoryList: document.getElementById("category-list"),
        productList: document.getElementById("product-list"),
        cardTemp: document.getElementById("card-temp"),
        categoryTemp: document.getElementById("category-list-item-temp"),
    },
    Status: {
        categories: [],
        query: "",
        selectedCategories: "",
        sort: "",
    },
    Actions: {
        //Sayfa ilk açıldığında istenilen fonksiyonları çalıştrıacak
        init: () => {
            Filter.Actions.getAllCategories(); //  get all categories
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
        //api'den tüm kategori listesini getiriyor
        getAllCategories: () => {
            fetch(Filter.Apis.categories)
                .then(res => res.json())
                .then(res => {
                    Filter.Status.categories = res;
                    Filter.Actions.appendCategoriesToHtml();
                });
        },
        //var olan filtreleri temizleyecez
        clear: () => {

        },
    },
};

Filter.Actions.init();