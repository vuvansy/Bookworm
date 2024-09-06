import { Button, Divider, Form, Input, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { callLogin } from "../../services/api";
import "./login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
const LoginPage = () => {
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        // console.log(values);
        const { username, password } = values;
        setIsSubmit(true);
        const res = await callLogin(username, password);
        if (res?.data) {
            localStorage.setItem("access_token", res.data.access_token);
            dispatch(doLoginAction(res.data.user));
            message.success("Đăng nhập tài khoản thành công!");
            navigate("/");
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description:
                    res.message && Array.isArray(res.message)
                        ? res.message[0]
                        : res.message,
                duration: 5,
            });
        }
    };
    return (
        <div className="login-page">
            <main className="main">
                <div className="container">
                    <section className="wrapper">
                        <div className="heading">
                            <h2 className="text text-large">Đăng Nhập</h2>
                            <Divider />
                        </div>
                        <Form
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Email"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Email không được để trống!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                labelCol={{ span: 24 }}
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Mật khẩu không được để trống!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmit}
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                            <Divider>Or</Divider>
                            <p className="text text-normal">
                                Chưa có tài khoản ?
                                <span>
                                    <Link to="/register"> Đăng Ký </Link>
                                </span>
                            </p>
                            <br />
                            <p className="text" style={{ color: "#9d9d9d" }}>
                                p/s: Để test, sử dụng tài khoản
                                guest@gmail.com/123456
                            </p>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    );
};
export default LoginPage;
