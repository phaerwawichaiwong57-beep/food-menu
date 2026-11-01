// รายการอาหาร 20 เมนู พร้อมอิโมจิรูปอาหารขนาดใหญ่ (เสถียร 100% ไม่มีรูปแตก)
const foods = [
    { id: 1, name: "ข้าวกะเพราหมู", price: 50, icon: "🍲" },
    { id: 2, name: "ข้าวผัดหมู", price: 50, icon: "🍚" },
    { id: 3, name: "ข้าวไข่เจียว", price: 40, icon: "🍳" },
    { id: 4, name: "ข้าวผัดกุ้ง", price: 60, icon: "🍤" },
    { id: 5, name: "ผัดซีอิ๊ว", price: 50, icon: "🥢" },
    { id: 6, name: "ข้าวกะเพราไก่", price: 50, icon: "🍗" },
    { id: 7, name: "ข้าวหมูกระเทียม", price: 50, icon: "🧄" },
    { id: 8, name: "ข้าวกะเพราเนื้อ", price: 60, icon: "🥩" },
    { id: 9, name: "ข้าวผัดปู", price: 70, icon: "🦀" },
    { id: 10, name: "ราดหน้าหมู", price: 50, icon: "🍜" },
    { id: 11, name: "ข้าวไข่ระเบิด", price: 55, icon: "💥" },
    { id: 12, name: "ข้าวคะน้าหมูกรอบ", price: 60, icon: "🥬" },
    { id: 13, name: "ข้าวพริกแกงหมู", price: 50, icon: "🌶️" },
    { id: 14, name: "ต้มยำกุ้ง (กับข้าว)", price: 120, icon: "🥣" },
    { id: 15, name: "แกงจืดเต้าหู้หมูสับ", price: 80, icon: "🍲" },
    { id: 16, name: "ผัดผักบุ้งไฟแดง", price: 60, icon: "🌱" },
    { id: 17, name: "ไข่ดาว", price: 10, icon: "🍳" },
    { id: 18, name: "ไข่เจียว (พิเศษ)", price: 15, icon: "🥚" },
    { id: 19, name: "ก๋วยเตี๋ยวหมู", price: 50, icon: "🍜" },
    { id: 20, name: "ข้าวลาบหมู", price: 55, icon: "🐷" }
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
                <div class="food-image-box" style="margin-bottom: 12px; height:140px; display:flex; align-items:center; justify-content:center; background-color:#fff0e0; border-radius:8px;">
                    <span style="font-size: 70px;">${food.icon}</span>
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
