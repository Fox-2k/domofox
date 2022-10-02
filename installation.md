# Installation procedure from a fresh Raspberry pi linux OS

1. Install the last Linux Debian 11 for Raspberry pi from [https://www.raspberrypi.com/software/operating-systems/](https://www.raspberrypi.com/software/operating-systems/). You can download **Raspberry Pi OS Lite** 32 bits
2. Create a new user with your own password
3. Change the host to `domofox`
4. update packages
```
sudo apt-get update
sudo apt-get upgrade
```
5. Install other required packages
```
sudo apt-get install git xserver-xorg xinit openbox chromium-browser x11-vnc
```

You can now follow the steps below.


# Install nodeJs v16

```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

# Clone the project
```
cd /opt
sudo mkdir domofox
sudo chown <yourUserName>:<yourUserName> domofox
cd domofox
git clone git@gitlab.com:Fox2k/domofox.git .
```

# Create the API service
This is the back side of Domofox, it manage all the thermostat logic and provide a web access to the front side.

```
sudo ln -s /opt/domofox/linux/domofox.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl start domofox
sudo systemctl enable domofox
```

# Create the regulation service and timer
This service and timer enable your installation to periodically launch the temperature regulation

```
sudo ln -s /opt/domofox/linux/domofox-regulate.service /etc/systemd/system
sudo ln -s /opt/domofox/linux/domofox-regulate.timer /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl start domofox-regulate.timer
sudo systemctl enable domofox-regulate.timer
```

# Create the archive service and timer
This service and timer enable your installation to periodically archive the setpoint, the temperature and the heater state

```
sudo ln -s /opt/domofox/linux/domofox-archive.service /etc/systemd/system
sudo ln -s /opt/domofox/linux/domofox-archive.timer /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl start domofox-archive.timer
sudo systemctl enable domofox-archive.timer
```

# Build the vueJS app
This is the front side, the human interface to control Domofox.

```
cd /opt/domofox/client
npm run build
```
The app production version is now created at `/opt/domofox/client/dist`

Check the config file `/opt/domofox/client/dist/config/config.json` if you want to customize somme settings


# Install Nginx server

```
sudo apt install -y nginx
```

Create the configuration file below in `/etc/nginx/sites-available/domofox`

```
##
#
# Domofox web interface configuration
#
##

server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /opt/domofox/client/dist;

        index index.html;

        server_name _;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
}
```
Disable default config and enable this one.
```
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/domofox /etc/nginx/sites-enabled
sudo systemctl reload nginx
```


# Create the system D target to launch only chromium when booting

```
sudo chmod +x /opt/domofox/linux/domofox-browser.sh

sudo ln -s /opt/domofox/linux/domofox-browser.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable domofox-browser.service
```
