import React from "react";
import Card from './components/Card'
import Header from "./components/Header";
import SidebarRight from "./components/SidebarRight"

// const arr = [
//     {name: 'Платье мини с оборками и высоким воротником из цветочного принта', price:142, image:'/img/1.webp'},
//     {name: 'Черное корсетное платье мини с корсетными рукавами и корсетными рукавами', price:120, image:'/img/2.webp'},
//     {name: 'Черно-белое корсетное платье мини из букле с вырезом сердечком', price:105, image:'/img/3.webp'},
//     {name: 'Розовое платье мини с открытыми плечами и кисточками', price:140, image:'/img/4.webp'},
// ]

function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
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
