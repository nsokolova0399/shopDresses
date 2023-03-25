import React from "react";
import Card from './components/Card'
import Header from "./components/Header";
import SidebarRight from "./components/SidebarRight"


function App() {
    const [items, setItems] = React.useState([]);
    // const [cartItems, setCartItems] = React.useState([]);
    const [cartOpened, setCartOpened] = React.useState(false);

   React.useEffect(()=>{
       fetch('https://641eab29ad55ae01ccadd363.mockapi.io/api/v1/items')
           .then((res)=>{
               return res.json();
           })
           .then((json) => {
               setItems(json)
           })
   }, []);

   return (
        <div className="wrapper clear">
            {cartOpened && <SidebarRight onClose={()=> setCartOpened(false)} /> }
            <Header onClickCart={()=> setCartOpened(true)} />
            <div className="content" style={{padding:"4rem"}}>
                <div className="d-flex align-center justify-between" style={{marginBottom: "4rem"}}>
                    <h1>Платья</h1>
                    <div className="search-block">
                        <img style={{width:"1.5rem", height:"1.5rem"}} src="/img/search.svg" alt="Search"/>
                        <input placeholder="Поиск..."/>
                    </div>
                </div>
                <div className="cards d-flex justify-between" style={{padding:"1rem"}}>
                    {items.map((obj) => (
                        <Card
                            title={obj.name}
                            price={obj.price}
                            image={obj.image}
                            onClickPlus
                            onClickFavorite
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
