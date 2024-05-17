import React, { useState } from 'react';
import { Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import "./index.css"

// 定义 Props 接口
interface LoginFormProps {
    onLoginSuccess: () => void;  // 声明 onLoginSuccess 为无参数且无返回值的函数
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
        if (username !== '' && password !== '') {
            if (username === "admin" && password === "password") {
                onLoginSuccess();  // 成功登录时调用父组件的 onLoginSuccess
            } else {
                message.error("用户名或密码错误！");
            }
        } else {
            message.error("用户名和密码不能为空");
        }
    };

    return (
        <div className="login-container">
            <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                size="large"
                placeholder="用户名"
                prefix={<UserOutlined />}
                className="login-input"
            />
            <Input.Password
                value={password}
                onChange={e => setPassword(e.target.value)}
                size="large"
                className="login-input"
                placeholder="密码"
                prefix={<LockOutlined />}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <Button
                className="login-button"
                size="large"
                type="primary"
                onClick={submit}
            >
                登录
            </Button>
        </div>
    );
};

export default LoginForm;
