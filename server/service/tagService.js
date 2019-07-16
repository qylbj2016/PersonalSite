const tagDao = require('../model/tagDao')

const tagService = () => tagDao.findAll()

module.exports = tagService