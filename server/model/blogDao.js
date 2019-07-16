const { Sequelize, BaseModel } = require('./baseDao')

const attrs =  {
    title: Sequelize.STRING(128),
    content: Sequelize.TEXT,
    views: Sequelize.INTEGER(11),
    tag: Sequelize.STRING(256),
    ctime: Sequelize.STRING(64),
    author: Sequelize.STRING(128),
    blog_id: Sequelize.INTEGER(11),
    islike: Sequelize.INTEGER(11),
    img_src:Sequelize.STRING(128)
}

class BlogModel extends BaseModel {
    constructor(){
        super('blogs', attrs)
        this.model = super.getModel()
        this.model.sync()
    }
    findByOrderLimited (attributes, orderOpt, limit) {
        let order = [ [ orderOpt, 'DESC'] ]
        return attributes ? this.model.findAll( { attributes , order, limit } ) : this.model.findAll( { order, limit } )
    }
} 

module.exports = new BlogModel()