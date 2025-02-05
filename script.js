document.addEventListener("DOMContentLoaded", function () {
    console.log("Skrypt załadowany poprawnie.");

    // Inicjalizacja bazy danych IndexedDB
    let db;
    const request = indexedDB.open("OrderFitDB", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("orders")) {
            db.createObjectStore("orders", { keyPath: "id", autoIncrement: true });
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        loadOrders();
    };

    request.onerror = function () {
        console.error("Błąd otwierania bazy danych.");
    };

    function saveOrder(order) {
        const transaction = db.transaction(["orders"], "readwrite");
        const store = transaction.objectStore("orders");
        store.add(order);
    }

    function loadOrders() {
        const transaction = db.transaction(["orders"], "readonly");
        const store = transaction.objectStore("orders");
        const request = store.getAll();

        request.onsuccess = function () {
            const orders = request.result;
            let totalCost = 0;
            orders.forEach(order => {
                addOrderToList(order);
                totalCost += order.total;
            });
            document.getElementById('totalCost').textContent = totalCost.toFixed(2);
        };
    }

    function addOrderToList(order) {
        let orderList = document.getElementById('orderList');
        let listItem = document.createElement('li');
        listItem.dataset.id = order.id;
        listItem.innerHTML = `<strong>${order.name}</strong> - ${order.clothingType}, Rozmiar: ${order.size}, Kolor: ${order.color}, Ilość: ${order.quantity}, Cena: ${order.price} zł (Suma: ${order.total} zł)`;
        orderList.appendChild(listItem);
    }

    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();

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

        saveOrder(order);
        addOrderToList(order);

        let currentTotal = parseFloat(document.getElementById('totalCost').textContent);
        document.getElementById('totalCost').textContent = (currentTotal + total).toFixed(2);

        document.getElementById('orderForm').reset();
    });

    document.getElementById('exportPDF').addEventListener('click', function() {
        console.log("Przycisk eksportu PDF został kliknięty.");

        try {
            if (typeof window.jspdf === "undefined") {
                throw new Error("Biblioteka jsPDF nie została poprawnie załadowana.");
            }

            const { jsPDF } = window.jspdf;
            let doc = new jsPDF();
            doc.setFont("helvetica", "bold");
            doc.text("Polregio - Zamówienie", 105, 20, null, null, "center");

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
                let name = text[0].trim();
                let details = text[1].split(", ");

                let clothingType = details[0].trim();
                let size = details[1].split(": ")[1].trim();
                let color = details[2].split(": ")[1].trim();
                let quantity = details[3].split(": ")[1].trim();
                let price = details[4].split(": ")[1].trim();
                let total = details[5].split(": ")[1].trim();

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

                doc.text(quantity.toString(), x + 2, y + 7);
                doc.rect(x, y, colWidths[4], 10);
                x += colWidths[4];

                doc.text(price.toString(), x + 2, y + 7);
                doc.rect(x, y, colWidths[5], 10);
                x += colWidths[5];

                doc.text(total.toString(), x + 2, y + 7);
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
});