document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let clothingType = document.getElementById('clothingType').value;
    let size = document.getElementById('size').value;
    let color = document.getElementById('color').value;
    let quantity = parseInt(document.getElementById('quantity').value);
    let price = parseFloat(document.getElementById('price').value);
    let imageFile = document.getElementById('imageUpload').files[0];
    
    let orderList = document.getElementById('orderList');
    let totalCostElement = document.getElementById('totalCost');

    let total = quantity * price;
    
    // Sprawdzenie, czy użytkownik już istnieje i sumowanie zamówień
    let existingOrders = document.querySelectorAll("#orderList li");
    let found = false;

    existingOrders.forEach(order => {
        if (order.dataset.name === name && order.dataset.surname === surname) {
            let existingTotal = parseFloat(order.dataset.total);
            let newTotal = existingTotal + total;
            order.dataset.total = newTotal;
            order.innerHTML = `${name} ${surname} - ${clothingType}, Rozmiar: ${size}, Kolor: ${color}, Ilość: ${quantity}, Cena: ${price} zł (Suma: ${newTotal} zł)`;
            found = true;
        }
    });

    if (!found) {
        let listItem = document.createElement('li');
        listItem.dataset.name = name;
        listItem.dataset.surname = surname;
        listItem.dataset.total = total;
        listItem.innerHTML = `${name} ${surname} - ${clothingType}, Rozmiar: ${size}, Kolor: ${color}, Ilość: ${quantity}, Cena: ${price} zł (Suma: ${total} zł)`;
        
        if (imageFile) {
            let imgElement = document.createElement('img');
            imgElement.src = URL.createObjectURL(imageFile);
            imgElement.style.width = "50px";
            imgElement.style.marginLeft = "10px";
            listItem.appendChild(imgElement);
        }

        orderList.appendChild(listItem);
    }

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
