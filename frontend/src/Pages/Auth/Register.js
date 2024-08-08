// src/Register.js
import React from "react";
import { Form, Input, Button, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const Register = () => {
  const navigation = useNavigate();

  const RESGISTER_USER = gql`
    mutation Mutation($name: String!, $email: String!, $password: String!) {
      createUser(name: $name, email: $email, password: $password) {
        name
        email
      }
    }
  `;
  const [createUser, { data, loading, error, reset }] =
    useMutation(RESGISTER_USER);

  const onFinish = (values) => {
    try {
      createUser({
        variables: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      })
        .then((res) => {
          console.log("res", res);
          const { data } = res;

          if (data.createUser) {
            toast.success("User Registered successfully");
            navigation("/login");
            reset();
          }
        })
        .catch((error) => {
          toast.error(error.message);
          console.log("error", error.message);
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="name" />
          </Form.Item>
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
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            hasFeedback
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item>
            {loading ? (
              <Spin className="w-full" />
            ) : (
              <Button
                disabled={loading}
                type="primary"
                htmlType="submit"
                className="w-full"
              >
                Register
              </Button>
            )}
          </Form.Item>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
