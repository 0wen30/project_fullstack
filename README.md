## POST http://localhost:3000/user/signup

### body

{
"name":"jose",
"lastname":"angel",
"email":"user@mail.com",
"password":"password"
}

## POST http://localhost:3000/user/signin

### body

{
"email":"user@mail.com",
"password":"password"
}

## GET http://localhost:3000/refresh

### headers

Accept:application/json
token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjZkNTM0M2FjNzFkMmYzNjE3ZmRjNSIsImlhdCI6MTY2MDM0NDM3NywiZXhwIjoxNjYwMzQ0Njc3fQ.xX8kkHZ6quI-E6ErDCogjBdb8XvS97KwTiwGijpSa_s

## POST http://localhost:3000/teams/createteam

### body

{
"name":"santos",
"manager":"62f6d5343ac71d2f3617fdc5"
}

### headers

Accept:application/json
token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjZkNTM0M2FjNzFkMmYzNjE3ZmRjNSIsImlhdCI6MTY2MDM0NDM3NywiZXhwIjoxNjYwMzQ0Njc3fQ.xX8kkHZ6quI-E6ErDCogjBdb8XvS97KwTiwGijpSa_s

## GET http://localhost:3000/teams/getAll

### headers

Accept:application/json
token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjZkNTM0M2FjNzFkMmYzNjE3ZmRjNSIsImlhdCI6MTY2MDM0NDM3NywiZXhwIjoxNjYwMzQ0Njc3fQ.xX8kkHZ6quI-E6ErDCogjBdb8XvS97KwTiwGijpSa_s



