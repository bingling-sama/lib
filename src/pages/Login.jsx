import React, { useState } from "react"
import { Card, Form, Input, Button, Typography, message } from "antd"
import { Link, useNavigate } from "react-router-dom"

const { Title, Text } = Typography

export default function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const response = await fetch("http://120.24.185.26:8081/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      })

      if (!response.ok) {
        const errText = await response.text()
        message.error(errText || "登录失败")
        return
      }

      const data = await response.json()
      const token = data?.data?.token
      const role = data?.data?.role

      if (token) {
        localStorage.setItem("token", token)
        localStorage.setItem("role", role || "")
        message.success("登录成功")
        navigate("/book")
      } else {
        message.error(data?.message || "登录失败，未返回 token")
      }
    } catch (err) {
      console.error("登录异常", err)
      message.error("网络异常，稍后再试")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 48 }}>
      <Card style={{ width: 420 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          图书管理系统
        </Title>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {loading ? "正在登录中..." : "登录"}
            </Button>
          </Form.Item>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>
              没有账户？ <Link to="/register">注册</Link>
            </Text>
            <Link to="/forget">忘记密码</Link>
          </div>
        </Form>
      </Card>
    </div>
  )
}