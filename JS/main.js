const toppingsArr = [
    ["Vegitable", 4],
    ["jalapeno", 5],
    ["mozzarella", 8],
    ["sauce", 4],
    ["Extra", 9],
    ["onion", 3],
    ["capsicum", 1]
]

const toppings = new Map(toppingsArr);
let list = document.getElementsByTagName("ul")[0];

let userOrder = {};
function initializeOrder() {
    toppingsArr.forEach(function (item) {
        userOrder[item[0]]= {
            quantity: 0,
            price: 0
        };
    });
}
initializeOrder();


userOrder["Pizza Base"] = {
    quantity: 1,
    price: 3
}

function createItems(items) {
    items.forEach(function (price, item) {
        let listItem = document.createElement("li");

       
        let leftDivElement = document.createElement("div");
        leftDivElement.classList.add("left");

        
        let nameElement = document.createElement("span");
        nameElement.appendChild(document.createTextNode(item));
        let costElement = document.createElement("p");
        costElement.classList.add("cost");
        costElement.appendChild(document.createTextNode(`${price}$`));

        leftDivElement.appendChild(nameElement);
        leftDivElement.appendChild(costElement);

        listItem.appendChild(leftDivElement);

       
        let rightDivElement = document.createElement("div");
        rightDivElement.classList.add("right");

        
        let quantityElement = document.createElement("span");
        quantityElement.classList.add("quantity")
       
        quantityElement.appendChild(document.createTextNode(0));

        let increaseButton = document.createElement("button");
        increaseButton.appendChild(document.createTextNode("+"));
        increaseButton.classList.add("increase");
        increaseButton.classList.add("small-btn");


        increaseButton.addEventListener("click", function () {
            let totalQuantity = calculateTotalQuantity();
            let toppingQuantity = Number(quantityElement.innerHTML);
            if (totalQuantity < 10 && toppingQuantity >= 0) {
                if (toppingQuantity < 2) {
                    decreaseButton.disabled = false;
                    quantityElement.innerHTML = ++toppingQuantity;

                   
                    let imgElement = document.createElement("img");
                    let imgName = item.toLowerCase().split(" ").join("-");
                    imgElement.classList.add(imgName);
                    let imgLoc = "./image/" + imgName + ".png";
                    imgElement.setAttribute("src", imgLoc);
                    document.getElementsByTagName("body")[0].appendChild(imgElement);

                    
                    totalQuantity++;

                   
                    userOrder[item].quantity = toppingQuantity;
                    userOrder[item].price += price;

                    
                    if (toppingQuantity === 2) {
                        increaseButton.disabled = true;
                    }

                    
                    showTotalPrice();
                } else {
                    alert(`Cannot add more than 2 toppings for ${item} topping!`);
                }
            } else {
                alert("Cannot add more than 10 toppings!")
            }

            
            if(totalQuantity > 0) {
                checkoutButton.disabled = false;
            }
        });

        let decreaseButton = document.createElement("button");
        decreaseButton.appendChild(document.createTextNode("-"));
        decreaseButton.classList.add("decrease");
        decreaseButton.classList.add("small-btn");
        
        decreaseButton.disabled = true;

        decreaseButton.addEventListener("click", function () {
            let toppingQuantity = Number(quantityElement.innerHTML);
            if (toppingQuantity > 0) {
                quantityElement.innerHTML = --toppingQuantity;

                
                let imgName = item.toLowerCase().split(" ").join("-");
                document.getElementsByClassName(imgName)[0].remove();

                
                userOrder[item].quantity = toppingQuantity;
                userOrder[item].price -= price;

                
                showTotalPrice();
            }

            
            if (toppingQuantity < 2) {
                increaseButton.disabled = false;
                if (toppingQuantity === 0) {
                    decreaseButton.disabled = true;
                }
            }

           
            if (calculateTotalQuantity() === 0) {
                checkoutButton.disabled = true;
            }
        });

        rightDivElement.appendChild(decreaseButton);
        rightDivElement.appendChild(quantityElement);
        rightDivElement.appendChild(increaseButton);

        listItem.appendChild(leftDivElement);
        listItem.appendChild(rightDivElement);

        list.appendChild(listItem);
    });
}

createItems(toppings);


let listItem = document.createElement("li");
let totalText = document.createElement("span");
totalText.classList.add("left");
totalText.innerHTML = "Total";

listItem.appendChild(totalText);

let costEle = document.createElement("span");
costEle.innerHTML = "cost";
costEle.classList.add("total-cost");
costEle.classList.add("right");
listItem.appendChild(costEle);
list.appendChild(listItem)


let checkoutItem = document.createElement("li");
let checkoutButton = document.createElement("button");
checkoutButton.classList.add("blue-btn");
checkoutButton.id = "checkout-btn";
checkoutButton.disabled = true;
checkoutButton.innerHTML = "Checkout";
checkoutItem.appendChild(checkoutButton);
list.appendChild(checkoutItem);


showTotalPrice();

document.getElementById("reset-btn").addEventListener("click", reset);
