module.exports = num => {
    let code = ''
    for(let i = 0 ; i < num ; i ++){
        code += Math.floor ( Math.random() * 10 )
    }
    return code
}