import Card from "../components/Card";
import React from "react";

function Home({
                  searchValue,
                  onSearchChange,
                  setSearchValue,
                  items,
                  onAddToCart,
                  onAddToFavorite
              }) {
    return (
        <div className="content" style={{padding: "4rem"}}>
            <div className="d-flex align-center justify-between">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Платья"}</h1>

                <div className="search-block mr-10 d-flex align-center">
                    <img style={{width: "1.5rem", height: "1.5rem"}} src="/img/search.svg" alt="Search"/>
                    <input onChange={onSearchChange} value={searchValue} placeholder="Поиск..."/>
                    {searchValue && <img onClick={() => setSearchValue('')} className="removeButton d-flex"
                                         style={{width: "3.2rem", height: "3.2rem"}} src="/img/cartRemove.svg"
                                         alt="Clear"/>}

                </div>

            </div>

            <div className="cards d-flex">
                {items
                    .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                    .map((obj, index) => (
                        <Card
                            key={index}
                            onPlus={(obj) => onAddToCart(obj)}
                            onFavorite={(obj) => onAddToFavorite(obj)}
                            {...obj}
                        />
                    ))}
            </div>
        </div>
    )
}


export default Home
