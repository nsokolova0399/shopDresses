import React from "react";
import Card from "../components/Card";

function Favorites({ items, onAddToFavorite }) {
    return (
        <div className="content" style={{padding: "4rem"}}>
            <div className="d-flex align-center justify-between">
                <h1>Избранное</h1>
            </div>
            <div className="cards d-flex">
                <div className="cards d-flex">
                    {items.map((item, index) => (
                            <Card
                                key={index}
                                favorite={true}
                                onFavorite={onAddToFavorite}
                                {...item}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}


export default Favorites
