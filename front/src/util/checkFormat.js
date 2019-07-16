export default arr => {
  let res = true
  const emailReg = /^([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  arr.forEach(item => {
    if (res === true) {
      const k = item.k.replace(/(^\s*)|(\s*$)/g, '')
      if (item.v === 'email') {
        res = emailReg.test(k) ? true : res = '邮箱格式不正确'
      } else {
        res = k === '' || k === null ? res = `${item.v}不能为空` : true
      }
    } else {
      return res
    }
  })
  return res
}
