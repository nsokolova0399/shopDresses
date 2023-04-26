import React from "react";
// import styles from './Header.module.scss'
import {Link} from 'react-router-dom'
import {useCart} from '../../hooks/useCart'

function Header(props) {
    const {totalPrice} = useCart()

    return (
        <header className="d-flex justify-between align-center" style={{padding: "4rem"}}>
            <Link to="/">
            <div className="d-flex align-center">
                <img alt="Logo" src="/img/logo.svg" style={{width: "4rem", height: "4rem"}}/>
                <div>
                    <h3 className="text-uppercase">React Dresses</h3>
                    <p>Магазин лучших платьев</p>
                </div>
            </div>
            </Link>
            <ul className="d-flex">
                <li style={{marginRight: "3rem", position: "relative", display:"flex"}}>
                    <div>
                    <img onClick={props.onClickCart} className="cu-p" style={{width: "1.8rem", height: "1.8rem"}}
                         alt="Сart" src="/img/card.svg"/>
                    </div>
                    <div style={{marginTop:"0.4rem"}}>{totalPrice} $</div>
                </li>
                <li>
                    <Link to="/favorites">
                        <img style={{width: "2rem", height: "2rem"}} alt="Like" src="/img/like.svg"/>
                    </Link>
                    <Link to="/orders">
                    <img style={{width: "2rem", height: "2rem"}} alt="User" src="/img/user.svg"/>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;