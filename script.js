function addOrder() {
    const name = document.getElementById('name').value;
    const clothingType = document.getElementById('clothingType').value;
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
    const totalPrice = (quantity * price).toFixed(2);

    const table = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `<td>${name}</td><td>${clothingType}</td><td>${size}</td><td>${color}</td><td>${quantity}</td><td>${price} PLN</td><td>${totalPrice} PLN</td>`;

    saveOrders();
}

function saveOrders() {
    let orders = [];
    document.querySelectorAll("#ordersTable tbody tr").forEach(row => {
        let cells = row.querySelectorAll("td");
        orders.push({
            name: cells[0].textContent,
            clothingType: cells[1].textContent,
            size: cells[2].textContent,
            color: cells[3].textContent,
            quantity: cells[4].textContent,
            price: cells[5].textContent,
            totalPrice: cells[6].textContent
        });
    });
    localStorage.setItem("orders", JSON.stringify(orders));
}

function loadOrders() {
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    const table = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    table.innerHTML = "";

    orders.forEach(order => {
        let newRow = table.insertRow();
        newRow.innerHTML = `<td>${order.name}</td><td>${order.clothingType}</td><td>${order.size}</td><td>${order.color}</td><td>${order.quantity}</td><td>${order.price} PLN</td><td>${order.totalPrice} PLN</td>`;
    });
}

function exportToPDF() {
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");

    fetch('/generate_pdf', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders })
    })
    .then(response => response.blob())
    .then(blob => {
        let link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "zamowienia.pdf";
        link.click();
    });
}

document.addEventListener("DOMContentLoaded", loadOrders);
