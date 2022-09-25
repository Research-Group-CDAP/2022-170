## Matrics Server

Login to Azure
---------------------------------------------------------------------------------------
1) az login
2) az aks get-credentials --resource-group ResearchGroup --name ResearchCluster
az aks get-credentials --resource-group ResearchGroup --name ResearchClus
3) kubectl get nodes

Install Istio
---------------------------------------------------------------------------------------
4) istioctl install --set profile=demo -y
5) kubectl label namespace default istio-injection=enabled

Deploy Microservice Applications
---------------------------------------------------------------------------------------
6) kubectl apply -f Kubernetes-manifests.yaml
7) kubectl get service --watch
8) kubectl get pods

Inject Istio Configurations
---------------------------------------------------------------------------------------
9) kubectl apply -f release/istio-manifests.yaml
10) istioctl analyze
11) kubectl apply -f samples/addons
12) istioctl dashboard kiali
13) istioctl dashboard grafana
14) istioctl dashboard prometheus

curl 'http://localhost:9090/api/v1/query?query=up&time=2022-04-25T21:10:51.781Z'
http://localhost:9090/api/v1/query_exemplars?query=test_exemplar_metric_total&start=2022-04-25T21:10:25.479Z&end=2022-04-25T21:14:25.479Z
http://localhost:9090/api/v1/query_exemplars?query=test_exemplar_metric_total&start=2020-09-14T15:22:25.479Z&end=2020-09-14T15:23:25.479Z
$ curl 'http://localhost:9090/api/v1/query_range?query=up&start=2022-04-25T21:10:25.479Z&end=2022-04-25T21:14:25.479Z&step=15s'
$ curl 'http://localhost:9090/api/v1/query_range?query=up&start=2015-07-01T20:10:30.781Z&end=2015-07-01T20:11:00.781Z&step=15s'

curl -s \
    -u $login \
    --data-urlencode "query=container_cpu_cfs_periods_total" \
    --data-urlencode "time=2022-04-25T21:14:25.479Z" \
    http://localhost:9090/api/v1/query \
| jq -c ".data.result[].metric"

curl -s \ -u $login \ --data-urlencode "query=container_cpu_cfs_periods_total" \ --data-urlencode "time=2022-04-25T21:14:25.479Z" \ http://localhost:9090/api/v1/query \ | jq -c ".data.result[].metric"