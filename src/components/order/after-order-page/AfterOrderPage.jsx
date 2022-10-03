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
                {orderSuccess === 'yes' ?  <div className='afterOrder-modal__content-thx'><div>Дякуємо за замовлення!<br/>Воно вже полетіло в обробку!</div><Link  className='afterOrder-modal__content-btn' to='/'>Повернутися на головну сторінку</Link> </div> : null}
                {orderSuccess === 'no' ? <div className='afterOrder-modal__content-err'> <div>Щось пішло не так... Замовлення не зроблено, спробуйте повторити спробу...</div><Link className='afterOrder-modal__content-btn' to='/'>Повернутися на головну сторінку</Link></div>: null}

                
            </div>
            
        </div>
    )
}

export default AfterOrderPage;