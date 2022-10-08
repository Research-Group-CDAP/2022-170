### Remove `<none>` images
```
docker rmi $(docker images --filter "dangling=true" -q --no-trunc)
```
### Remove all stopped containers
```
docker rm -f $(docker ps -a -q)
```