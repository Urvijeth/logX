function fetchLogs() {
  fetch('/logs')
    .then(res => res.json())
    .then(data => {
      document.getElementById('log-output').textContent = data.join('\n');
    });
}

function fetchFailedLogins() {
  fetch('/failed-logins')
    .then(res => res.json())
    .then(data => {
      document.getElementById('fail-count').textContent = data.total;
    });
}

function fetchTopIPs() {
  fetch('/top-ips')
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById('top-ips');
      ul.innerHTML = '';
      data.forEach(([ip, count]) => {
        const li = document.createElement('li');
        li.textContent = `${ip} (${count} attempts)`;
        ul.appendChild(li);
      });
    });
}

function blockIP() {
  const ip = document.getElementById('block-ip-input').value;
  fetch('/block-ip', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ip })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.status === 'blocked' ? `Blocked IP: ${data.ip}` : 'Error');
    });
}

// Auto-refresh
setInterval(() => {
  fetchLogs();
  fetchFailedLogins();
  fetchTopIPs();
}, 3000);

// Initial fetch
document.addEventListener('DOMContentLoaded', () => {
  fetchLogs();
  fetchFailedLogins();
  fetchTopIPs();
});
