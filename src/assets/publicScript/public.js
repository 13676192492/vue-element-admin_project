/**测试版本 */
// export const runApi = '/runApi'

/**发布版本*/
// export const runApi = ''


// 时间格式转换
export function updateTime(data) {
    // let test =  new Date(data).getTime();
    if (data) {
        const time = new Date(data.substring(0, 19));


        let month = time.getMonth() + 1
        let day = time.getDate()
        let hours = time.getHours()
        let min = time.getMinutes()

        month = setDate(month)
        day = setDate(day)
        min = setDate(min)
        hours = setDate(hours)

        return `${time.getFullYear()}-${month}-${day} ${hours}:${min}`
    }

}

function setDate(param) {
    // console.log(param);
    if (param < 10) param = '0' + param
    return param
}