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

#Optimize Server
uvicorn app.main:app --reload

#NodeJs Server
npm run dev

#Cluster Service
npm run server

#Enable Istio
curl -sL https://istio.io/downloadIstioctl | sh -
export PATH=$HOME/.istioctl/bin:$PATH
istioctl dashboard prometheus