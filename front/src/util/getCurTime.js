function getCurTime() {
	var date = new Date()
	var seperator1 = "/"
	var seperator2 = ":"
	var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1
	var strDate = date.getDate()<10? "0" + date.getDate():date.getDate()
	var curTime = date.getFullYear() + seperator1  + month  + seperator1  + strDate
			+ " "  + date.getHours()  + seperator2  + date.getMinutes()
			+ seperator2 + date.getSeconds()
	return curTime
}

export default getCurTime