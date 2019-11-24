/*
    包含应用中所有请求接口的函数：接口请求函数
    函数的返回值都是promise对象
*/
import jsonp from 'jsonp' //axios不能发jsonp请求
import ajax from './ajax'
import { message } from 'antd'

const BASE = '';
//请求登录
//发送jsonp请求得到天气信息
export const reqWeather = (city) => {
    //执行器函数
    //内部去执行异步任务，成功了调用resolve(), 失败了不调用reject(),直接提示错误
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        jsonp(url, {}, (error, data) => {
            if(!error && data.error === 0) {//成功
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else { //失败
                message.error('获取天气信息失败')
            }
        })
    })
}

//获取分类列表
export const reqCategorys = () => ajax(BASE + '/manage/category/list')