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
}

function exportToPDF() {
    const rows = document.querySelectorAll("#ordersTable tbody tr");
    let orders = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
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
