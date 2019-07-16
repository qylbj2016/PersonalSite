const { Sequelize, BaseModel } = require('./baseDao')

const attrs =  {
    email: Sequelize.STRING(256),
    name: Sequelize.STRING(45),
    pwd: Sequelize.STRING(45),
    sex: Sequelize.STRING(45),
    state: Sequelize.INTEGER(11),
    code: Sequelize.STRING(45)
}

class UserModel extends BaseModel {
    constructor(){
        super('users', attrs)
        this.model = super.getModel()
        this.model.sync()
    }
} 

module.exports = new UserModel()