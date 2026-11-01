
// รายการอาหาร 20 เมนู
const foods = [
    {id:1, name:"ข้าวกะเพราหมูสับ", price:50, icon:"🍛"},
    {id:2, name:"ข้าวกะเพราไก่", price:50, icon:"🍗"},
    {id:3, name:"ข้าวผัดหมู", price:50, icon:"🍚"},
    {id:4, name:"ข้าวผัดกุ้ง", price:60, icon:"🍤"},
    {id:5, name:"ข้าวไข่เจียว", price:40, icon:"🍳"},
    {id:6, name:"ข้าวหมูกรอบ", price:60, icon:"🥓"},
    {id:7, name:"ข้าวผัดไก่", price:50, icon:"🍗"},
    {id:8, name:"สุกี้แห้งหมู", price:55, icon:"🥘"},
    {id:9, name:"ผัดซีอิ๊วหมู", price:50, icon:"🍜"},
    {id:10, name:"ผัดไทยกุ้ง", price:60, icon:"🍝"},
    {id:11, name:"ข้าวหมูกระเทียม", price:50, icon:"🍖"},
    {id:12, name:"ข้าวไก่กระเทียม", price:50, icon:"🍗"},
    {id:13, name:"ข้าวผัดต้มยำ", price:55, icon:"🍛"},
    {id:14, name:"มาม่าผัดหมู", price:50, icon:"🍜"},
    {id:15, name:"ข้าวแกงหมู", price:50, icon:"🍲"},
    {id:16, name:"ข้าวผัดปู", price:70, icon:"🦀"},
    {id:17, name:"ข้าวไข่ดาว", price:40, icon:"🍳"},
    {id:18, name:"ข้าวไก่ทอด", price:55, icon:"🍗"},
    {id:19, name:"ก๋วยเตี๋ยวหมู", price:50, icon:"🍜"},
    {id:20, name:"ข้าวลาบหมู", price:55, icon:"🥗"}
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
        cart.push({...food, qty: 1});
    }

    showCart();
}

// เพิ่มจำนวนอาหาร
function increase(id) {
    const item = cart.find(food => food.id === id);
    item.qty++;
    showCart();
}

// ลดจำนวนอาหาร
function decrease(id) {
    const item = cart.find(food => food.id === id);

    item.qty--;

    if (item.qty <= 0) {
        cart = cart.filter(food => food.id !== id);
    }

    showCart();
}

// คำนวณราคารวม
function calculateTotal() {
    return cart.reduce(
        (sum, item) => sum + item.price * item.qty, 0
    );
}

// แสดงรายการอาหารในตะกร้า
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

            <strong>
                ${item.price * item.qty} บาท
            </strong>
        </div>
    `).join("");

    totalElement.textContent = calculateTotal();
}

// ยืนยันการสั่งอาหาร
function confirmOrder() {
    if (cart.length === 0) {
        alert("กรุณาเลือกอาหารก่อนสั่ง");
        return;
    }

    let receipt = "🍛 ร้านอร่อยตามสั่ง\n";
    receipt += "รายการอาหารที่สั่ง\n\n";

    cart.forEach(item => {
        receipt += `${item.name} x ${item.qty} = ${
            item.price * item.qty
        } บาท\n`;
    });

    receipt += "\n------------------\n";
    receipt += `รวมทั้งหมด ${calculateTotal()} บาท`;
    receipt += "\n------------------";
    receipt += "\nขอบคุณที่ใช้บริการ ❤️";

    alert(receipt);

    cart = [];
    showCart();
}

// ล้างรายการอาหาร
function clearCart() {
    cart = [];
    showCart();
}

// เริ่มต้นระบบ
showMenu();
showCart();
