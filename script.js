document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let clothingType = document.getElementById('clothingType').value;
    let size = document.getElementById('size').value;
    let color = document.getElementById('color').value;
    let quantity = parseInt(document.getElementById('quantity').value);
    let price = parseFloat(document.getElementById('price').value);
    
    let orderList = document.getElementById('orderList');
    let totalCostElement = document.getElementById('totalCost');
    
    let listItem = document.createElement('li');
    let total = quantity * price;
    listItem.textContent = `${name} ${surname} - ${clothingType}, Rozmiar: ${size}, Kolor: ${color}, Ilość: ${quantity}, Cena: ${price} zł (Suma: ${total} zł)`;
    
    orderList.appendChild(listItem);
    
    let currentTotal = parseFloat(totalCostElement.textContent);
    totalCostElement.textContent = (currentTotal + total).toFixed(2);
    
    document.getElementById('orderForm').reset();
});

document.getElementById('exportPDF').addEventListener('click', function() {
    let doc = new jsPDF();
    doc.text("Lista Zamówień - OrderFit", 20, 20);

    let orders = document.querySelectorAll("#orderList li");
    let y = 40;
    orders.forEach(order => {
        doc.text(order.textContent, 20, y);
        y += 10;
    });

    doc.save("zamowienia.pdf");
});
