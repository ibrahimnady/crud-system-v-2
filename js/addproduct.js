var productNameInput = document.getElementById("productName");
var productCountInput = document.getElementById("productCount");
var productPriceInput = document.getElementById("productPrice");
var productDiscountInput = document.getElementById("productDiscount");
var productDecInput = document.getElementById("productDec");
var myBtn = document.getElementById("myBtn")
var currentIndex = 0;
var searchInput = document.getElementById("search")
var productsContainer;
if (localStorage.getItem(`products`) == null) {
    productsContainer = [];
}
else {
    productsContainer = JSON.parse(localStorage.getItem(`products`));
    displayProducts()
}
function add(){
    if (myBtn.innerHTML == "Add Product") {
        addproduct()
    }
    else {
        editData()
    }
}
function addproduct() {
    var product = {
        name: productNameInput.value,
        price: productPriceInput.value,
        discount: productDiscountInput.value,
        dec: productDecInput.value,
        count: productCountInput.value,
    }
    productsContainer.push(product)
    localStorage.setItem("products", JSON.stringify(productsContainer))
    displayProducts()
    clearform()
}
function displayProducts() {
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        cartoona += `<tr>
                <td>${i + 1}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].count}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].discount}</td>
                <td>${productsContainer[i].dec}</td>
                <td><button onclick="uptadeCount(${i} , ${1})" class=" btn btn-info"> <i class=" fas fa-plus-circle"></i> </button> </td>
                <td><button onclick="uptadeCount(${i} , ${-1    })" class=" btn btn-info"> <i class=" fas fa-minus-circle"></i> </button> </td>
                <td><button onclick="updateData(${i})" class=" btn btn-warning"> uptade</button> </td>
                <td><button onclick="deleteProducts(${i})" class=" btn btn-danger">delet</button></td>
                </tr>`
    }
    document.getElementById("tableRow").innerHTML = cartoona;
}
function clearform() {
    productNameInput.value = ""
    productCountInput.value = ""
    productPriceInput.value = ""
    productDiscountInput.value = ""
    productDecInput.value = ""
}
function deleteProducts(productIndex) {
    productsContainer.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer))
    displayProducts();
}
function search() {
    var temp = "";
    var trim = searchInput.value
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(trim.toLowerCase()) || productsContainer[i].dec.toLowerCase().includes(trim.toLowerCase())) {
            temp += `<tr>
                <td>${i + 1}</td>
                <td>${productsContainer[i].name}</td>
                <td>${productsContainer[i].count}</td>
                <td>${productsContainer[i].price}</td>
                <td>${productsContainer[i].discount}</td>
                <td>${productsContainer[i].dec}</td>
                <td><button onclick="updateData(${i})" class=" btn btn-warning"> uptade</button> </td>
                <td><button onclick="deleteProducts(${i})" class=" btn btn-danger">delet</button></td>
                </tr>`
        }
    }
    document.getElementById("tableRow").innerHTML = temp;
}
function uptadeCount(index, x) {
    productsContainer[index].count = Number(productsContainer[index].count) + Number(x);
    localStorage.setItem("products", JSON.stringify(productsContainer))
    displayProducts();

}
function updateData(index) {
    currentIndex = index
    productNameInput.value = productsContainer[index].name
    productCountInput.value = productsContainer[index].count
    productPriceInput.value = productsContainer[index].price
    productDiscountInput.value = productsContainer[index].discount
    productDecInput.value = productsContainer[index].dec
    myBtn.innerHTML = "update Data"
}
function editData() {
    productsContainer[currentIndex].name = productNameInput.value
    productsContainer[currentIndex].count = productCountInput.value
    productsContainer[currentIndex].price = productPriceInput.value
    productsContainer[currentIndex].discount = productDiscountInput.value
    productsContainer[currentIndex].dec = productDecInput.value
    myBtn.innerHTML = "Add Product";
    displayProducts()
    localStorage.setItem("products", JSON.stringify(productsContainer))
}
