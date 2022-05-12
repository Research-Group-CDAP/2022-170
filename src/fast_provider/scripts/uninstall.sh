#!/bin/bash

# Uninstall Docker
dpkg -l | grep -i docker

apt-get purge -y docker-engine docker docker.io docker-ce docker-ce-cli
apt-get autoremove -y --purge docker-engine docker docker.io docker-ce 

rm -rf /var/lib/docker /etc/docker
rm /etc/apparmor.d/docker
groupdel docker
rm -rf /var/run/docker.sock

# Uninstall Docker Compose
rm /usr/local/bin/docker-compose

# Uninstall Go
apt-get uninstall purge golang*
apt-get update
rm -rf /usr/bin/go
unset GOPATH
unset PATH

# Uninstall Node JS
apt-get remove nodejs
apt-get remove npm
apt-get update 

# Uninstall Yarn
apt-get remove yarn
apt-get purge yarn

# Uninstall Nginx
apt-get purge nginx nginx-common
