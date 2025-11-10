import { Form, Input, Radio } from "antd"
const { Item } = Form
const { Group: RadioGroup } = Radio
import { useNavigate } from "react-router-dom"
import { addBook } from "../../api/book"
import { useEffect, useState } from "react"
import { Admin } from "../../utils/admin"
export default function AddBook() {
    const navigate = useNavigate()
    const [addBookStatus, setAddBookStatus] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (!Admin()) {
            alert("没有管理员权限，无法访问此页面！")
            navigate('/book')
        } else {
            setIsAdmin(true)
        }
    }, [navigate])

    const handleItem = async (values) => {
        if (Admin()) {
            setAddBookStatus('正在添加中...')
            try {
                const res = await addBook(values)
                if (res.ok && res.code === 200) {
               
                    setAddBookStatus(res.message || '添加成功')
                }
                else {
                    setAddBookStatus(res.message || '添加失败')
                }
            }
            catch (error) {
                console.error('请求接口失败', error)
                setAddBookStatus('网络异常，稍后再试')
            }
        }
    }
    return (
        <div>
            <h2>添加书籍（仅限管理员）</h2>
            { isAdmin&&<Form onFinish={handleItem}>
                <Item
                    name="id"
                    label="id"
                    rules={[{ required: true, message: '请输入书籍id' }]}
                >
                    <Input placeholder="请输入书籍id" />
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
                    <RadioGroup>
                        <Radio value={true}>已借出</Radio>
                        <Radio value={false}>未借阅</Radio>
                    </RadioGroup>

                </Item>
                <Item>
                    <button type="submit"  >
                        {addBookStatus === '正在添加中...' ? '正在添加中...' : '确认添加'}
                    </button>
                </Item>
            </Form>}

        </div>
    )

}
