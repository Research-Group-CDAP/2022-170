PM2 Process Management Quick Start
-----------------------------------------------------------
PM2 is a daemon process manager that will help you manage and keep your application online. Getting started with PM2 is straightforward, it is offered as a simple and intuitive CLI, installable via NPM.

https://pm2.keymetrics.io/docs/usage/quick-start/

Global Install 
npm install pm2@latest -g

To Run 
pm2 start index.js --name kube-server
pm2 start server.js --name matrics-server
pm2 start index.js --name monitoring-server

To Stop
pm2 stop kube-server
pm2 stop matrics-server
pm2 stop monitoring-server

To Restart
pm2 restart kube-server
pm2 restart matrics-server
pm2 restart monitoring-server

How Kill Running Nodejs port
------------------------------------
lsof -i :4001 
kill -9 53096