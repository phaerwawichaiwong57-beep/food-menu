
// รายการอาหาร
const foods = [
    { id: 1, name: "ข้าวกะเพราหมู", price: 50, icon: "🍛" },
    { id: 2, name: "ข้าวผัดหมู", price: 50, icon: "🍚" },
    { id: 3, name: "ข้าวไข่เจียว", price: 40, icon: "🍳" },
    { id: 4, name: "ข้าวผัดกุ้ง", price: 60, icon: "🍤" },
    { id: 5, name: "ผัดซีอิ๊ว", price: 50, icon: "🍜" },
    { id: 6, name: "ข้าวกะเพราไก่", price: 50, icon: "🍗" }
];

// ตะกร้าสินค้า
let cart = [];

// แสดงเมนูอาหาร
function showMenu() {
    const menu = document.getElementById("menu");

    menu.innerHTML = foods.map(food => `
        <div class="food-card">
            <div class="food-icon">${food.icon}</div>
            <h3>${food.name}</h3>
            <p class="price">${food.price} บาท</p>
            <button class="add-btn"
                onclick="addFood(${food.id})">
                + เพิ่มรายการ
            </button>
        </div>
    `).join("");
}

// เพิ่มอาหารลงตะกร้า
function addFood(id) {
    const food = foods.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            ...food,
            qty: 1
        });
    }

    showCart();
}

// เพิ่มจำนวน
function increase(id) {
    const item = cart.find(food => food.id === id);
    item.qty++;
    showCart();
}

// ลดจำนวน
function decrease(id) {
    const item = cart.find(food => food.id === id);

    item.qty--;

    if (item.qty <= 0) {
        cart = cart.filter(food => food.id !== id);
    }

    showCart();
}

// แสดงรายการอาหาร
function showCart() {
    const list = document.getElementById("cart-list");
    const totalElement = document.getElementById("total");

    if (cart.length === 0) {
        list.innerHTML = "<p>ยังไม่มีรายการอาหาร</p>";
        totalElement.textContent = 0;
        return;
    }

    list.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>

            <span>
                <button onclick="decrease(${item.id})">−</button>
                ${item.qty}
                <button onclick="increase(${item.id})">+</button>
            </span>

            <strong>${item.price * item.qty} บาท</strong>
        </div>
    `).join("");

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty, 0
    );

    totalElement.textContent = total;
}

// ยืนยันการสั่งอาหาร
function confirmOrder() {
    if (cart.length === 0) {
        alert("กรุณาเลือกอาหารก่อนสั่ง");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.qty, 0
    );

    let receipt = "รายการสั่งอาหาร\n\n";

    cart.forEach(item => {
        receipt += `${item.name} x ${item.qty} = ${
            item.price * item.qty
        } บาท\n`;
    });

    receipt += `\nรวมทั้งหมด ${total} บาท`;

    alert(receipt + "\n\nขอบคุณที่ใช้บริการ!");

    cart = [];
    showCart();
}

// ล้างรายการอาหาร
function clearCart() {
    cart = [];
    showCart();
}

// เริ่มต้นเว็บไซต์
showMenu();
showCart();
