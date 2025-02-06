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
    alert('Funkcja eksportu do PDF będzie dostępna w kolejnej wersji!');
}
