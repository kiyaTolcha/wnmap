from flask import Flask, render_template, request, jsonify
import subprocess
import xml.etree.ElementTree as ET

app = Flask(__name__)

def parse_nmap_xml(xml_output):
    """
    Parses Nmap XML output and returns a structured dictionary.
    """
    root = ET.fromstring(xml_output)
    scan_data = {}

    # Get scan information
    for host in root.findall('host'):
        host_data = {}
        
        # Get IP address
        address = host.find('address')
        if address is not None:
            host_data['ip'] = address.get('addr')

        # Get status
        status = host.find('status')
        if status is not None:
            host_data['status'] = status.get('state')

        # Get ports and services
        ports_data = []
        ports = host.find('ports')
        if ports:
            for port in ports.findall('port'):
                port_data = {
                    'portid': port.get('portid'),
                    'protocol': port.get('protocol'),
                    'state': port.find('state').get('state'),
                    'service': port.find('service').get('name') if port.find('service') is not None else "unknown"
                }
                ports_data.append(port_data)

        if ports_data:
            host_data['ports'] = ports_data

        scan_data[host_data['ip']] = host_data

    return scan_data

@app.route("/")
def index():
    return render_template("index.html")

@app.route('/nmap', methods=['POST'])
def run_nmap():
    data = request.get_json()
    target = data.get('target')

    if not target:
        return jsonify({"error": "Target is required"}), 400

    try:
        # Execute Nmap with XML output
        result = subprocess.run(['C:\\Program Files (x86)\\Nmap\\nmap.exe', '-oX', '-', target], capture_output=True, text=True)


        if result.returncode != 0:
            return jsonify({"error": "Nmap execution failed", "message": result.stderr}), 500

        # Parse Nmap XML output and return JSON response
        parsed_output = parse_nmap_xml(result.stdout)
        return jsonify(parsed_output), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


