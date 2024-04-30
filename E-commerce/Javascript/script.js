document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.card_button');
    displayCart();
});

function addToCart(event) {
    const button = event.target;
    const productCard = button.closest('.card');

    const productName = productCard.dataset.name;
    const productPrice = productCard.dataset.price;
    const productImage = productCard.dataset.image;

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.location.href = "cart.html";

    displayCart();
}

function displayCart() {
    const cartBody = document.getElementById('cartBody');
    cartBody.innerHTML = '';

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-4"><img src="${item.image}" alt="${item.name}" class="cart_image"></td>
            <td class="p-4">${item.name}</td>
            <td class="p-4">$${item.price}</td>
            <td class="p-4">
                <i class="fa-solid fa-minus cart_plus_minus_icons" onclick="updateQuantity(this, '${item.name}', ${item.price}, -1)"></i>
                <input type="text" value="${item.quantity}" size="2" readonly>
                <i class="fa-solid fa-plus cart_plus_minus_icons" onclick="updateQuantity(this, '${item.name}', ${item.price}, 1)"></i>
            </td>
            <td class="p-4 orange fs-4 ">$${item.price * item.quantity}</td>
            <td class="p-4"> <i class="fa-solid fa-x cart_X_icons" onclick="removeItem('${item.name}')"></i></td>
        `;
        cartBody.appendChild(row);
    });
}

function updateQuantity(element, productName, price, change) {
    const row = element.closest('tr');
    const input = row.querySelector('input');
    let quantity = parseInt(input.value) + change;

    if (quantity < 1 || isNaN(quantity)) {
        quantity = 1;
    }

    input.value = quantity;

    const totalCell = row.querySelector('.orange');
    totalCell.textContent = `$${price * quantity}`;

    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cartItems.findIndex(item => item.name === productName);

    if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
}

function removeItem(productName) {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCartItems = cartItems.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));

    displayCart();
}












