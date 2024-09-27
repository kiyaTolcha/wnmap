# Nmap Multi-Scanner

A web-based application that allows users to perform multiple Nmap scans concurrently on specified IP addresses or hostnames. The results are displayed in an organized table format, showing the scan progress, status, and open ports for each target.

## Features

- Input multiple IP addresses or hostnames separated by commas.
- Concurrently run Nmap scans and display progress.
- Dynamic table that shows scan results, including IP, status, ports, and a rescan option.
- Styled with an industrial system theme using CSS.

## Prerequisites

- Python 3.x
- Flask
- Nmap (installed on your machine)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/nmap-multi-scanner.git
   cd nmap-multi-scanner
   ```

2. **Install the required Python packages**:

   ```bash
   pip install Flask
   ```

3. **Install Nmap**:
   - Download and install Nmap from [nmap.org](https://nmap.org/download.html).
   - Ensure that the path to the `nmap.exe` is correct in the `app.py` file.

## Usage

1. **Run the Flask application**:

   ```bash
   python app.py
   ```

2. **Access the application**:
   - Open your browser and navigate to `http://127.0.0.1:5000/`.

3. **Input Multiple Targets**:
   - Enter multiple IPs or hostnames in the input field, separated by commas, and click "Run Nmap Scan."
   - The results will be displayed in a table format with progress bars for each scan.

## File Structure

```
/nmap-multi-scanner
│
├── app.py                   # Main Flask application
├── templates/               # HTML templates directory
│   └── index.html           # Main HTML file
├── static/                  # Static files directory
│   ├── css/                 # CSS files directory
│   │   └── styles.css       # Styles for the application
│   └── js/                  # JavaScript files directory
│       └── scripts.js       # Script for handling functionality
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Acknowledgments

- [Flask](https://flask.palletsprojects.com/) for web framework.
- [Nmap](https://nmap.org/) for network scanning.
## ScreenShots
- [Alt text](/ScreenShots/screenshot.png?raw=true "Screenshot")
