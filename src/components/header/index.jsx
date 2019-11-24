import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';

import LinkButton from '../../components/link-button';
import { reqWeather } from '../../api/index';
import { formateDate } from '../../utils/dateUtils';
import menuList from '../../config/menuConfig';
import './index.less';

class Header extends Component {
    
    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl: '', //图片url
        weather: '', //天气文本
    }
    // 退出登录
    logout = () => {
        //显示确认提示
        Modal.confirm({
            title: '确认退出吗?',
            onOk:() => {
                console.log('OK');
                //确定后删除存储的用户信息
                //local中的
                //内存中的
                //跳转到登录界面
                this.props.history.replace('/login')
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    //根据当前请求的path获取对应的title
    getTitle = () => {
        let title = '';
        const path = this.props.location.pathname
        menuList.forEach((item) => {
            if(item.key === path){
                title = item.title
            } else if (item.children){
                const cItem = item.children.find(cItem => cItem.key === path)
                if(cItem){
                    title = cItem.title
                }
            }
        })
        return title;
    }

    //获取天气信息
    getWeather = async () => {
        //发请求
        const {dayPictureUrl, weather} = await reqWeather('杭州')
        //更新状态
        this.setState({
            dayPictureUrl, 
            weather
        })
    }

    componentDidMount() {
        //启动循环定时器
        this.intervalId = setInterval(() => {
            //将currentTime更新为当前时间值
            this.setState({
                currentTime: formateDate(Date.now())
            })
        }, 1000)
        //发jsonp请求获取天气信息
        this.getWeather()
    }

    componentWillMount(){
        //清除定时器
        clearInterval(this.intervalId)
    }

    render() { 
        //得到当前需要显示的title
        const title = this.getTitle();
        const {currentTime, dayPictureUrl, weather} = this.state;
        return (  
            <div className="header">
                <div className="header-top">
                    欢迎，admin &nbsp;&nbsp;
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header)