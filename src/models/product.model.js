module.exports = (sequelize, Sequelize) => {
    const product = sequelize.define('product', {
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.FLOAT
        },
        imageUrl: {
            type: Sequelize.STRING
        }
    })

    return product
}