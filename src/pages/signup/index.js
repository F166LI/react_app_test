import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import { ConfigProvider, Button, Form, Input, Divider } from 'antd';

import Authentication from "@/layout/authentication";
import scss from "./scss/index.module.scss";
import login_png from "@/assets/logo.png";

const FormNode = () => {
  const defaultData = {
    colorPrimary: '#333',
    colorBgContainer: '#B8ACD3',
    colorBorder: '#B8ACD3'
  };

  const validateMessages = {
    required: "Please enter your ${name}!"
  }

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      validateMessages={validateMessages}
      name="basic"
      size="large"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        className={scss.formItem}
        name="email"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        className={scss.formItem}
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item
        className={scss.formItem}
      >
        <ConfigProvider
          theme={{
            token: defaultData,
          }}
        >
          <Button shape="round" block={true} type="default" htmlType="submit">
            Sign Up
          </Button>
        </ConfigProvider>
      </Form.Item>
    </Form>
  )
}

export default function () {
  const navigate = useNavigate();

  return (
    <Authentication>
      <div>
        <div className={scss.head}>
          <img src={login_png} />
        </div>
        <div className={`mt-6 ${scss.body}`}>
          <FormNode />
        </div>
        <Divider className={scss.divider} plain>or sign in with</Divider>
        <p className="is-size-7 has-text-centered mt-3">Have an account? <a onClick={ function(){ navigate(`/login`) } }><b>Log in</b></a></p>
      </div>
    </Authentication>
  )
}