import React from "react";
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import {AppContext} from '../../App'

function Card({
                  id,
                  name,
                  price,
                  image,
                  onPlus,
                  onFavorite,
                  favorite = false,
                  loading = false
              }) {
    const {isItemAdded, isFavorited} = React.useContext(AppContext)
    const obj = {id, parentId: id, name, image, price};
    const [isFavorite, setIsFavorite] = React.useState(favorite);
    const [openModal, setOpenModal] = React.useState(false);

    const onClickPlus = () => {
        onPlus(obj);
    }
    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite)
    }

    const clickButtonCard = () => {
        setOpenModal(!openModal)
    }
    const clickButtonCardRemove = () => {
        setOpenModal(!openModal)
    }
    return (
        <>
            <div className={styles.card}>
                {loading ?
                    (
                        <ContentLoader
                            speed={2}
                            style={{width: "40rem", height: "34rem"}}
                            viewBox="0 0 400 340"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"

                        >
                            <rect x="0" y="0" rx="10" ry="10" width="150" height="200"/>
                            <rect x="-1" y="219" rx="5" ry="10" width="150" height="65"/>
                            <rect x="-1" y="300" rx="5" ry="5" width="93" height="15"/>
                            <rect x="-1" y="320" rx="7" ry="7" width="80" height="24"/>
                            <rect x="116" y="310" rx="8" ry="9" width="32" height="32"/>
                        </ContentLoader>
                    ) : (
                        <>
                            <div className="justify-center align-center">
                                {onFavorite && (
                                    <div className={styles.favorite} onClick={onClickFavorite}>
                                        <img style={{width: "3.2rem", height: "3.2rem"}} className="product" alt=""
                                             src={(isFavorite || isFavorited(id)) ? "./img/likeProduct.svg" : "./img/nolikeProduct.svg"}/>
                                    </div>
                                )}

                                <img onClick={clickButtonCard} style={{width: "15rem", height: "20rem"}}
                                     className="product" alt="" src={image}/>
                                <div className={styles.title} style={{minHeight: "11rem"}}>
                                    {name}
                                </div>
                                <div className="d-flex justify-between align-center">
                                    <div className="d-flex flex-column flex ">
                                        <div className={styles.priceTitle}>
                                            ЦЕНА:
                                        </div>
                                        <div className={styles.price}>{price} $.</div>
                                    </div>
                                    {onPlus && (
                                        <img onClick={onClickPlus} className="cu-p"
                                             style={{width: "3.2rem", height: "3.2rem"}} alt=""
                                             src={isItemAdded(id) ? "./img/check.svg" : "./img/plus.svg"}/>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
            </div>
            {openModal &&
            <div className={styles.cardOverlay} style={{height: `${document.body.offsetHeight / 5}rem`}}>
                <div className={styles.cardModal}>
                    <img onClick={clickButtonCardRemove} className={styles.removeButton} src="/img/cartRemove.svg"
                         style={{width: "3.2rem", height: "3.2rem"}} alt=""/>
                    <img src={image} className={styles.imgModal} alt="Dresses"/>
                    <div className={styles.titleModal}>{name}</div>
                    <div className={styles.priceModal}>ЦЕНА: <b>{price} $</b></div>
                </div>
            </div>
            }
        </>
    )
}

export default Card