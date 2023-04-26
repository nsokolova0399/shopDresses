import React from "react";
import Header from "./components/Header";
import SidebarRight from "./components/SidebarRight"
import "./components/SidebarRight/SidebarRight.module.scss";
import axios from 'axios'
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favoriteItems, setFavoriteItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [isReady, setIsReady] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                const [itemsResponse, itemsCartResponse, itemsFavoriteResponse] = await Promise.all([
                    axios.get('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/items'),
                    axios.get('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart'),
                    axios.get('https://64216b8d86992901b2b2f995.mockapi.io/api/v1/favorites')

                ])
                setIsReady(false)
                setFavoriteItems(itemsFavoriteResponse.data)
                setCartItems(itemsCartResponse.data)
                setItems(itemsResponse.data)
            } catch (error) {
                alert('Ошибка загрузки данных')
            }
        }

        fetchData();
    }, []);
    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((favobj) => Number(favobj.parentId) === Number(obj.parentId));
            if (findItem) {
                setCartItems(prev => prev.filter((item) => Number(item.parentId) !== Number(obj.parentId)))
                await axios.delete(`https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart/${findItem.parentId}`)
            } else {
                setCartItems(prev => [...prev, obj])
                const {data} = await axios.post(`https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart`, obj);
                setCartItems(prev => prev.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    } else return item
                }))
            }
        } catch {
            alert('Не удалось добавить в корзину')
        }
    };
    const onAddToFavorite = async (obj) => {
        try {
            if (favoriteItems.find((favobj) => Number(favobj.id) === Number(obj.id))) {
                setFavoriteItems(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)))
                axios.delete(`https://64216b8d86992901b2b2f995.mockapi.io/api/v1/favorites/${obj.id}`)
            } else {
                const {data} = await axios.post('https://64216b8d86992901b2b2f995.mockapi.io/api/v1/favorites', obj)
                setFavoriteItems(prev => [...prev, data])
            }
        } catch {
            alert('Не удалось добавить в избранное')
        }
    };
    const onRemoveItem = (id) => {
        axios.delete(`https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart/${id}`)
        setCartItems((prev) => prev.filter(item => item.id !== id))
    };
    const onSearchChange = (event) => {
        setSearchValue(event.target.value)
    };
    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    }
    const isFavorited = (id) => {
        return favoriteItems.some((obj) => Number(obj.parentId) === Number(id));
    }

    return (
        <AppContext.Provider value={{
            items,
            cartItems,
            favoriteItems,
            isItemAdded,
            isFavorited,
            onAddToCart,
            onAddToFavorite,
            setCartOpened,
            setCartItems
        }}>
            <div className="wrapper clear">
                {cartOpened &&
                <SidebarRight
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    opened={cartOpened}
                    onRemove={onRemoveItem}
                />}

                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route path="/" exact element={
                        <Home
                            items={items}
                            cartItems={cartItems}
                            searchValue={searchValue}
                            onSearchChange={onSearchChange}
                            setSearchValue={setSearchValue}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            isReady={isReady}
                        />}>
                    </Route>
                    <Route path="/favorites" exact element={
                        <Favorites/>
                    }>
                    </Route>
                    <Route path="/orders" exact element={
                        <Orders/>
                    }>
                    </Route>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
