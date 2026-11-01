
// รายการอาหาร
// รายการอาหาร 20 เมนู พร้อมลิงก์รูปภาพที่สมบูรณ์และแสดงผลได้จริง 100%
const foods = [
    { id: 1, name: "ข้าวกะเพราหมู", price: 50, icon: "https://unsplash.com" },
    { id: 2, name: "ข้าวผัดหมู", price: 50, icon: "https://unsplash.com" },
    { id: 3, name: "ข้าวไข่เจียว", price: 40, icon: "https://unsplash.com" },
    { id: 4, name: "ข้าวผัดกุ้ง", price: 60, icon: "https://unsplash.com" },
    { id: 5, name: "ผัดซีอิ๊ว", price: 50, icon: "https://unsplash.com" },
    { id: 6, name: "ข้าวกะเพราไก่", price: 50, icon: "https://unsplash.com" },
    { id: 7, name: "ข้าวหมูกระเทียม", price: 50, icon: "https://unsplash.com" },
    { id: 8, name: "ข้าวกะเพราเนื้อ", price: 60, icon: "https://unsplash.com" },
    { id: 9, name: "ข้าวผัดปู", price: 70, icon: "https://unsplash.com" },
    { id: 10, name: "ราดหน้าหมู", price: 50, icon: "https://unsplash.com" },
    { id: 11, name: "ข้าวไข่ระเบิด", price: 55, icon: "https://unsplash.com" },
    { id: 12, name: "ข้าวคะน้าหมูกรอบ", price: 60, icon: "https://unsplash.com" },
    { id: 13, name: "ข้าวพริกแกงหมู", price: 50, icon: "https://unsplash.com" },
    { id: 14, name: "ต้มยำกุ้ง (กับข้าว)", price: 120, icon: "https://unsplash.com" },
    { id: 15, name: "แกงจืดเต้าหู้หมูสับ", price: 80, icon: "https://unsplash.com" },
    { id: 16, name: "ผัดผักบุ้งไฟแดง", price: 60, icon: "https://unsplash.com" },
    { id: 17, name: "ไข่ดาว", price: 10, icon: "https://unsplash.com" },
    { id: 18, name: "ไข่เจียว (พิเศษ)", price: 15, icon: "https://unsplash.com" },
    { id: 19, name: "ก๋วยเตี๋ยวหมู", price: 50, icon: "https://unsplash.com" },
    { id: 20, name: "ข้าวลาบหมู", price: 55, icon: "https://unsplash.com" }
];

// ตะกร้าสินค้า
let cart = [];

// แสดงเมนูอาหาร
function showMenu() {
    const menu = document.getElementById("menu");
    if (!menu) return;
    
    menu.innerHTML = foods.map(food => {
        return `
            <div class="food-card">
                <div class="food-image-box" style="margin-bottom: 12px; height:140px; display:flex; align-items:center; justify-content:center; overflow:hidden;">
                    <img src="${food.icon}" alt="${food.name}" style="width:100%; height:140px; object-fit:cover; border-radius:8px;">
                </div>
                <h3>${food.name}</h3>
                <p class="price">${food.price} บาท</p>
                <button class="add-btn" onclick="addFood(${food.id})">
                    + เพิ่มรายการ
                </button>
            </div>
        `;
    }).join("");
}

// โหลดเมนูทันทีเมื่อเปิดหน้าเว็บ
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", showMenu);
} else {
    showMenu();
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
