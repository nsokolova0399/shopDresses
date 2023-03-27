import React from "react";
import Header from "./components/Header";
import SidebarRight from "./components/SidebarRight"
import styles from "./components/SidebarRight/SidebarRight.module.scss";
import axios from 'axios'
import {Route, Routes} from 'react-router-dom'
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favoriteItems, setFavoriteItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');
    React.useEffect(() => {
        axios.get('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/items').then((res) => {
            setItems(res.data)
        })
        axios.get('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart').then((res) => {
            setCartItems(res.data)
        })
        axios.get('https://64216b8d86992901b2b2f995.mockapi.io/api/v1/favorites').then((res) => {
            setFavoriteItems(res.data)
        })
    }, []);
    const onAddToCart = (obj) => {
        axios.post('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart', obj)
        setCartItems(prev => [...prev, obj])
    };
    const onAddToFavorite = (obj) => {
        if(favoriteItems.find((favobj) => favobj.id === obj.id)){
            axios.delete(`https://64216b8d86992901b2b2f995.mockapi.io/api/v1/favorites/${obj.id}`)
            setFavoriteItems(prev => prev.filter((item)=> item.id !== obj.id))
        }
        else{
            axios.post('https://64216b8d86992901b2b2f995.mockapi.io/api/v1/favorites', obj)
            setFavoriteItems(prev => [...prev, obj])
        }
    };
    const onRemoveItem = (id) => {
        axios.delete(`https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart/${id}`)
        setCartItems((prev) => prev.filter(item => item.id !== id))
    };
    const onSearchChange = (event) => {
        setSearchValue(event.target.value)
    };

    return (
        <div className="wrapper clear">
            {cartOpened &&
            <SidebarRight
                items={cartItems}
                onClose={() => setCartOpened(false)}
                onRemove={onRemoveItem}
            />}
            <Header onClickCart={() => setCartOpened(true)}/>
            <Routes>
                <Route path="/" exact element={
                    <Home
                        searchValue={searchValue}
                        onSearchChange={onSearchChange}
                        setSearchValue={setSearchValue}
                        items={items}
                        onAddToCart={onAddToCart}
                        onAddToFavorite={onAddToFavorite}
                    />}>
                </Route>
                <Route path="/favorites" exact element={
                    <Favorites
                        items={favoriteItems}
                        onAddToFavorite={onAddToFavorite}
                    />}>
                </Route>
            </Routes>

        </div>
    );
}

export default App;
