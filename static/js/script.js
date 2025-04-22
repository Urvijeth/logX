const logData = [
  { time: '12:06:24', ip: '192.0.2.124', status: 'Fail', action: 'Blocked' },
  { time: '12:06:20', ip: '198.51.100.52', status: 'Success', action: 'Success' },
  { time: '12:06:20', ip: '192.0.2.124', status: 'Fail', action: 'Blocked' },
  { time: '12:06:20', ip: '192.0.2.12', status: 'Success', action: 'Success' }, // Corrected IP
  { time: '12:05:07', ip: '192.0.2.124', status: 'Blocked', action: 'Blocked' },
  { time: '12:06:07', ip: '198.51.100.52', status: 'Success', action: 'Blocked' },
];

const tbody = document.getElementById("log-table");

logData.forEach(entry => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td class='p-3'>${entry.time}</td>
    <td class='p-3'>${entry.ip}</td>
    <td class='p-3'><span class="${getStatusClass(entry.status)}">${entry.status}</span></td>
    <td class='p-3'>${entry.action}</td>
  `;
  tbody.appendChild(row);
});

function getStatusClass(status) {
  if (status === 'Fail') return 'status-fail';
  if (status === 'Success') return 'status-success';
  return 'status-blocked';
}

function blockIp() {
  const ip = document.getElementById("block-ip").value;
  alert(`Block IP submitted: ${ip}`);
}

function setEmailAlert() {
  const email = document.getElementById("email-alert").value;
  alert(`Email alert set for: ${email}`);
}