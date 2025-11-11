import React, { useState } from 'react'
import { Card, Input, Button, notification, Typography } from 'antd'
import { returnBook } from '../../api/book'

const { Text, Title } = Typography

export default function ReturnBook() {
  const [bookId, setBookId] = useState('')
  const [statusText, setStatusText] = useState('')

  const openNotification = (type, msg) => {
    notification[type]({
      message: msg,
      placement: 'topRight',
    })
  }

  const handleReturn = async () => {
    if (!bookId) {
      openNotification('warning', '请输入要归还的书籍编号')
      return
    }
    try {
      const res = await returnBook(bookId)
      const data = res?.data ?? res
      if (data && data.code === 200) {
        setStatusText(data.message || '还书成功')
        openNotification('success', data.message || '还书成功')
        setBookId('')
      } else {
        setStatusText(data?.message || '还书失败')
        openNotification('error', data?.message || '还书失败')
      }
    } catch (error) {
      console.error('还书失败', error)
      const msg =
        error?.response?.data?.message ||
        error?.response?.statusText ||
        error?.message ||
        '网络异常，请稍后再试'
      setStatusText(msg)
      openNotification('error', msg)
    }
  }

  return (
    <Card style={{ maxWidth: 640, margin: '24px auto' }}>
      <Title level={4}>归还书籍</Title>
      <Input
        placeholder="请输入要归还的书籍编号"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        onPressEnter={handleReturn}
        style={{ marginBottom: 12 }}
      />
      <Button type="primary" onClick={handleReturn}>
        确认归还
      </Button>

      <div style={{ marginTop: 16 }}>
        <Text strong>当前归还状态：</Text>
        <Text> {statusText}</Text>
      </div>
    </Card>
  )
}