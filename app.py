from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# In-memory storage
blocked_ips = []
saved_emails = []

# Path to your system log file (Fedora: /var/log/secure or /var/log/auth.log usually)
LOG_FILE_PATH = '/var/log/mylogs/web_access.log'  


@app.route('/')
def dashboard():
    return render_template('dashboard.html')

@app.route('/get_logs')
def get_logs():
    logs = []
    if os.path.exists(LOG_FILE_PATH):
        with open(LOG_FILE_PATH, 'r') as f:
            lines = f.readlines()[-10:]  # Read last 50 lines (for performance)
            for line in lines:
                # Very basic parsing — adjust based on your system logs
                parts = line.strip().split()
                if len(parts) > 5:
                    timestamp = f"{parts[0]} {parts[1]} {parts[2]}"
                    ip = next((p for p in parts if p.count('.') == 3), "N/A")
                    status = 'Fail' if 'fail' in line.lower() else 'Success'
                    action = 'Blocked' if ip in blocked_ips else 'Success'
                    logs.append({
                        'time': timestamp,
                        'ip': ip,
                        'status': status,
                        'action': action
                    })
    return jsonify(logs)

@app.route('/block_ip', methods=['POST'])
def block_ip():
    data = request.get_json()
    ip = data.get('ip')
    if ip and ip not in blocked_ips:
        blocked_ips.append(ip)
    return jsonify({'message': 'IP blocked successfully'})

@app.route('/set_email', methods=['POST'])
def set_email():
    data = request.get_json()
    email = data.get('email')
    if email and email not in saved_emails:
        saved_emails.append(email)
    return jsonify({'message': 'Email saved successfully'})

if __name__ == '__main__':
    app.run(debug=True)
