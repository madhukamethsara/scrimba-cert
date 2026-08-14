import { products } from "./data.js";

const productContainer = document.getElementById("product-container");

let cart = [];

products.forEach(function (product) {

    productContainer.innerHTML += `
        <div class="product-card">

            <div class="product-emoji">
                ${product.emoji}
            </div>

            <div class="product-info">
                <h2>${product.name}</h2>

                <p>${product.ingredients.join(", ")}</p>

                <h3>Rs. ${product.price}</h3>
            </div>

            <button 
                class="add-cart-btn" 
                data-id="${product.id}">
                +
            </button>

        </div>
    `;
});

//add products to the cart when the add button is clicked

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("add-cart-btn")) {

        const productId = Number(event.target.dataset.id);

        const selectedProduct = products.find(function (product) {
            return product.id === productId;
        });

        cart.push(selectedProduct);

        renderCart();
    }

});


// display the data

function renderCart() {

    let existingCart = document.getElementById("cart");

    if (existingCart) {
        existingCart.remove();
    }

    if (cart.length === 0) {
        return;
    }

    const cartSection = document.createElement("div");

    cartSection.id = "cart";

    let cartItems = "";

    cart.forEach(function (product) {

        cartItems += `
            <div class="cart-item">

                <div>
                    <h3>${product.name}</h3>
                    <p>Rs. ${product.price}</p>
                </div>

                <button 
                    class="remove-btn" 
                    data-id="${product.id}">
                    Remove
                </button>

            </div>
        `;
    });

    const total = cart.reduce(function (sum, product) {
        return sum + product.price;
    }, 0);

    cartSection.innerHTML = `
        <h2>Your Order</h2>

        <div class="cart-items">
            ${cartItems}
        </div>

        <div class="cart-total">
            <strong>Total:</strong>
            <strong>Rs. ${total}</strong>
        </div>

        <button id="complete-order">
            Complete Order
        </button>
    `;

    document.body.appendChild(cartSection);
}

 //Remove Product

document.addEventListener("click", function (event) {

    if (event.target.classList.contains("remove-btn")) {

        const productId = Number(event.target.dataset.id);

        const index = cart.findIndex(function (product) {
            return product.id === productId;
        });

        if (index !== -1) {
            cart.splice(index, 1);
        }

        renderCart();
    }

});

// Complete Order

document.addEventListener("click", function (event) {

    if (event.target.id === "complete-order") {

        showPaymentPopup();
    }

});

// Payment Popup

function showPaymentPopup() {

    const overlay = document.createElement("div");

    overlay.id = "payment-overlay";

    overlay.innerHTML = `
        <div class="payment-popup">

            <button id="close-payment">×</button>

            <h2>Complete Your Order</h2>

            <p>Enter your payment details</p>

            <input 
                type="text" 
                id="customer-name"
                placeholder="Name"
            >

            <input 
                type="text" 
                id="card-number"
                placeholder="Card Number"
                maxlength="16"
            >

            <input 
                type="text" 
                id="cvv"
                placeholder="CVV"
                maxlength="3"
            >

            <button id="pay-button">
                Pay
            </button>

        </div>
    `;

    document.body.appendChild(overlay);
}

// Close Payment Popup

document.addEventListener("click", function (event) {

    if (event.target.id === "close-payment") {

        const overlay = document.getElementById("payment-overlay");

        if (overlay) {
            overlay.remove();
        }
    }

});

// Pay

document.addEventListener("click", function (event) {

    if (event.target.id === "pay-button") {

        const name = document.getElementById("customer-name").value;
        const cardNumber = document.getElementById("card-number").value;
        const cvv = document.getElementById("cvv").value;

        if (name === "" || cardNumber === "" || cvv === "") {

            alert("Please enter all payment details.");

            return;
        }

        const overlay = document.getElementById("payment-overlay");

        overlay.innerHTML = `
            <div class="thank-you">

                <h1>Thank You! 🎉</h1>

                <p>
                    Your order has been placed successfully.
                </p>

                <button id="finish-order">
                    Done
                </button>

            </div>
        `;

        cart = [];

        const cartElement = document.getElementById("cart");

        if (cartElement) {
            cartElement.remove();
        }

    }

});

// Finish

document.addEventListener("click", function (event) {

    if (event.target.id === "finish-order") {

        const overlay = document.getElementById("payment-overlay");

        if (overlay) {
            overlay.remove();
        }
    }

});