document.addEventListener("DOMContentLoaded", function () {
    console.log("Skrypt załadowany poprawnie.");

    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Zatrzymuje odświeżanie strony

        let name = document.getElementById('name').value.trim();
        let clothingType = document.getElementById('clothingType').value.trim();
        let size = document.getElementById('size').value.trim();
        let color = document.getElementById('color').value.trim();
        let quantity = parseInt(document.getElementById('quantity').value);
        let price = parseFloat(document.getElementById('price').value);

        if (!name || !clothingType || !size || !color || !quantity || !price) {
            alert("Wszystkie pola muszą być wypełnione!");
            return;
        }

        let total = quantity * price;
        let order = { name, clothingType, size, color, quantity, price, total };

        let orderList = document.getElementById('orderList');
        let listItem = document.createElement('li');
        listItem.textContent = `${name} - ${clothingType}, Rozmiar: ${size}, Kolor: ${color}, Ilość: ${quantity}, Cena: ${price} zł (Suma: ${total} zł)`;
        orderList.appendChild(listItem);

        let currentTotal = parseFloat(document.getElementById('totalCost').textContent);
        document.getElementById('totalCost').textContent = (currentTotal + total).toFixed(2);

        document.getElementById('orderForm').reset();
    });

    document.getElementById('clothingType').addEventListener('change', function() {
        let colorSelect = document.getElementById('color');
        colorSelect.innerHTML = '<option value="">Wybierz kolor</option>';

        let colors = {
            "Polar": ["Czarny", "Granatowy"],
            "T-shirt": ["Czarny", "Czerwony", "Granatowy", "Biały"],
            "Sweter": ["Granatowy", "Czarny"],
            "Kurtka": ["Czarny", "Granatowy", "Czerwony"]
        };

        let selectedType = this.value;
        if (colors[selectedType]) {
            colors[selectedType].forEach(color => {
                let option = document.createElement('option');
                option.value = color;
                option.textContent = color;
                colorSelect.appendChild(option);
            });
        }
    });

    console.log("Poprawiony wybór koloru działa.");
});