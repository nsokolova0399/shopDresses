import React from "react";
import Card from "../components/Card";
import axios from "axios";

function Orders() {
    const [orders, setOrders] = React.useState([])
    const [isReady, setIsReady] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try{
            const {data} = await axios.get('https://64216b8d86992901b2b2f995.mockapi.io/api/v1/order')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setIsReady(false)
            }
            catch(error){
                alert('Ошибка при запросе заказа')
            }
        })()
    }, [])
    return (
        <div className="content" style={{padding: "4rem"}}>
            <div className="d-flex align-center justify-between">
                <h1>Мои заказы</h1>
            </div>
            <div className="cards d-flex">
                <div className="cards d-flex">
                    {(isReady ? [...Array(8)] : orders).map((item, index) => (
                       <Card
                       key={index}
                       loading={isReady}
                       {...item}
                       />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders
