import { useMemo, lazy, useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import scss from "./scss/index.module.scss";

const nav = ['charities', 'impact', 'brands', 'wallet']

const NavNode = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goLink = (path) => {
    navigate(path)
  }

  return nav.map(item => {
    const v = item.charAt(0).toUpperCase() + item.slice(1);
    const c = pathname.indexOf(item) !== -1 ? scss[item + '-active'] : ''

    return (
      <li key={item} className={`${scss.bg} ${scss[item]} ${c}`} onClick={function () { goLink(`/${item}`) }}><p>{v}</p></li>
    )
  })
}

export default function (props) {
  return useMemo(() =>
    <div className="hero is-fullheight page-main">
      <div className={`hero-head ${scss.head}`}>
        <ul className={scss.ul}>
          <NavNode />
        </ul>
      </div>
      <div className="hero-body is-justify-content-center">
        {props.children}
      </div>
    </div>
  )
}