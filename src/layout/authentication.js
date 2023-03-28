import { useMemo, lazy, useEffect, useState, useCallback } from 'react';

export default function (props) {
  const { className = "", head = true, foot = true } = props;

  return useMemo(() =>
    <div className={`hero is-fullheight page-authentication${' ' + className}`}>
      {head ? (<div className="hero-head"></div>) : null}
      <div className="hero-body is-justify-content-center">
        {props.children}
      </div>
      <div className="hero-foot pb-3">
        {foot ? <p className="has-text-centered">Continuing means you have read and accepted our User<br /> Terms & Conditions and Privacy Policy</p> : null}
      </div>
    </div>
  )
}