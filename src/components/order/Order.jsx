import './order.scss';


import SelfServiceForm from './order-forms/SelfServiceForm';
import DeliveryForm from './order-forms/DeliveryForm';
import AfterOrderPage from './after-order-page/AfterOrderPage';



import {useState, useEffect} from 'react';

const Order = ()=>{
    useEffect(()=>{
        //ниже из нативного джс, поднимает страницу вверх при монтировании (надо, когда переходим с других роутов)
    window.scrollTo({top: 0,
        lef: 0,
        behavior: "smooth"});
    }, [])

    const [isDelivery, setIsDelivery] = useState(true);
    const [orderSuccess, setOrderSuccess] = useState('');

    console.log(orderSuccess)
    return (
        <>
        <div className="order__wrapper">
        <h2 className='order__title'>Оформлення замовлення</h2>
        <div className="order__way-to-get">
            <button 
            onClick={()=>{setIsDelivery(true)}}
            className={isDelivery ? 'way-to-get__btn way-to-get--active' : 'way-to-get__btn'}>Доставка</button>
            <button 
            onClick={()=>{setIsDelivery(false)}}
            className={isDelivery ? 'way-to-get__btn' : 'way-to-get__btn way-to-get--active'}>Самовиніс</button>
        </div>
        {/* дальше будет условный рендеринг */}
        {isDelivery ? <DeliveryForm type={'Доставка'} setOrderSuccess={setOrderSuccess}/> : 
        <SelfServiceForm setOrderSuccess={setOrderSuccess} type={'Самовиніс'}/>}
        
        {orderSuccess === 'pending' ?  <AfterOrderPage orderSuccess={orderSuccess}/> : null}
        {orderSuccess === 'yes' ? <AfterOrderPage orderSuccess={orderSuccess}/> : null}
        {orderSuccess === 'no' ? <AfterOrderPage orderSuccess={orderSuccess}/> : null}
        </div>
        </>
    )
}


export default Order;