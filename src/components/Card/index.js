import React from "react";
import styles from './Card.module.scss'

function Card(props) {
    const [isAdded, setIsAdded] = React.useState(true)
    const [isLiked, setIsLiked] = React.useState(true)
    const onClickPlus = () => {
        setIsAdded(!isAdded);
    }
    const onClickFavorite = () => {
        setIsLiked(!isLiked);
    }

    return (
        <div className={styles.card}>
            <div className="justify-center align-center">
                <div>
                    <div className={styles.favorite} onClick={onClickFavorite}>
                        <img style={{width:"3.2rem", height:"3.2rem"}} className="product" alt=""
                             src={isLiked ? "./img/nolikeProduct.svg" : "./img/likeProduct.svg"}/>
                    </div>
                    <img  style={{width:"15rem", height:"20rem"}} className="product" alt="" src={props.image}/>
                </div>
                <div className={styles.title}>
                    {props.title}
                </div>
                <div className="d-flex justify-between align-center p-14">
                    <div className="d-flex flex-column">
                        <div className={styles.priceTitle}>
                            ЦЕНА:
                        </div>
                        <div className={styles.price}>{props.price} $.</div>
                    </div>
                    <img onClick={onClickPlus} className="cu-p" style={{width:"3.2rem", height:"3.2rem"}} alt=""
                         src={isAdded ? "./img/plus.svg" : "./img/check.svg"}/>
                </div>
            </div>
        </div>
    )
}

export default Card