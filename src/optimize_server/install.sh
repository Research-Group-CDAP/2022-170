#!/bin/bash
apt-get update
apt-get -y upgrade
apt install python3.8
apt-get install python3-pip
apt install python3.8-venv
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt