#Frontend
npm start

#Auth Service
npm run server

#Kube Server
pm2 start index.js --name kube-server

#Matrics Server
pm2 start server.js --name matrics-server

#Monitoring Main Server
npm run server

#Monitoring Server (Sub Service)
pm2 start index.js --name monitoring-server

#Monitoring Server CronJob (Sub Service)
pm2 start index.js --name monitoring-server-cron-job

#Optimize Server
uvicorn app.main:app --reload

#NodeJs Server
pm2 start index.js --name nodejs-server

#Cluster Service
npm run server

#Enable Istio
curl -sL https://istio.io/downloadIstioctl | sh -
export PATH=$HOME/.istioctl/bin:$PATH
istioctl dashboard prometheus