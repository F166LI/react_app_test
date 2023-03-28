import { useState, useCallback } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import { ConfigProvider, Button, Form, Input, Divider } from 'antd';

import Main from "@/layout/main";
import scss from "./scss/index.module.scss";

export default function () {
  const navigate = useNavigate();

  return (
    <Main>
      <div>
      impact
      </div>
    </Main>
  )
}