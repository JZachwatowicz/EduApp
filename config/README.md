# Uruchomienie 
`./start.sh`

# Buodowanie obrazów:
`docker build -t cupofraccoons/eduapp-front:{wersja} ../frontend`
`docker build -t cupofraccoons/eduapp-back:{wersja} ../backend`

# Pushowanie
`docker push cupofraccoons/eduapp-front:{wersja}`
`docker push cupofraccoons/eduapp-back:{wersja}`

# Aktualizacja deploymentów:
W pliku **deployments.yaml** trzeba zmienić wersję image i następnie odpalić:
`./start.sh`
