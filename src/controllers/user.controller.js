const { User } = require('../models')
const UserService = require('../services/user.service')
const bcrypt = require('bcrypt')

const userService = new UserService()



module.exports = class UserController {

//------------------------------------------------------------------------------------- METODO GET (ALL)

    async getAll(request, response) {
        const users = await User.findAll()

        response.json({
            users
        })
    }

//------------------------------------------------------------------------------------- METODO GET (ByID)


    async findOne(request, response) {
        const user = await User.findByPk(
            Number(request.params.id)
        )

        if (!user) {
            response.statusCode = 404
            response.json({
                error: "Usuário não encontrado!"
            })
            return
        }

        response.json(user)
    }

//------------------------------------------------------------------------------------- METODO POST


    async create(request, response) {
        const name = request.body.name
        const age = Number(request.body.age)
        const cpf = request.body.cpf
        const phoneNumber = request.body.phoneNumber
        const birthDate = request.body.birthDate
        const password = request.body.password
        const email = request.body.email

        const isNameValid = userService.isNameValid(name)

        if (!isNameValid) {
            response.statusCode = 400
            response.json({
                error: "Nome de usuário inválido! O nome de usuário precisa ser um nome composto."
            })
            return
        }

        if (isNaN(age)) {
            response.statusCode = 400
            response.json({
                error: "Valor da idade precisa ser um número!"
            })
            return
        }

        if (cpf.length > 11 || cpf.length < 11) {
            response.statusCode = 400
            response.json({
                error: "CPF digitado inválido."
            })
            return
        }

        if (birthDate.length > 10) {
            response.statusCode = 400
            response.json({
                error: "Data muito longa!"
            })
            return
        }

        const isEmailValid = userService.isEmailValid(email)

        if (!isEmailValid) {
            response.statusCode = 400
            response.json({
                error: "Email inválido!"
            })
            return
        }

        const saltRounds = 10
        const hash = await bcrypt.hash(password, saltRounds)

        const user = await User.create({
            name,
            age,
            cpf,
            phoneNumber,
            birthDate,
            password: hash,
            email
        })

        response.json(user)
    }

//------------------------------------------------------------------------------------- METODO PUT

    async update(request, response) {
        const name = request.body.name
        const age = Number(request.body.age)
        const cpf = request.body.cpf
        const phoneNumber = request.body.phoneNumber
        const birthDate = request.body.birthDate
        const password = request.body.password
        const email = request.body.email

        const isNameValid = userService.isNameValid(name)

        if (!isNameValid) {
            response.statusCode = 400
            response.json({
                error: "Nome de usuário inválido! O nome de usuário precisa ser um nome composto."
            })
            return
        }

        if (isNaN(age)) {
            response.statusCode = 400
            response.json({
                error: "Valor da idade precisa ser um número!"
            })
            return
        }

        if (birthDate.length > 10) {
            response.statusCode = 400
            response.json({
                error: "Data muito longa!"
            })
            return
        }

        const isEmailValid = userService.isEmailValid(email)

        if (!isEmailValid) {
            response.statusCode = 400
            response.json({
                error: "Email inválido!"
            })
            return
        }

        // Verifica se a senha foi enviada na solicitação
        if (request.body.password) {
            // Criptografa a senha
            const saltRounds = 10
            const hash = await bcrypt.hash(request.body.password, saltRounds)

            // Atualiza o usuário com a senha criptografada
            const updatedUser = await User.update({
                name: request.body.name,
                age: request.body.age,
                cpf: request.body.cpf,
                phoneNumber: request.body.phoneNumber,
                birthDate: request.body.birthDate,
                password: hash,
                email: request.body.email
            }, {
                where: {
                    id: Number(request.params.id)
                }
            })

            response.json(updatedUser)
        } else {
            // Atualiza o usuário sem modificar a senha
            const updatedUser = await User.update({
                name: request.body.name,
                age: request.body.age,
                cpf: request.body.cpf,
                phoneNumber: request.body.phoneNumber,
                birthDate: request.body.birthDate,
                email: request.body.email
            }, {
                where: {
                    id: Number(request.params.id)
                }
            })

            response.json(updatedUser)
        }
    }

//------------------------------------------------------------------------------------- METODO PATCH


    async patch(request, response) {
        const name = request.body.name
        const rawAge = request.body.age
        const age = Number(rawAge)
        const cpf = request.body.cpf
        const phoneNumber = request.body.phoneNumber
        const birthDate = request.body.birthDate
        const password = request.body.password
        const email = request.body.email

        const isNameValid = name
            ? userService.isNameValid(name)
            : true

        if (!isNameValid) {
            response.statusCode = 400
            response.json({
                error: "Nome de usuário inválido! O nome de usuário precisa ser um nome composto."
            })
            return
        }

        if (rawAge !== undefined && rawAge !== null && isNaN(age)) {
            response.statusCode = 400
            response.json({
                error: "Valor da idade precisa ser um número!"
            })
            return
        }

        const isEmailValid = userService.isEmailValid(email)

        if (!isEmailValid) {
            response.statusCode = 400
            response.json({
                error: "Email inválido!"
            })
            return
        }

    
        const updatedUser = await User.update(request.body, {
            where: {
                id: Number(request.params.id)
            }
        })

        response.json(updatedUser)
    }
    
//------------------------------------------------------------------------------------- METODO DELETE

    async delete(request, response) {
        const user = await User.findByPk(
            Number(request.params.id)
        )

        if (!user) {
            response.statusCode = 404
            response.json({
                error: "Usuário não encontrado!"
            })
            return
        }

        await User.destroy({
            where: {
                id: Number(request.params.id)
            }
        })

        response.statusCode = 204
        response.end()
    }
}