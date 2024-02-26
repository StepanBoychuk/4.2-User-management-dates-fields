This is my REST API for User managment. It have several endpoints:

On
>GET api/users

will return list of all users.This endpoint has two query parameters such as **page**(by default is set to 0) and **amount**(by default is set to 3)

>GET api/users/:id

will return profile of user with this id.

>POST /api/users
will signup user with data from request body. Request body should have

**nickname** (required), **firstName**, **lastName** and **password**(required) fields.

>PUT /api/users/:id

will change fields of registered user. Require **username/password** of this user with BasicAuth. Change the passing fields from request body.

>DEL /api/users/:id

will soft delete user with this id. Require **username/password** of this user with BasicAuth.