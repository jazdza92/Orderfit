from flask import Flask, request, send_file
import json
from fpdf import FPDF

app = Flask(__name__)

@app.route('/generate_pdf', methods=['POST'])
def generate_pdf():
    data = request.json
    orders = data.get("orders", [])

    if not orders:
        return "Brak danych do eksportu", 400

    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", style='B', size=16)
    pdf.cell(200, 10, "Polregio - Zamówienie", ln=True, align='C')
    pdf.ln(10)

    pdf.set_font("Arial", size=10)
    column_widths = [40, 30, 20, 30, 20, 25, 25]

    headers = ["Imię i nazwisko", "Rodzaj", "Rozmiar", "Kolor", "Ilość", "Cena", "Łączna cena"]
    for i in range(len(headers)):
        pdf.cell(column_widths[i], 10, headers[i], border=1, align="C")
    pdf.ln()

    for order in orders:
        pdf.cell(column_widths[0], 10, order["name"], border=1, align="C")
        pdf.cell(column_widths[1], 10, order["clothingType"], border=1, align="C")
        pdf.cell(column_widths[2], 10, order["size"], border=1, align="C")
        pdf.cell(column_widths[3], 10, order["color"], border=1, align="C")
        pdf.cell(column_widths[4], 10, order["quantity"], border=1, align="C")
        pdf.cell(column_widths[5], 10, order["price"], border=1, align="C")
        pdf.cell(column_widths[6], 10, order["totalPrice"], border=1, align="C")
        pdf.ln()

    pdf_output = "/mnt/data/zamowienia.pdf"
    pdf.output(pdf_output)
    return send_file(pdf_output, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
