import React, { useState } from "react"
import { Form, Input, Button, Table, Card, Empty, Typography } from "antd"

const { Title, Text } = Typography

export default function SearchBook() {
  const [loading, setLoading] = useState(false)
  const [books, setBooks] = useState([])

  const columns = [
    {
      title: "书号",
      dataIndex: "id",
      key: "id",
      width: 120,
    },
    {
      title: "书名",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      width: 160,
    },
    {
      title: "摆放位置",
      dataIndex: "place",
      key: "place",
      width: 140,
    },
    {
      title: "借阅状态",
      dataIndex: "borrowed",
      key: "borrowed",
      width: 120,
      render: (val) => (val ? "已借出" : "未借出"),
    },
  ]

  const handleSearch = async (values) => {
    const { title = "", author = "" } = values
    setLoading(true)
    try {
      const response = await fetch(
        `http://120.24.185.26:8081/book/search?name=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`,
        {
          method: "GET",
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        }
      )
      const payload = await response.json()
      const data = payload?.data || []
      // 后端可能返回全部数据，前端再次做精确过滤（保留原逻辑）
      const filtered = data.filter((book) => {
        const titleMatch = !title || book.title === title
        const authorMatch = !author || book.author === author
        return titleMatch && authorMatch
      })
      setBooks(filtered)
    } catch (err) {
      console.error("查询书籍失败", err)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card style={{ maxWidth: 1000, margin: "24px auto" }}>
      <Title level={4}>查找书籍</Title>

      <Form layout="inline" onFinish={handleSearch} style={{ marginBottom: 16 }}>
        <Form.Item name="title">
          <Input placeholder="请输入书名（回车或点击查询）" />
        </Form.Item>

        <Form.Item name="author">
          <Input placeholder="请输入作者名（回车或点击查询）" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            查询
          </Button>
        </Form.Item>
      </Form>

      {books.length === 0 && !loading ? (
        <Empty description={<Text>暂无匹配结果，试试模糊或完整词条</Text>} />
      ) : (
        <Table
          rowKey="id"
          dataSource={books}
          columns={columns}
          loading={loading}
          pagination={{ pageSize: 8 }}
        />
      )}
    </Card>
  )
}