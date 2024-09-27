// Event listener for form submission
document.getElementById('nmapForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const targetInput = document.getElementById('target').value;
    const targets = targetInput.split(',').map(t => t.trim()); // Allow multiple targets

    // Loop through each target and start a scan
    targets.forEach(target => {
        addScanRow(target);  // Add a new row for the scan in progress
        runNmapScan(target); // Initiate scan for each target
    });
});

// Function to handle the Nmap scan
function runNmapScan(target) {
    const progressBar = document.getElementById(`progress-bar-${target}`);
    updateProgress(progressBar, 0); // Reset progress bar

    // Simulate progress while waiting for the backend
    const progressInterval = setInterval(() => {
        const currentWidth = parseInt(progressBar.style.width);
        if (currentWidth < 90) {
            updateProgress(progressBar, currentWidth + 10);
        }
    }, 500);

    // Send a POST request to the backend
    fetch('/nmap', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ target: target })
    })
    .then(response => response.json())
    .then(data => {
        clearInterval(progressInterval);
        updateProgress(progressBar, 100);

        if (data.error) {
            alert(data.error);
            return;
        }

        // Update scan results in the table
        updateScanResult(target, data);
    })
    .catch(error => {
        clearInterval(progressInterval);
        alert('Error: ' + error.message);
    });
}

// Function to add a row for each target being scanned
function addScanRow(target) {
    const resultsBody = document.getElementById('resultsBody');
    const row = document.createElement('tr');
    row.id = `row-${target}`;

    row.innerHTML = `
        <td>${target}</td>
        <td id="status-${target}">Scanning...</td>
        <td id="ports-${target}">-</td>
        <td>
            <div class="progress-container">
                <div id="progress-bar-${target}" class="progress-bar">0%</div>
            </div>
        </td>
        <td><button class="rescan-btn" onclick="rescan('${target}')">Rescan</button></td>
    `;
    resultsBody.appendChild(row);
}

// Function to update the scan result in the row
function updateScanResult(target, data) {
    const statusElement = document.getElementById(`status-${target}`);
    const portsElement = document.getElementById(`ports-${target}`);

    if (data[target]) {
        const hostData = data[target];
        const ports = hostData.ports || [];
        const portsList = ports.map(port => {
            return `${port.portid}/${port.protocol} (${port.state}) - ${port.service}`;
        }).join(', ');

        statusElement.innerHTML = hostData.status;
        portsElement.innerHTML = portsList || 'No open ports found';
    } else {
        statusElement.innerHTML = 'No data available';
        portsElement.innerHTML = '-';
    }
}

// Function to update the progress bar
function updateProgress(progressBar, percentage) {
    progressBar.style.width = percentage + '%';
    progressBar.innerHTML = percentage + '%';
}

// Function to rescan an individual target
function rescan(target) {
    document.getElementById(`status-${target}`).innerHTML = 'Rescanning...';
    document.getElementById(`ports-${target}`).innerHTML = '-';
    runNmapScan(target); // Use the same scan function to rescan the target
}
