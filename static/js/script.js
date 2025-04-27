window.onload = function() {
  fetchLogs(); // Load immediately
  setInterval(fetchLogs, 5000); // Refresh every 5 seconds
}

function fetchLogs() {
  fetch('/get_logs')
  .then(response => response.json())
  .then(data => {
      const tbody = document.getElementById("log-table");
      tbody.innerHTML = ""; // Clear old data

      let loginFailures = 0;
      let newLogs = data.length;
      let blocked = 0;

      data.forEach(entry => {
          const row = document.createElement("tr");
          row.innerHTML = `
              <td>${entry.time}</td>
              <td>${entry.ip}</td>
              <td><span class="${getStatusClass(entry.status)}">${entry.status}</span></td>
              <td>${entry.action}</td>
          `;
          tbody.appendChild(row);

          if (entry.status === "Fail") loginFailures++;
          if (entry.action === "Blocked") blocked++;
      });

      // Update Stat Cards
      document.getElementById("login-failures").innerText = loginFailures;
      document.getElementById("new-logs").innerText = newLogs;
      document.getElementById("blocked-ips").innerText = blocked;
      document.getElementById("alerts-triggered").innerText = blocked; // example
  });
}

function getStatusClass(status) {
  if (status === 'Fail') return 'status-fail';
  if (status === 'Success') return 'status-success';
  return 'status-blocked';
}

function submitBlockIP() {
  const ip = document.getElementById("block-ip").value;
  if (!ip) return;

  fetch('/block_ip', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ip })
  }).then(response => response.json())
  .then(data => {
      alert(data.message);
      document.getElementById("block-ip").value = "";
  });
}

function submitEmailAlert() {
  const email = document.getElementById("email-alert").value;
  if (!email) return;

  fetch('/set_email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
  }).then(response => response.json())
  .then(data => {
      alert(data.message);
      document.getElementById("email-alert").value = "";
  });
}
