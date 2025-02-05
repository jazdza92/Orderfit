document.addEventListener("DOMContentLoaded", function () {
    console.log("Skrypt załadowany poprawnie.");

    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();

        let name = document.getElementById('name').value.trim();
        let surname = document.getElementById('surname').value.trim();
        let clothingType = document.getElementById('clothingType').value.trim();
        let size = document.getElementById('size').value.trim();
        let color = document.getElementById('color').value.trim();
        let quantity = parseInt(document.getElementById('quantity').value);
        let price = parseFloat(document.getElementById('price').value);
        
        if (!name || !surname || !clothingType || !size || !color || !quantity || !price) {
            alert("Wszystkie pola muszą być wypełnione!");
            return;
        }

        let orderList = document.getElementById('orderList');
        let totalCostElement = document.getElementById('totalCost');

        let total = quantity * price;

        let listItem = document.createElement('li');
        listItem.innerHTML = `${name} ${surname}|${clothingType}|${size}|${color}|${quantity}|${price}|${total}`;
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
        console.log("Przycisk eksportu PDF został kliknięty.");

        try {
            if (typeof window.jspdf === "undefined") {
                throw new Error("Biblioteka jsPDF nie została poprawnie załadowana.");
            }

            const { jsPDF } = window.jspdf;
            let doc = new jsPDF();
            doc.setFont('helvetica', 'bold');
            doc.text("Polregio - Zamówienie", 105, 20, null, null, 'center');

            let orders = document.querySelectorAll("#orderList li");

            if (orders.length === 0) {
                alert("Brak zamówień do eksportu.");
                return;
            }

            let y = 40;
            const headers = ["Imię i nazwisko", "Rodzaj", "Rozmiar", "Kolor", "Ilość", "Cena", "Suma"];
            const colWidths = [50, 30, 20, 20, 15, 20, 20];

            doc.setFillColor(200, 220, 255);
            let x = 10;

            headers.forEach((header, i) => {
                doc.rect(x, y, colWidths[i], 10, "F");
                doc.text(header, x + 2, y + 7);
                x += colWidths[i];
            });

            y += 12;

            orders.forEach(order => {
                let fields = order.textContent.split("|");
                
                if (fields.length !== 7) {
                    throw new Error("Niekompletne dane zamówienia: " + order.textContent);
                }

                let [name, clothingType, size, color, quantity, price, total] = fields.map(f => f.trim());

                x = 10;

                doc.text(name, x + 2, y + 7);
                doc.rect(x, y, colWidths[0], 10);
                x += colWidths[0];

                doc.text(clothingType, x + 2, y + 7);
                doc.rect(x, y, colWidths[1], 10);
                x += colWidths[1];

                doc.text(size, x + 2, y + 7);
                doc.rect(x, y, colWidths[2], 10);
                x += colWidths[2];

                doc.text(color, x + 2, y + 7);
                doc.rect(x, y, colWidths[3], 10);
                x += colWidths[3];

                doc.text(quantity, x + 2, y + 7);
                doc.rect(x, y, colWidths[4], 10);
                x += colWidths[4];

                doc.text(price, x + 2, y + 7);
                doc.rect(x, y, colWidths[5], 10);
                x += colWidths[5];

                doc.text(total, x + 2, y + 7);
                doc.rect(x, y, colWidths[6], 10);
                x += colWidths[6];

                y += 12;
            });

            console.log("Eksport do PDF zakończony pomyślnie.");
            doc.save("zamowienie_polregio.pdf");
        } catch (error) {
            console.error("Błąd podczas eksportu PDF:", error);
            alert("Wystąpił błąd: " + error.message);
        }
    });

    console.log("Ładowanie jsPDF...");
    let script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = function() {
        console.log("jsPDF załadowany poprawnie.");
    };
    script.onerror = function() {
        console.error("Błąd: Nie udało się załadować jsPDF.");
        alert("Błąd: Nie udało się załadować jsPDF. Sprawdź połączenie internetowe.");
    };
    document.body.appendChild(script);
});