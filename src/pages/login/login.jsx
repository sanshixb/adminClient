import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import logo from '../../assets/images/logo.png';
import './login.less';

const Item = Form.Item;
class Login extends Component {

    // 统一验证
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, {username, password}) => {
            if (!err) {
              alert(`发送登录的ajax请求，username=${username}, password=${password}`)
            } else {

            }
        });
    };

    // 密码自定义验证
    validatePwd = (rule, value, callback) => {
        value = value.trim()
        if (!value) {
            callback('密码必须输入')
        } else if (value.length < 4) {
            callback('密码不能小于4位')
        } else if (value.length > 12) {
            callback('密码不能大于12位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码必须是字母，数字，下划线组合')
        } else {
            callback()
        }
    }

    render() { 
        const { getFieldDecorator } = this.props.form;
        return (  
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {
                                getFieldDecorator('username', {
                                    initialValue: '', //初始值
                                    rules: [ //声明式验证
                                        { required: true, whitespace: true, message: '用户名是必须的' },
                                        { min: 4, message: '用户名不能小于4位' },
                                        { max: 12, message: '用户名不能大于12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是字母，数字，下划线组合'}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '', //初始值
                                    rules: [
                                        { validator: this.validatePwd}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登 录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
 
const WrapperForm = Form.create()(Login)

export default WrapperForm;