# Installation procedure from a fresh Raspberry pi linux OS

1. Install the last Linux Debian 11 for Raspberry pi from [https://www.raspberrypi.com/software/operating-systems/](https://www.raspberrypi.com/software/operating-systems/)
2. Change the host to `domofox`
3. Change the default password for pi
4. Create a new user (mentionned below as `<user-name>`) with your own password
5. Ensure your user is a sudoer

You can now follow the steps below.


# Install nodeJs v16

```
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

# Clone the project
```
cd ~
git clone git@gitlab.com:Fox2k/domofox.git
```

# Create the API service
This is the back side of Domofox, it manage all the thermostat logic and provide a web access to the front side.

```
sudo ln -s /home/<user-name>/domofox/linux/domofox.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl start domofox
sudo systemctl enable domofox
```

# Create the regulation service and timer
This service and timer enable your installation to periodically launch the temperature regulation

```
sudo ln -s /home/<user-name>/domofox/linux/domofox-regulate.service /etc/systemd/system
sudo ln -s /home/<user-name>/domofox/linux/domofox-regulate.timer /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl start domofox-regulate.timer
sudo systemctl enable domofox-regulate.timer
```

# Create the archive service and timer
This service and timer enable your installation to periodically archive the setpoint, the temperature and the heater state

```
sudo ln -s /home/<user-name>/domofox/linux/domofox-archive.service /etc/systemd/system
sudo ln -s /home/<user-name>/domofox/linux/domofox-archive.timer /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl start domofox-archive.timer
sudo systemctl enable domofox-archive.timer
```

# Build the vueJS app
This is the front side, the human interface to control Domofox.

```
cd /home/<user-name>/domofox/client
npm run build
```
The app production version is now created at `/home/<user-name>/domofox/client/dist`

Check the config file `/home/<user-name>/domofox/client/dist/config/config.json` if you want to customize somme settings


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

        root /home/<user-name>/domofox/client/dist;

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
sudo apt install unclutter
sudo systemctl set-default multi-user.target
sudo chmod +x /home/<user-name>/domofox/linux/domofox-browser.sh

sudo ln -s /home/<user-name>/domofox/linux/domofox-browser.service /etc/systemd/system
sudo systemctl daemon-reload
sudo systemctl enable domofox-browser.service
```