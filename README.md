# [Listit Backend](backend-listit.herokuapp.com) v1.0.0
Listit Backend is responsible to provide json data to function list items app.

### Post Request

Create New Employee:
```sh
$ curl -X POST -d '{"email":"sakib3@gmail.com","password":"123456"}' http://localhost:3000/api/v1/employees/ --header "Content-Type:application/json"
```
Employee Login:
```sh
$ curl -X POST -d '{"email":"sakib3@gmail.com","password":"123456"}' http://localhost:3000/employees/login --header "Content-Type:application/json"
```
Get Employees:
```sh
$ curl -H "content-type:application/json" -H "x-access-token:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NzFhYmUyMTgzMGNjMWRjMGZhNDRmYTIiLCJleHAiOjE0Njk5ODY1OTg1NDZ9.Jqo_2JU7G5PkdpMl0zssP4Ej1ZjXUw1jcAplMr8l86c" -X POST http://localhost:3000/api/employees/
```
Create New Product:
```sh
$ curl -X POST -d '{"name":"milk","family":"liquid"}' http://localhost:3000/api/v1/products/ --header "Content-Type:application/json"
```
Create New Workplace:
```sh
$ curl -X POST -d '{"name":"Tinbjerg","city_name":"Copenhagen","post_code":"2700"}' http://localhost:3000/api/v1/workplaces/ --header "Content-Type:application/json"
```
### Created by
[Sabbir Rahman Sakib]()
