import {useState, useEffect, useRef} from 'react';
import { useDispatch } from 'react-redux';
import { resetAllCart } from '../../../features/cartSlice';

import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { setHours, setMinutes }from 'date-fns';
import uk from 'date-fns/locale/uk';
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from 'react-phone-input-2'


import {useSelector} from 'react-redux';

import {Day, Time} from './DataPickers'




const SelfServiceForm = ({type, setOrderSuccess})=>{
    const dispatch = useDispatch();

    const [namer, setNamer] = useState(localStorage.getItem('namer') || '');
    

    const refName = useRef(0);
    


    const [phone, setPhone] = useState(localStorage.getItem('phone') || '');
    const [comments, setComments] = useState('');

    //если эсФаст тру, значит доставка нужна как можно быстрее, иначе - на конкретное время и дату - появляется соответствующие инпуты (опять же условный рендеринг)
    const [isAsFast, setIsAsFast] = useState(true);
    //получим конечную стоимость для отображения перед кнопкой заказа
    const totalPrice = useSelector(state=>state.cart.totalPriceCart);

    //ниже решение такое себе...
    //ниже таймЮА - по умолчанию сделал его как время открытия заведения. Здесь у нас создается новый экземпляр объекта ДАТА с кастомными часами и минутами.
    //формат такой: Sun Sep 04 2022 15:45:00 GMT+0300 (Восточная Европа, летнее время)
    //такое поведение понадобится в компонентах РЕАКТ-ДАТАПИКЕРА
    const [timeUa, setTimeUa] = useState(setHours(setMinutes(new Date(), 0), 10))

  

    //ниже при монтировании компонента я делаю запрос, чтобы получить время по Киеву.
    //получаю объект в ключе DATETIME которого хранится значение: '2022-09-04T13:59:56.063025+03:00'
    //однако РЕАКТ-ДАТАПИКЕР работает, только с таким форматом Sun Sep 04 2022 15:45:00 GMT+0300 (Восточная Европа, летнее время)
    //поєтому мы снова обращаемся к конструтору ДАТЫ и записываем необходимое значение в СТЭЙТ. Теперь изначально указанное время- текущее время.
    //записіваю в СТЭЙТ этого компонента, чтобы затем ПРОПСАМИ передать его в два компонента РЕАКТ-ДАТАПИКЕРА (ТАЙМ и ДЭЙТ)
    useEffect(()=>{
        fetch('http://worldtimeapi.org/api/timezone/Europe/Kiev')
        .then(res=>res.json())
        .then(res=>setTimeUa(new Date(res.datetime)));

        //ниже при монтировании компонента зарегистрировал украинскую локализацию для РЕАКТ-ДАТАПИКЕРА
        registerLocale('uk', uk)
        setDefaultLocale('uk')
    }, [isAsFast])
    //выше решение такое себе...

 
    //далее функционад для понимания - нужно ли перезванивать
    const [wishCall, setWishCall] = useState(true);




   

    return (
        <form className="delivery" action="">
            <fieldset className="delivery__contact-fieldset">
            <legend className="delivery__contact-legend">Контактна інформація</legend>

            <div>
            <label className='delivery-label-star' for='namer'>ім'я</label>
            <input 
            ref={refName}
            className="delivery__contact-name" id="namer" name="namer" type="text"  value={namer} onChange={(e)=>{setNamer(e.target.value)}}/>
            </div>
           
           <div className='delivery__contact-phone-wrapper'>
           <label className='delivery-label-star'>тел.</label>
            <PhoneInput
                inputClass={'delivery__contact-phone'}
                placeholder={'Телефон'}
                disableDropdown={true}
                country={'ua'}
                countryCodeEditable={false}
                onlyCountries={['ua']}
                value={phone}
                onChange={(phone) => setPhone( phone )}
            />
            </div>
           
           {/*  <input 
             onChange={(e)=>{setPhone(e.target.value)}}
            className="delivery__contact-phone" name="phone" type="text" placeholder="Телефон"value={phone} /> */}
            </fieldset>

           
            <fieldset className="delivery__data-fieldset">
                <legend className="delivery__data-legend">Час та дата</legend>
                <div className="delivery__data-choose-wrapper">
                    {/* использую ниже условный рендеринг для того, чтобы отмечать активный выбор */}
                    <div 
                    onClick={()=>{setIsAsFast(true)}}
                    className='asFast'><span className={isAsFast ? 'custom-radio checked': 'custom-radio'}></span>Якомога швидше</div>
                    <div 
                    onClick={()=>{setIsAsFast(false)}}
                    className='onTheData'><span className={isAsFast ? 'custom-radio' : 'custom-radio checked'}></span>На певний час / дату</div>
                </div>
                {isAsFast 
                ?
                <p style={{marginTop: '15px'}}>*Ми намагатимося привезти ваше замовлення настільки швидко, наскільки це можливо з урахуванням актуальної черги.</p>
                :
                <div style={{marginTop:'15px', display: 'flex'}}>
                <Time timeUa={timeUa}/> 
                <Day timeUa={timeUa}/>
                </div>
                }
            </fieldset>

            
            <fieldset className="order__add-fieldset">
                <legend className='order__add-label'>Додаткова інформація</legend>
                <p style={{marginTop: '15px'}}>Передзвонити для уточнення замовлення?</p>
                <div className="delivery__data-choose-wrapper">
                    {/* использую ниже условный рендеринг для того, чтобы отмечать активный выбор */}
                <div 
                    onClick={()=>{setWishCall(true)}}
                    className='asFast'><span className={wishCall ? 'custom-radio checked': 'custom-radio'}></span>Так</div>
                <div 
                    onClick={()=>{setWishCall(false)}}
                    className='onTheData'><span className={!wishCall ? 'custom-radio checked': 'custom-radio'}></span>Ні</div>
                </div>
                {wishCall ? null : <p className='delivery-note-about-call'>Але якщо з вашим замовленням виникнуть труднощі, ми всеодно муситимо вам подзовнити.</p>}
                <p style={{marginTop: '15px'}}>Коментар до служби доставки</p>
                <textarea
                value={comments}
                onChange={(e)=>{setComments(e.target.value)}}
                className='order__comments' name="comments" placeholder='залиште повідомлення у цьому текстовому полі, якщо бажаєте...'></textarea>
            </fieldset>
            <div className="order__form-totalPrice">Всього до сплати {totalPrice} грн</div>
            {/* ниже будет проверка. Если сумма нулевая, то вместо кнопки подтверждения заказа - мы будем показывать надпись */}
            {totalPrice == 0 ?
            <div style={{textAlign: 'center', marginTop: '15px'}}>Аби зробити замовлення, додайте товар до кошика...</div>
                :
            <button
            onClick={(e)=>{e.preventDefault();

                            //самая простая проверка на наличие обязательных полей
                            if(namer.length === 0 || phone.length === 0){
                                alert("Будь ласка, заповніть усі обов'язкові поля (ім'я, номер, вулиця, будинок), інакше замовлення не буде опрацьовано.");
                                return
                            }
                            setOrderSuccess('pending');
                            const i = {
                                parse_mode: 'HTML',
                                text: `<b>Поступил</b> новый заказ от клиента по имени: ${namer}. \nТелефон: ${phone}. 
                                \nТип заказа: ${type}
                                \n${isAsFast ? 'просят как можно скорее' : 'заказ на конкретное время'}, \n${wishCall ? 'просят перезвонить для уточнения' : 'просят не перезванивать'}, \n<pre>клиент оставил комментарий к своему заказу следующего характера: "${comments || 'Очень ждем вкусную и качественную пиццу'}"</pre>`,
                                chat_id: "-666532020",
                    
                                }
                            
                            fetch('https://api.telegram.org/bot5775123731:AAEM6weVVyw5rNROu5H2-_EsU9TtI19utVg/sendMessage', {
                            method: 'POST', 
                            
                                body: JSON.stringify(i), 
                                headers: {
                                'Content-Type': 'application/json'
                                }
                            })
                            .then(res=>res.json())
                            .catch(e=>setOrderSuccess('no'))
                            .then(res=> {
                                if(!res.ok){ 
                                    console.log(res, 'Пошло что-то не так... Попробуйте еще раз')
                                    setOrderSuccess('no')}
                                else{
                                      //отправляем данные в локалСторэйдж
                                    localStorage.setItem('phone', phone);
                                    localStorage.setItem('namer', namer);
                                    dispatch(resetAllCart());
                                    setOrderSuccess('yes')
                                }
                            })

                          
                        }}
            className="order__submit-btn">Подтвердить заказ</button>
            }
        </form>
    )
}



export default SelfServiceForm;