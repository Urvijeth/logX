# logX
log moinitor 2025/apr/26 end date may 1st week 

# Squid Proxy Setup on Fedora for HTTP/HTTPS Activity Logging

This guide explains how to install and configure the **Squid proxy server** on a Fedora system to log web browsing activity (HTTP and HTTPS) in real time. The logs are stored in a custom directory.

## 📋 Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Set Custom Log Directory](#set-custom-log-directory)
- [Browser Proxy Configuration](#browser-proxy-configuration)
- [View Real-Time Logs](#view-real-time-logs)
- [Optional: HTTPS Interception](#optional-https-interception)
- [Troubleshooting](#troubleshooting)

---

## Requirements

- Fedora Linux system (tested on Fedora 39+)
- Root or `sudo` access
- Internet connection

---

##  Installation

1. **Install Squid:**

   ```bash
   sudo dnf install squid -y

2. **Enable and Start Squid:** 
    sudo systemctl enable --now squid

3. **Check the Status:** 
    sudo systemctl status squid


    

