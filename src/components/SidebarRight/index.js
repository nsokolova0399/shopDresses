import styles from './SidebarRight.module.scss'


function SidebarRight({onClose, items=[]}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.sidebarRight}>
                <h2 className="d-flex justify-between">Корзина
                    <img onClick={onClose} className={styles.removeButton} src="/img/cartRemove.svg" style={{width:"3.2rem", height:"3.2rem"}} alt="Sneakers"/>
                </h2>

                <div className={styles.items}>
                    {/*{*/}
                    {/*    items.map((obj) => {*/}
                    {/*        <div className={styles.cartItem}>*/}
                    {/*           <div className={styles.cartItemImg} style={{backgroundImage: "url(./img/product.svg)"}}></div>*/}
                    {/*         <div className="flex" style={{marginRight: "2rem"}}>*/}
                    {/*            <p style={{marginBottom:"0.5rem"}}>Мужские Кроссовки Nike Air Max 270</p>*/}
                    {/*               <b>12 999 руб.</b>*/}
                    {/*          </div>*/}
                    {/*           <img className={styles.removeButton} style={{width:"3.2rem", height:"3.2rem"}} src="/img/cartRemove.svg" alt="Dresses"/>*/}
                    {/*        </div>*/}

                    {/*    })*/}
                    {/*}*/}


                </div>

                <div className={styles.cartTotalBlock}>
                    <ul>
                        <li><span>Итого:</span>
                            <div></div>
                            <b>21 498 руб.</b></li>
                        <li><span>Налог 5%:</span>
                            <div></div>
                            <b>1074 руб.</b></li>
                    </ul>
                    <button className={styles.greenButton}>
                        Оформить заказ
                        <img style={{width:"1.6rem", height:"1.4rem"}} src={"/img/arrow.svg"} alt={"Arrow"}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SidebarRight;