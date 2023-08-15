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
# Build the NextJS app
This is the web server which will serve the front side, the human interface to control Domofox.

```
cd /opt/domofox/react
npm install --omit=optional # see note below
npm run build
```
About the `--omit=optional` : Because we are about to build the NextJS application, we need to install de dev dependencies. Doing that may also install Cypress which may not desired for a production installation, especially if your are installing Domofox to a Raspberry pi, where Cypress is not supported. That's why Cypress was placed as an optional dependencie you can now omit for the production installation.

# Create the NextJS service
This service enable our NextJS application to launch automatically

```
sudo ln -s /opt/domofox/linux/domofox-nextjs.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl start domofox-nextjs
sudo systemctl enable domofox-nextjs
```

# Create the system D target to launch only chromium when booting

```
sudo chmod +x /opt/domofox/linux/domofox-browser.sh

sudo ln -s /opt/domofox/linux/domofox-browser.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable domofox-browser.service
```
