from flask import Flask, render_template, jsonify, request, send_file
import subprocess
import threading
import time
import re
from collections import Counter
from fpdf import FPDF
import os

# Initialize Flask app
app = Flask(__name__, static_folder='static')

# Global storage (for demo purposes only, not for production)
log_lines = []
failed_logins = []
ip_counter = Counter()

# Background thread to collect logs from /var/log/secure
def stream_logs():
    process = subprocess.Popen(['tail', '-F', '/var/log/secure'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    for line in iter(process.stdout.readline, b''):
        line = line.decode('utf-8')
        log_lines.append(line)
        if "Failed password" in line:
            match = re.search(r'from (\d+\.\d+\.\d+\.\d+)', line)
            if match:
                ip = match.group(1)
                failed_logins.append(ip)
                ip_counter[ip] += 1

# Start background log thread
threading.Thread(target=stream_logs, daemon=True).start()

@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/logs')
def get_logs():
    return jsonify(log_lines[-100:])  # Send last 100 lines

@app.route('/failed-logins')
def get_failed_logins():
    return jsonify({"total": len(failed_logins)})

@app.route('/top-ips')
def get_top_ips():
    return jsonify(ip_counter.most_common(5))

@app.route('/block-ip', methods=['POST'])
def block_ip():
    ip = request.json.get('ip')
    if ip:
        subprocess.run(["sudo", "firewall-cmd", "--permanent", "--add-rich-rule=rule family=\"ipv4\" source address=\"{}\" reject".format(ip)])
        subprocess.run(["sudo", "firewall-cmd", "--reload"])
        return jsonify({"status": "blocked", "ip": ip})
    return jsonify({"error": "Invalid IP"}), 400

@app.route('/export-pdf')
def export_pdf():
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="Log Report", ln=True, align='C')
    for line in log_lines[-100:]:
        pdf.multi_cell(0, 10, txt=line)
    output_path = os.path.join("static", "log_report.pdf")
    pdf.output(output_path)
    return send_file(output_path, as_attachment=True)

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
