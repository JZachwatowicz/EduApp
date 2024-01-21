Odpalenie konenera z frontu:
- zbudowanie obrazu: `docker build -t eduapp-front:test . `
- uruchomienie: `docker run -itd --rm --name eduapp-front -p 127.0.0.1:3000:3000 eduapp-front:test`

Odpalenie kontenera backendu:
- zbudowanie obrazu: `docker build -t eduapp-back:test .`
- uruchomieni: `docker run -itd --rm --name eduapp-back -p 127.0.0.1:80:80 eduapp-back:test`