import { useMemo, lazy, useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { ConfigProvider, Button, Form, Input, Divider } from 'antd';

import store from '@/store';

import Authentication from "@/layout/authentication";
import scss from "./scss/index.module.scss";
import login_png from "@/assets/logo.png";

import $api from "./api";

const FormNode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultData = {
    colorPrimary: '#333',
    colorBgContainer: '#B8ACD3',
    colorBorder: '#B8ACD3'
  };

  const validateMessages = {
    required: "Please enter your ${name}!"
  }

  const onFinish = (values) => {
    $api.post('login', values)
      .then(({ data }) => {
        store.dispatch({ type: 'user/login', data })
        navigate('/charities');
      })
  };
  const onFinishFailed = (errorInfo) => {
    dispatch({ type: 'loading/open', a: 1 })

    setTimeout(() => {
      dispatch({ type: 'loading/close', v: 23 })
    }, 3000);
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
        name="username"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        className={scss.formItem + ' ' + scss.none}
        name="password"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <a className="is-pulled-right" onClick={function () { navigate('/passwordReset') }}><b>Forgot Password?</b></a>
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
            Log In
          </Button>
        </ConfigProvider>
      </Form.Item>
    </Form>
  )
}

export default function () {
  const navigate = useNavigate();

  return useMemo(() =>
    <Authentication>
      <div>
        <div className={scss.head}>
          <img src={login_png} />
        </div>
        <div className={`mt-6 ${scss.body}`}>
          <FormNode />
        </div>
        <Divider className={scss.divider} plain>or sign up with</Divider>
        <div className={scss.account}>
          <div className={scss.google}>
            <span className="fa fa-google is-size-3"></span>
          </div>
          <div className={scss.apple}>
            <span className="fa fa-apple is-size-3"></span>
          </div>
        </div>
        <p className="is-size-7 has-text-centered mt-3">Don’t have an account? <a onClick={function () { navigate(`/signup`) }}><b>Sign Up</b></a></p>
      </div>
    </Authentication>
  )
}