#!/bin/bash
apt-get update

apt-get install ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Install Docker
echo "🐋 Installing Docker..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update
apt-get install docker-ce docker-ce-cli containerd.io

apt-get install docker-ce=20.10.14 docker-ce-cli=20.10.14 containerd.io
groupadd docker
usermod -aG docker $USER
newgrp docker
chmod 666 /var/run/docker.sock
docker run hello-world

# Install Docker Compose
echo "🐋 Install Docker Compose..."
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
docker-compose --version

# Install Go 
echo "✨ Installing Go..."
curl -O https://storage.googleapis.com/golang/go1.18.1.linux-amd64.tar.gz
tar -xvf go1.18.1.linux-amd64.tar.gz
sudo mv go /usr/local
go version
rm -rf go
rm -rf go1.18.1.linux-amd64.tar.gz
export GOPATH=$HOME/work
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin

# Install Node JS
echo "✨ Installing Node JS..."
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
apt install -y nodejs
node -v
npm -v

# Install Yarn
echo "✨ Installing Yarn..."
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt-get update
apt-get install yarn
yarn -v

# Install Nginx
echo "✨ Installing Nginx..."
apt update
apt install  nginx
ufw app list
ufw allow 'Nginx HTTP'
ufw status
systemctl status nginx
PUBLIC_IP_ADDRESS=$(curl -4 icanhazip.com)
http://$PUBLIC_IP_ADDRESS
