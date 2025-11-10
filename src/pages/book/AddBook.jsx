import React, { useEffect, useState } from "react"
import { Form, Input, Radio, Button, Card, message, Typography } from "antd"
import { useNavigate } from "react-router-dom"
import { addBook } from "../../api/book"
import { Admin } from "../../utils/admin"

const { Item } = Form
const { Title } = Typography

export default function AddBook() {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (!Admin()) {
      message.error("没有管理员权限，无法访问此页面！")
      navigate('/book')
    } else {
      setIsAdmin(true)
    }
  }, [navigate])

  const handleSubmit = async (values) => {
    if (!Admin()) return
    setLoading(true)
    const hide = message.loading({ content: '正在添加中...', key: 'addBook' })
    try {
      const res = await addBook(values)
      if (res && res.ok && res.code === 200) {
        message.success({ content: res.message || '添加成功', key: 'addBook' })
        form.resetFields()
      } else {
        message.error({ content: res?.message || '添加失败', key: 'addBook' })
      }
    } catch (err) {
      console.error('请求接口失败', err)
      message.error({ content: '网络异常，稍后再试', key: 'addBook' })
    } finally {
      setLoading(false)
      hide()
    }
  }

  if (!isAdmin) return null

  return (
    <Card style={{ maxWidth: 720, margin: '24px auto' }}>
      <Title level={4}>添加书籍（仅限管理员）</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ borrowed: false }}
      >
        <Item
          name="id"
          label="书号"
          rules={[{ required: true, message: '请输入书籍 id' }]}
        >
          <Input placeholder="请输入书籍 id" />
        </Item>

        <Item
          name="title"
          label="书名"
          rules={[{ required: true, message: '请输入书名' }]}
        >
          <Input placeholder="请输入书名" />
        </Item>

        <Item
          name="author"
          label="作者"
          rules={[{ required: true, message: '请输入作者' }]}
        >
          <Input placeholder="请输入作者" />
        </Item>

        <Item
          name="place"
          label="摆放位置"
          rules={[{ required: true, message: '请输入摆放位置' }]}
        >
          <Input placeholder="请输入摆放位置" />
        </Item>

        <Item
          name="borrowed"
          label="借阅状态"
          rules={[{ required: true, message: '请选择借阅状态' }]}
        >
          <Radio.Group>
            <Radio value={true}>已借出</Radio>
            <Radio value={false}>未借出</Radio>
          </Radio.Group>
        </Item>

        <Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            确认添加
          </Button>
        </Item>
      </Form>
    </Card>
  )
}
