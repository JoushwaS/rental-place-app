// src/Login.js
import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const Login = () => {
  const navigation = useNavigate();

  const LOGIN_USER = gql`
    mutation Mutation($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        token
        email
        id
      }
    }
  `;
  const [loginUser, { data, loading, error, reset }] = useMutation(LOGIN_USER);

  const onFinish = (values) => {
    console.log("Success:", values);

    loginUser({
      variables: {
        email: values.email,
        password: values.password,
      },
    })
      .then((res) => {
        console.log("res", res);
        const { data } = res;

        if (data.loginUser) {
          window.localStorage.setItem(
            "rental-token",
            JSON.stringify({
              token: data.loginUser.token,
              email: data.loginUser.email,
              id: data.loginUser.id,
            })
          );
          toast.success("User logged in successfully");
          reset();
          navigation("/dashboard", { replace: true });
        }
      })
      .catch((error) => {
        toast.error(error.message);

        console.log("error", error.message);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            {loading ? (
              <Spin className="w-full" />
            ) : (
              <Button type="primary" htmlType="submit" className="w-full">
                Login
              </Button>
            )}
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
