import React from "react";
import Card from './components/Card'
import Header from "./components/Header";
import SidebarRight from "./components/SidebarRight"
import styles from "./components/SidebarRight/SidebarRight.module.scss";
import axios from 'axios'

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onAddToCart = (obj)=>{
        axios.post('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart',obj)
        setCartItems(prev => [...prev, obj])
    };
    const onDeleteToCart = (id)=>{
        setCartItems(cartItems.filter(item => item !== id))
        axios.delete(`https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart/${id}`)
    };
    const onSearchChange = (event) =>{
        setSearchValue(event.target.value)
    };
   React.useEffect(()=>{
       // fetch('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/items')
       //     .then((res)=>{
       //         return res.json();
       //     })
       //     .then((json) => {
       //         setItems(json)
       //     })
       axios.get('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/items').then((res) => {setItems(res.data)})
       axios.get('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/cart').then((res) => {setCartItems(res.data)})
   }, []);

   return (
        <div className="wrapper clear">
            {cartOpened &&
            <SidebarRight
                items={cartItems}
                onClose={()=> setCartOpened(false)}
                onDelete={(obj) => onDeleteToCart(obj)}
            /> }
            <Header onClickCart={()=> setCartOpened(true)} />
            <div className="content" style={{padding:"4rem"}}>
                <div className="d-flex align-center justify-between">
                    <h1>{searchValue ? `Поиск по запросу: "${searchValue}"`: "Платья"}</h1>

                    <div className="search-block mr-10 d-flex align-center">
                        <img style={{width:"1.5rem", height:"1.5rem"}} src="/img/search.svg" alt="Search"/>
                        <input onChange={onSearchChange} value={searchValue} placeholder="Поиск..."/>
                        {searchValue &&<img  onClick={()=>setSearchValue('')} className="removeButton d-flex" style={{width:"3.2rem", height:"3.2rem"}} src="/img/cartRemove.svg" alt="Clear"/>}

                            </div>

                         </div>

                <div className="cards d-flex">
                    {items
                        .filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((obj) => (
                        <Card
                            key={obj.name}
                            name={obj.name}
                            price={obj.price}
                            image={obj.image}
                            onPlus={(obj)=> onAddToCart(obj)}
                            onFavorite={()=> {}}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
