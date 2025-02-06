from flask import Flask, request, send_file
import json
from fpdf import FPDF

app = Flask(__name__)

@app.route('/generate_pdf', methods=['POST'])
def generate_pdf():
    data = request.json
    orders = data.get("orders", [])

    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", style='B', size=16)
    pdf.cell(200, 10, "Polregio - Zamówienie", ln=True, align='C')
    pdf.ln(10)
    
    pdf.set_font("Arial", size=12)
    pdf.cell(30, 10, "Imię i nazwisko", border=1)
    pdf.cell(30, 10, "Rodzaj", border=1)
    pdf.cell(20, 10, "Rozmiar", border=1)
    pdf.cell(30, 10, "Kolor", border=1)
    pdf.cell(20, 10, "Ilość", border=1)
    pdf.cell(30, 10, "Cena", border=1)
    pdf.cell(30, 10, "Łączna cena", border=1)
    pdf.ln()

    for order in orders:
        pdf.cell(30, 10, order["name"], border=1)
        pdf.cell(30, 10, order["clothingType"], border=1)
        pdf.cell(20, 10, order["size"], border=1)
        pdf.cell(30, 10, order["color"], border=1)
        pdf.cell(20, 10, order["quantity"], border=1)
        pdf.cell(30, 10, order["price"], border=1)
        pdf.cell(30, 10, order["totalPrice"], border=1)
        pdf.ln()

    pdf_output = "/mnt/data/zamowienia.pdf"
    pdf.output(pdf_output)
    return send_file(pdf_output, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
