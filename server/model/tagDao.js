const { Sequelize, BaseModel } = require('./baseDao')

const attrs =  {
    tag: Sequelize.STRING(64),
    type: Sequelize.STRING(64),
}

class TagModel extends BaseModel {
    constructor(){
        super('tags', attrs)
        this.model = super.getModel()
        this.model.sync()
    }
} 

module.exports = new TagModel()