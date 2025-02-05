document.addEventListener("DOMContentLoaded", function () {
    console.log("Skrypt załadowany poprawnie.");

    document.getElementById('clothingType').addEventListener('change', function() {
        let colorSelect = document.getElementById('color');
        colorSelect.innerHTML = '';

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
        } else {
            let defaultOption = document.createElement('option');
            defaultOption.textContent = "Wybierz kolor";
            defaultOption.value = "";
            colorSelect.appendChild(defaultOption);
        }
    });

    console.log("Poprawiony wybór koloru działa.");
});