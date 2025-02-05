document.addEventListener("DOMContentLoaded", function () {
    console.log("Skrypt załadowany poprawnie.");

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
        listItem.innerHTML = `<strong>${name} ${surname}</strong> - ${clothingType}, Rozmiar: ${size}, Kolor: ${color}, Ilość: ${quantity}, Cena: ${price} zł (Suma: ${total} zł)`;

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
                let text = order.textContent.split(" - ");
                let name = text[0];
                let details = text[1].split(", ");
                
                let clothingType = details[0];
                let size = details[1].split(": ")[1];
                let color = details[2].split(": ")[1];
                let quantity = details[3].split(": ")[1];
                let price = details[4].split(": ")[1];
                let total = details[5].split(": ")[1];

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
            alert("Wystąpił błąd podczas generowania PDF. Spróbuj ponownie.");
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