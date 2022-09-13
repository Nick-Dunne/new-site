import './after-order-page.scss';


import spinner from '../../../assets/spinner.gif';

import {Link} from 'react-router-dom';
import {useEffect} from 'react'

const AfterOrderPage = ({orderSuccess})=>{
    

      //когда открывается модальное окно, мы будем убирать скролл с основной части сайта. При размонтировании скрол будет снова добавляться.
      useEffect(()=>{
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = 'auto';
        }
    }, [])
    return (
        <div className="afterOrder-modal">

            <div className="afterOrder-modal__content">
                {orderSuccess === 'pending' ? <img src={spinner} alt="" /> : null }
                {orderSuccess === 'yes' ? <div>Спасибо за заказ!<br/>Он уже полетел в обработку!</div> : null}
                {orderSuccess === 'no' ? <div>Произошла какая-то ошибка...</div> : null}
                <button><Link to='/'>Вернуться на главную страницу</Link></button>
            </div>
            
        </div>
    )
}

export default AfterOrderPage;