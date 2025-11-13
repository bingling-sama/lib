import React, { useEffect, useMemo } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Layout, Menu, Button, Typography, message } from "antd"
import {
  BookOutlined,
  SearchOutlined,
  SwapOutlined,
  PlusOutlined,
  LogoutOutlined,
} from "@ant-design/icons"

const { Sider, Content } = Layout
const { Title } = Typography

export function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/")
    }
  }, [navigate])

  const role = localStorage.getItem("role")

  const items = useMemo(() => {
    return [
      {
        key: "borrow",
        icon: <BookOutlined />,
        label: "借阅书籍",
      },
      {
        key: "search",
        icon: <SearchOutlined />,
        label: "查找书籍",
      },
      {
        key: "return",
        icon: <SwapOutlined />,
        label: "归还书籍",
      },
      {
        key: "add",
        icon: <PlusOutlined />,
        label: "增减书籍（仅管理员）",
        disabled: role !== "administrator",
      },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "退出登录",
      },
    ]
  }, [role])

  const onMenuSelect = ({ key }) => {
    if (key === "logout") {
      localStorage.removeItem("token")
      localStorage.removeItem("role")
      message.success("已退出登录")
      navigate("/")
      return
    }
    if (key === "add" && role !== "administrator") {
      message.warning("需要管理员权限才能访问此项")
      return
    }
    navigate(`/book/${key}`)
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220} style={{ background: "#fff", paddingTop: 16 }}>
        <div style={{ padding: "0 24px 16px" }}>
          <Title level={5} style={{ margin: 0 }}>
            图书管理系统
          </Title>
        </div>
        <Menu
          mode="inline"
          items={items}
          onSelect={onMenuSelect}
          style={{ height: "100%", borderRight: 0 }}
        />
        <div style={{ padding: 16 }}>
          <Button
            block
            type="default"
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("role")
              message.success("已退出登录")
              navigate("/")
            }}
          >
            退出登录
          </Button>
        </div>
      </Sider>

      <Layout>
        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}