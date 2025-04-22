window.onload = function() {
  const logData = [
    { time: '12:06:24', ip: '192.0.2.124', status: 'Fail', action: 'Blocked' },
    { time: '12:06:20', ip: '198.51.100.52', status: 'Success', action: 'Success' },
    { time: '12:06:20', ip: '192.0.2.124', status: 'Fail', action: 'Blocked' },
    { time: '12:06:20', ip: '192.0.2.12', status: 'Success', action: 'Success' },
    { time: '12:05:07', ip: '192.0.2.124', status: 'Blocked', action: 'Blocked' },
    { time: '12:06:07', ip: '198.51.100.52', status: 'Success', action: 'Blocked' },
  ];

  const tbody = document.getElementById("log-table");

  logData.forEach(entry => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.time}</td>
      <td>${entry.ip}</td>
      <td><span class="${getStatusClass(entry.status)}">${entry.status}</span></td>
      <td>${entry.action}</td>
    `;
    tbody.appendChild(row);
  });

  function getStatusClass(status) {
    if (status === 'Fail') return 'status-fail';
    if (status === 'Success') return 'status-success';
    return 'status-blocked';
  }
}
