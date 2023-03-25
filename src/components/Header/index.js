import React from "react";
// import styles from './Header.module.scss'

function Header(props){
    return(
        <header className="d-flex justify-between align-center" style={{padding:"4rem"}}>
            <div className="d-flex align-center">
                <img alt="Logo" src="/img/logo.svg" style={{width:"4rem", height:"4rem"}}/>
                <div>
                    <h3 className="text-uppercase">React Dresses</h3>
                    <p>Магазин лучших платьев</p>
                </div>
            </div>
            <ul className="d-flex">
                <li style={{marginRight:"3rem"}}>
                    <img onClick={props.onClickCart} className="cu-p" style={{width:"1.8rem", height:"1.8rem"}} alt="Сart" src="/img/card.svg"/>
                    <span>1205 руб.</span>
                </li>
                <li>
                    <img style={{width:"2rem", height:"2rem"}} alt="Like" src="/img/like.svg"/>
                    <img style={{width:"2rem", height:"2rem"}} alt="User" src="/img/user.svg"/>
                </li>
            </ul>
        </header>
    )
}

export default Header;