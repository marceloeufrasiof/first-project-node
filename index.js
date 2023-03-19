const express = require('express')
const uuid = require('uuid')

const app = express()
const port = 3000
app.use(express.json())
/* 
    - Query params => meusite.com/users?nome=rodolfo&age=28 // FILTROS
    - Route params => /users/2    // BUSCAR, ATUALIZAR OU DELETAR ALGO ESPECÍFICO
    - Request body => {"name": "Rodolfo", "age":}

    - GET           => Buscar informação do back-end
    - POST          => Criar informação no back-end
    - PUT / PATCH   => Alterar/Atualizar informação no back-end
    - DELETE        => Deletar informação no back-end

    - Middleware    => INTERCEPTADOR => Tem o poder de parar ou alterar dados de requisição
*/

const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({message: "User not found"})
    }

    request.userId = id
    request.userIndex = index

    next()
}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const {name, age} = request.body

    const user = {id: uuid.v4(), name: name, age: age}

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const id = request.userId
    const index = request.userIndex

    const {name, age} = request.body

    const updatedUser = {id: id, name: name, age: age}

    users[index] = updatedUser

    return response.status(201).json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.findIndex

    users.splice(index,1)

    return response.status(204).json()
})

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})