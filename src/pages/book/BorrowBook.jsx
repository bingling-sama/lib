import React, { useState } from "react"
import { Card, Input, Button, notification, Typography } from "antd"
import { borrowBook } from "../../api/book.js"

const { Text, Title } = Typography

export default function BorrowBook() {
  const [bookId, setBookId] = useState("")
  const [statusText, setStatusText] = useState("")

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      placement: "topRight",
    })
  }

  const handleBorrow = async () => {
    if (!bookId) {
      openNotification("warning", "请输入书籍编号")
      return
    }
    try {
      const result = await borrowBook(bookId)
      if (result && result.code === 200) {
        setStatusText(result.message || "借书成功")
        openNotification("success", result.message || "借书成功")
      } else {
        setStatusText(result?.message || "借书失败")
        openNotification("error", result?.message || "借书失败")
      }
    } catch (error) {
      console.error("借书失败", error)
      setStatusText("网络异常，稍后重试")
      openNotification("error", "网络异常，稍后重试")
    }
  }

  return (
    <Card style={{ maxWidth: 640, margin: "24px auto" }}>
      <Title level={4}>借阅书籍</Title>
      <Input
        placeholder="请输入需要借阅书籍的编号"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        onPressEnter={handleBorrow}
        style={{ marginBottom: 12 }}
      />
      <Button type="primary" onClick={handleBorrow}>
        确认借书
      </Button>

      <div style={{ marginTop: 16 }}>
        <Text strong>当前书籍状态：</Text>
        <Text> {statusText}</Text>
      </div>
    </Card>
  )
}