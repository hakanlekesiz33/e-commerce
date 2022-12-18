var Filter = {
    Apis: {
        products: "https://dummyjson.com/products",
    },
    Elements: {

    },

    Actions: {
        //Sayfa ilk açıldığında istenilen fonksiyonları çalıştrıacak
        init: () => {
            Filter.Actions.getProductDetails(); //  get all products
        },

        //ürün detaylarını getiren endpoint çalışacak
        getProductDetails: () => {
            debugger

            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            if (id) {

            }
            else {
                alert("hatalı url")
            }


        }

    },
};

Filter.Actions.init();