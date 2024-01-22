# Uruchomienie 
`./start.sh`

# Buodowanie obrazów:
`docker build -t cupofraccoons/eduapp-front:{wersja} ../front`
`docker build -t cupofraccoons/eduapp-back:{wersja} ../back`

# Pushowanie
`docker push cupofraccoons/eduapp-front:{wersja}`
`docker push cupofraccoons/eduapp-back:{wersja}`

# Aktualiacja deploymentów:
W pliku **deployments.yaml** trzeba zmienić wersję image i następnie odpalić:
`./start.sh`
