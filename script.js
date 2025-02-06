document.addEventListener("DOMContentLoaded", function () {
    console.log("Skrypt załadowany poprawnie.");

    document.getElementById('exportPDF').addEventListener('click', function() {
        console.log("Przycisk eksportu PDF został kliknięty.");

        try {
            if (typeof window.jspdf === "undefined") {
                throw new Error("Biblioteka jsPDF nie została poprawnie załadowana.");
            }

            const { jsPDF } = window.jspdf;
            let doc = new jsPDF();
            doc.setFont("helvetica", "bold");
            
            // Dodanie logo Polregio
            let logoUrl = "https://upload.wikimedia.org/wikipedia/commons/4/42/Polregio_logo.svg";
            doc.addImage(logoUrl, "PNG", 10, 10, 40, 20);

            // Nagłówek
            doc.text("Polregio - Zamówienie", 105, 40, null, null, "center");

            let orders = Array.from(document.querySelectorAll("#orderList li"));

            if (orders.length === 0) {
                alert("Brak zamówień do eksportu.");
                return;
            }

            // Sortowanie zamówień alfabetycznie
            orders.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));

            let y = 50;
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
                let name = order.dataset.name || "Nieznane";
                let clothingType = order.dataset.clothingType || "Nieznane";
                let size = order.dataset.size || "Nieznane";
                let color = order.dataset.color || "Nieznane";
                let quantity = order.dataset.quantity || "0";
                let price = order.dataset.price || "0";
                let total = order.dataset.total || "0";

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

    console.log("Poprawiona wersja eksportu do PDF działa.");
});