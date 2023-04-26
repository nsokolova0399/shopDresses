import React from "react";
import styles from "../SidebarRight/SidebarRight.module.scss";
import {AppContext} from "../../App";

const Info = ({image, name, description}) => {
    const {setCartOpened} = React.useContext(AppContext);

    return (
<>
    <div className={styles.cartEmpty}>
        <img className={styles.cartEmptyImg} alt="Empty cart" src={image}/>
        <h2>{name}</h2>
        <p className="opacity-5">{description}</p>
        <button onClick={()=> setCartOpened(false)} className={styles.greenButton}>
            <img  src="/img/arrow.svg" alt="arrow" /> Вернуться назад
        </button>
    </div>
    </>
    )
}

export default Info