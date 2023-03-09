const express = require('express')
const UserController = require('./controllers/user.controller')
const ProductController = require('./controllers/product.controller')

const userController = new UserController()
const productController = new ProductController()

const app = express()
app.use(express.json())

const port = 3000


app.get('/user', userController.getAll)
app.get('/user/:id', userController.findOne)
app.post('/user', userController.create)
app.put('/user/:id', userController.update)
app.patch('/user/:id', userController.patch)
app.delete('/user/:id', userController.delete)

app.get('/product', productController.getAll)
app.get('/product/:id', productController.findOne)
app.post('/product', productController.create)
app.put('/product/:id', productController.update)
app.patch('/product/:id', productController.patch)
app.delete('/product/:id', productController.delete)

app.listen(port, () => {
    console.log(`Servidor está rodando em
     http://localhost:${port}`)
})