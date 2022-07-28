let popupDialog;

checkoutButton.addEventListener("click", function () {
  
    popupDialog = document.createElement("dialog");
   
    let tableElement = document.createElement("table");
    let headRow = document.createElement("tr");
    ["Item", "Quantity", "Price"].forEach(function (value) {
        let cell = document.createElement("th");
        cell.innerHTML = value;
        headRow.appendChild(cell);
    });
    tableElement.appendChild(headRow);
    
    for (let item in userOrder) {
        let quantity = userOrder[item].quantity;
        
        if (quantity !== 0) {
            let price = userOrder[item].price.toFixed(2) + "$";
            let row = document.createElement("tr");
            [item, quantity, price].forEach(function (value) {
                let cell = document.createElement("td");
                cell.innerHTML = value;
                row.appendChild(cell);
            });
        tableElement.appendChild(row);
        }
    }
    popupDialog.appendChild(tableElement);

    
    let totalElement = document.createElement("p");
    totalElement.classList.add("total-cost");
    totalElement.innerHTML = "Total Price: " + document.querySelectorAll(".total-cost")[0].innerHTML;
    popupDialog.appendChild(totalElement);

   
    let closeBtn = document.createElement("button");
    closeBtn.innerHTML = "Ok";
    closeBtn.style.float = "right";

    
    closeBtn.addEventListener("click", function () {
        popupDialog.close();
        popupDialog.remove();
    });

    popupDialog.appendChild(closeBtn);
    document.getElementsByTagName("body")[0].appendChild(popupDialog);
    
    popupDialog.showModal();

});


document.body.addEventListener("keyup" , function (e) {
    if (e.key === "Escape") {
        popupDialog.remove();
    }
})
