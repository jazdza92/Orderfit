from flask import Flask, send_file, request, jsonify
import json
import pandas as pd
from fpdf import FPDF

app = Flask(__name__)

@app.route('/generate_pdf', methods=['GET'])
def generate_pdf():
    orders = json.loads(request.args.get('orders', '[]'))
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, "Polregio - Zamówienie", ln=True, align='C')
    
    for order in orders:
        pdf.cell(200, 10, f"{order['name']} - {order['clothingType']} - {order['size']} - {order['color']} - {order['quantity']} szt. - {order['price']} zł/szt.", ln=True)

    pdf_output = "/mnt/data/zamowienia.pdf"
    pdf.output(pdf_output)
    return send_file(pdf_output, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
