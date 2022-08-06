#!/bin/bash

# Rotate screen touch (Raspberry pi 4 with official Raspberry pi screen)
DISPLAY=:0 sudo xinput --set-prop 'raspberrypi-ts' 'Coordinate Transformation Matrix' 0 1 0 -1 0 1 0 0 1

# Enable screen saver (after 60sec)
xset dpms 0 0 60 

# Hide mouse
unclutter -idle 0.1 &

# Window manager
x-window-manager &

# Start Vnc Server
#logger -t startbrowser 'Start VNC Server...'
#x11vnc -bg -forever -passwdfile /home/yoann/domofox/linux/vncpasswd > /dev/null

echo "Wait 2 secs ..."
sleep 2

# Clean some configs file to prevent some undesired warning popups while launching Chromium
# sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
# sed -i 's/"exit_type":"Crashed"/"exit_type":"None"/' /home/pi/.config/chromium/Default/Preferences
# rm /home/pi/.config/chromium/Singleton*

# Launch Chromium
su -c "chromium-browser --proxy-auto-detect --disk-cache-dir=/dev/null --media-cache-dir=/dev/null --disable-notifications --no-default-browser-check --disable-pinch --allow-insecure-localhost --disable-extensions --disable-background-networking --disable-device-discovery-notifications --disable-component-update --disable-component-extensions-with-background-pages --disable-default-apps --remote-debugging-port=9222 --user-data-dir=remote-profile --kiosk $1" -s /bin/sh yoann
#su -c "chromium-browser --proxy-auto-detect --disk-cache-dir=/dev/null --media-cache-dir=/dev/null --disable-notifications --no-default-browser-check --start-fullscreen --allow-insecure-localhost --disable-extensions --disable-background-networking --disable-device-discovery-notifications --disable-component-update --disable-component-extensions-with-background-pages --disable-default-apps --enable-logging --v=1 --remote-debugging-port=9222 --user-data-dir=remote-profile --app=$1" -s /bin/sh pi
