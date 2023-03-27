import styles from './SidebarRight.module.scss'
import React from "react";


function SidebarRight({ items=[],onClose, onRemove}) {
    let sum = 0;
    const [isLiked, setIsLiked] = React.useState(true)

    return (
        <div className={styles.overlay}>
            <div className={styles.sidebarRight}>
                <h2 className="d-flex justify-between">Корзина
                    <img onClick={onClose} className={styles.removeButton} src="/img/cartRemove.svg" style={{width:"3.2rem", height:"3.2rem"}} alt="Dresses"/>
                </h2>

                {items.length > 0 ?
                    <div>
                        <div className={styles.items}>
                            {
                                items.map((obj) => (
                                    sum+=Number(obj.price),
                                        <div className={styles.cartItem}>
                                            <div className={styles.cartItemImg} style={{backgroundImage: `url(${obj.image})`}}></div>
                                            <div className="flex" style={{marginRight: "2rem"}}>
                                                <p style={{marginBottom:"2rem"}}>{obj.name}</p>
                                                <b>{obj.price} $</b>
                                            </div>
                                            <img onClick ={() => onRemove(obj.id) } className={styles.removeButton} style={{width:"3.2rem", height:"3.2rem"}} src="/img/cartRemove.svg" alt="Dresses"/>
                                        </div>
                                ))
                            }
                        </div>
                        <div className={styles.cartTotalBlock}>
                            <ul>
                                <li><span>Итого:</span>
                                    <div></div>
                                    <b>{sum} $</b></li>
                                <li><span>Налог 5%:</span>
                                    <div></div>
                                    <b>{Math.floor(sum*0.05)} $</b></li>
                            </ul>
                            <button className={styles.greenButton}>
                                Оформить заказ
                                <img style={{width:"1.6rem", height:"1.4rem"}} src={"/img/arrow.svg"} alt={"Arrow"}/>
                            </button>
                        </div>
                    </div>
                :
                    <div className={styles.cartEmpty}>
                    <img className={styles.cartEmptyImg} alt="Empty cart" src="/img/empty-cart.jpg"/>
                    <h2>Корзина пустая</h2>
                    <p className="opacity-5"> Добавьте хотя бы один товар, чтобы сделать заказ.</p>
                    <button onClick={onClose} className={styles.greenButton}>
                    <img  src="/img/arrow.svg" alt="arrow" /> Вернуться назад
                    </button>
                    </div>
                }




            </div>
        </div>
    )
}

export default SidebarRight;