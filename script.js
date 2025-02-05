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

    let total = quantity * price;

    let listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${name} ${surname}</strong><br> 
                          <em>${clothingType}</em>, Rozmiar: <strong>${size}</strong>, 
                          Kolor: <strong>${color}</strong>, Ilość: <strong>${quantity}</strong>, 
                          Cena: <strong>${price} zł</strong> (Suma: <strong>${total} zł</strong>)`;

    orderList.appendChild(listItem);

    let currentTotal = parseFloat(totalCostElement.textContent);
    totalCostElement.textContent = (currentTotal + total).toFixed(2);

    document.getElementById('orderForm').reset();
});

document.getElementById('clothingType').addEventListener('change', function() {
    let colorSelect = document.getElementById('color');
    colorSelect.innerHTML = '<option value="">Wybierz kolor</option>';
    let selectedType = this.value;

    let colors = {
        "Polar": ["Czarny", "Granatowy"],
        "T-shirt": ["Czarny", "Czerwony", "Granatowy", "Biały"],
        "Sweter": ["Granatowy", "Czarny"]
    };

    if (colors[selectedType]) {
        colors[selectedType].forEach(color => {
            let option = document.createElement('option');
            option.value = color;
            option.textContent = color;
            colorSelect.appendChild(option);
        });
    }
});

document.getElementById('exportPDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.text("Lista Zamówień - OrderFit", 20, 20);
    
    let orders = document.querySelectorAll("#orderList li");
    let y = 40;
    orders.forEach(order => {
        doc.text(order.innerText, 20, y);
        y += 10;
    });

    doc.save("zamowienia.pdf");
});
