## Main Objective

To provide a centralized resource management tool that provides a low latency
container management system, cluster matrics gathering, resiliency management,
and finally provide the optimal microservice deployment strategy.

## Main Research Question

## Individual Research Questions

1. How effective is the proposed optimization model compared to current optimization models?
2. How monitor and structure pod-level and app-level matrics to determine optimal deployment strategy?
3. Can the current container management system reduce the network overhead added to the Kubernetes cluster?
4. How to maintain resiliency in optimal microservice deployment?

## Individual Objectives

### IT19132310 Hettiarachchi L.S.

- Create a centrality analysis layer to identify the importance of a particular service to the cluster using approaches such as centrality analysis.
- Develop an algorithm that predicts the load of the microservice through the time series data queried from the cluster.
- Identify the important factors associated with the performance bottlenecks in the microservice-based cluster.
- Facilitate the development of an autoscaling policy taking the optimal deployment strategy into account.
- Evaluate the effectiveness of the proposed deployment strategy of the optimization server compared to the existing strategy.

### IT19139036 Jayadeva A. S. V.

- Configure Kubernetes Cluster
- Configure Istio, Prometheus, Graphana, Kiali in the Kubernetes cluster
- Get the time series metrics of the microservices and nodes from the above, open-source tools
- Implement a way to structure those gathered metrics properly and send them to a persistence database and exposed through an API

### IT19104218 Bandara G.B.M.A.G.R.A.V.

- Create a namespace inside the Kubernetes cluster & implement the server
- Develop a script to fetch the latest code from the repository
- Analyze the Dockerfile and record required base images to build the container image
- Store the container images metadata inside the database
- Store built container images inside the Fast-Provider storage server
- Implement Kubernetes deployment configuration that use the Fast-Provider machanism

### IT19120980 Palliyaguruge D.N.

- Gathers system data through Datadog
- Build a monitoring server
- Provide a resilience management system to handles the failures of the system

## Other Information

### Technologies

- Docker Hub
- Kubernetes
- Azure Kubernetes Server (AKS)
- Azure Container Registry (ACR)
- Grafana
- Prometheus
- Kiali
- Istio Service Mesh
- Jupyter Notebook
- Numpy
- TenserFlow
- Anaconda
- Datadog
- Chaos Monkey
- Chaos Toolkit

### Programming Languages

- Golang (Go)
- Python
- Node JS
- Java

### Libraries & Frameworks

- React
- Spring Boot
- Express
