/**测试版本 */
// export const runApi = '/runApi'

/**发布版本*/
// export const runApi = ''


// 时间格式转换
export function updateTime(data,type) {
    // let test =  new Date(data).getTime();
    if (data) {
        const time = new Date(data);

        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hours = time.getHours();
        let min = time.getMinutes();
        let seconds = time.getSeconds();

        // console.log(hours)

        month = setDate(month);
        day = setDate(day);
        min = setDate(min);
        hours = setDate(hours);
        seconds = setDate(seconds);
        if(type==0)
          return `${time.getFullYear()}-${month}-${day} ${hours}:${min}:${seconds}`
        else if(type == 1)
          return `${hours}:${min}:${seconds}`
    }

}

function setDate(param) {
    // console.log(param);
    if (param < 10) param = '0' + param
    return param
}

//修改时间格式
export function changeTimeFormat(time) {
    let date = new Date(time);
    let year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    return `${year}-${month}-${day}`;
  }
