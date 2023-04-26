import styles from './SidebarRight.module.scss'
import React, {useState} from "react";
import Info from '../Info/Info'
import {useCart} from '../../hooks/useCart'
import axios from 'axios'

function SidebarRight({items = [], onClose, onRemove, opened}) {
    const {cartItems, setCartItems, totalPrice} = useCart()
    const [isComplete, setIsComplete] = useState(false)
    const [orderId, setOrderId] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const onClickOrder = async () => {
        try {
            const {data} = await axios.post('https://64216b8d86992901b2b2f995.mockapi.io/api/v1/order', {
                items: cartItems
            })
            setIsLoading(true)
            setOrderId(data.id)
            setIsComplete(true)
            setCartItems([])
            // mok api поддреживает только put /cart/:id
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart/' + item.id)
            }
        } catch (error) {
            alert('Не удалось создать заказ :(')
        }
        setIsLoading(false)
    }

    return (
        <>
            <div className={styles.overlay} style={{height: `${document.body.offsetHeight / 5}rem`}}>
                <div className={styles.sidebarRight} style={{height: `${document.body.offsetHeight / 5}rem`}}>
                    <h2 className="d-flex justify-between">Корзина
                        <img onClick={onClose} className={styles.removeButton} src="/img/cartRemove.svg"
                             style={{width: "3.2rem", height: "3.2rem"}} alt="Dresses"/>
                    </h2>
                    {items.length > 0 ?
                        <div>
                            <div className={styles.items}>
                                {
                                    items.map((obj) => (
                                        <div key={obj.id} className={styles.cartItem}>
                                            <div className={styles.cartItemImg}
                                                 style={{backgroundImage: `url(${obj.image})`}}></div>
                                            <div className="flex" style={{marginRight: "2rem"}}>
                                                <p style={{marginBottom: "2rem"}}>{obj.name}</p>
                                                <b>{totalPrice} $</b>
                                            </div>
                                            <img onClick={() => onRemove(obj.id)}
                                                 className={styles.removeButton}
                                                 style={{width: "3.2rem", height: "3.2rem"}}
                                                 src="/img/cartRemove.svg"
                                                 alt="Dresses"/>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={styles.cartTotalBlock}>
                                <ul>
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} $</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{Math.floor(totalPrice * 0.05)} $</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} className={styles.greenButton} onClick={onClickOrder}>
                                    Оформить заказ
                                    <img style={{width: "1.6rem", height: "1.4rem"}} src={"/img/arrow.svg"}
                                         alt={"Arrow"}/>
                                </button>
                            </div>
                        </div>
                        :
                        <>
                            <Info
                                name={isComplete ? "Заказ оформлен!" : "Корзина пустая"}
                                image={isComplete ? "img/Group 117.png" : "/img/empty-cart.jpg"}
                                description={isComplete ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы один товар, чтобы сделать заказ."}
                            />
                        </>
                    }
                </div>
            </div>


        </>
    )
}

export default SidebarRight;