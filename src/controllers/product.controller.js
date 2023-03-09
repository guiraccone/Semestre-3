const { Product } = require('../models')

module.exports = class ProductController {
    async getAll(request, response) {
        const products = await Product.findAll()

        response.json({
            products
        })
    }

    async findOne(request, response) {
        const product = await Product.findByPk(
            Number(request.params.id)
        )

        if (!product) {
            response.statusCode = 404
            response.json({
                error: "Produto não encontrado!"
            })
            return
        }

        response.json(product)
    }

    async create(request, response) {
        const name = request.body.name
        const price = Number(request.body.price)
        const imageUrl = request.body.imageUrl

        if(!name){
            response.statusCode = 400
            response.json({
                error: "Nome inválido!"
            })
            return
        }


        if (isNaN(price)) {
            response.statusCode = 400
            response.json({
                error: "Valor do preço inválido, deve ser um número real!"
            })
            return
        }

        const product = await Product.create({
            name,
            price,
            imageUrl
        })

        response.json(product)
    }

    async update(request, response) {
        const name = request.body.name
        const price = Number(request.body.price)
        const imageUrl = request.body.imageUrl  


        if (!isNameValid) {
            response.statusCode = 400
            response.json({
                error: "Nome do produto inválido! O nome do produto precisa ter no mínimo 3 caracteres."
            })
            return
        }

        if (isNaN(price)) {
            response.statusCode = 400
            response.json({
                error: "Valor do preço precisa ser um número!"
            })
            return
        }

        const updatedProduct = await Product.update({
            name: request.body.name,
            price: request.body.price,
            imageUrl: request.body.imageUrl,
        }, {
            where: {
                id: Number(request.params.id)
            }
        })

        response.json(updatedProduct)
    }

    async patch(request, response) {
        const name = request.body.name
        const price = Number(request.body.price)
        const imageUrl = request.body.imageUrl

        if (price !== undefined && price !== null && isNaN(price)) {
            response.statusCode = 400
            response.json({
                error: "Valor do preço precisa ser um número!"
            })
            return
        }

        const updatedProduct = await Product.update(request.body, {
            where: {
                id: Number(request.params.id)
            }
        })

        response.json(updatedProduct)
    }

    async delete(request, response) {
        const product = await Product.findByPk(
            Number(request.params.id)
        )

        if (!product) {
            response.statusCode = 404
            response.json({
                error: "Produto não encontrado!"
            })
            return
        }

        await Product.destroy({
            where: {
                id: Number(request.params.id)
            }
        })
        response.statusCode = 204
        response.end
    }
}