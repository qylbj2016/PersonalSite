const { Sequelize, BaseModel } = require('./baseDao')

const attrs =  {
    blog_id: Sequelize.INTEGER(11),
    user_name: Sequelize.INTEGER(11),
    email: Sequelize.STRING(128),
    ctime: Sequelize.STRING(64),
    comment: Sequelize.TEXT,
    parent_name: Sequelize.STRING(64),
    parent: Sequelize.INTEGER(11),
    user_img: Sequelize.STRING(128),
    comment_id: Sequelize.INTEGER(11)
}

class CommentModel extends BaseModel {
    constructor(){
        super('comments', attrs)
        this.model = super.getModel()
        this.model.sync()
    }
} 

module.exports = new CommentModel()