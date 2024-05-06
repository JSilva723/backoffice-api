## Start
1 - Up docker-db with config of this proyect (See DATABASE_URL)
2 - Copi env file
```sh
cp .env.example .env
```
3 - Install dependencies 
```sh
npm install
```
4 - Run migrations
```sh
npx prisma migrate dev
```
5 - Up dev mode
```sh
npm run dev
```
## Create user
```sh
node bin/index.mjs username password
```
Up prisma studio
```sh
npx prisma studio
```
# Requriments 
node v18
docker