import {useState, useEffect, useRef} from 'react';
import { useDispatch} from 'react-redux';
import { resetAllCart } from '../../../features/cartSlice';

/* import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { setHours, setMinutes }from 'date-fns';
import uk from 'date-fns/locale/uk';
import "react-datepicker/dist/react-datepicker.css"; */
import PhoneInput from 'react-phone-input-2'


import {useSelector} from 'react-redux';

/* import {Day, Time} from './DataPickers' */


const city = {0:{city: 'Добропілля', price: '60-85 грн'}, 1:{city: 'Ганнівка', price: '140 грн'}, 2:{city: 'Святогорівка', price: '200 грн'}};

const DeliveryForm = ({type, setOrderSuccess})=>{
    
    const dispatch = useDispatch();

    const [namer, setNamer] = useState(localStorage.getItem('namer') || '');
    const [phone, setPhone] = useState(localStorage.getItem('phone') || '');
    const [street, setStreet] = useState(localStorage.getItem('street') || '');
    const [house, setHouse] = useState(localStorage.getItem('house') || '');
    const [aprts, setAprts] = useState(localStorage.getItem('aprts') || '');
    const [floor, setFloor] = useState('');
    const [entrance, setEntrance] = useState('');
    const [code, setCode] = useState('');
    const [comments, setComments] = useState('');
    const [customDate, setCustomDate] = useState('');
    const [chosenCity, setChosenCity] = useState(localStorage.getItem('city') || 0);

    //если эсФаст тру, значит доставка нужна как можно быстрее, иначе - на конкретное время и дату - появляется соответствующие инпуты (опять же условный рендеринг)
    const [isAsFast, setIsAsFast] = useState(true);
    //получим конечную стоимость для отображения перед кнопкой заказа
    const totalPrice = useSelector(state=>state.cart.totalPriceCart);



    //ниже решение такое себе...
    //ниже таймЮА - по умолчанию сделал его как время открытия заведения. Здесь у нас создается новый экземпляр объекта ДАТА с кастомными часами и минутами.
    //формат такой: Sun Sep 04 2022 15:45:00 GMT+0300 (Восточная Европа, летнее время)
    //такое поведение понадобится в компонентах РЕАКТ-ДАТАПИКЕРА
   /*  const [timeUa, setTimeUa] = useState(setHours(setMinutes(new Date(), 0), 10)) */

  

    //ниже при монтировании компонента я делаю запрос, чтобы получить время по Киеву.
    //получаю объект в ключе DATETIME которого хранится значение: '2022-09-04T13:59:56.063025+03:00'
    //однако РЕАКТ-ДАТАПИКЕР работает, только с таким форматом Sun Sep 04 2022 15:45:00 GMT+0300 (Восточная Европа, летнее время)
    //поєтому мы снова обращаемся к конструтору ДАТЫ и записываем необходимое значение в СТЭЙТ. Теперь изначально указанное время- текущее время.
    //записіваю в СТЭЙТ этого компонента, чтобы затем ПРОПСАМИ передать его в два компонента РЕАКТ-ДАТАПИКЕРА (ТАЙМ и ДЭЙТ)
 /*    useEffect(()=>{
        fetch('http://worldtimeapi.org/api/timezone/Europe/Kiev')
        .then(res=>res.json())
        .then(res=>setTimeUa(new Date(res.datetime)));

        //ниже при монтировании компонента зарегистрировал украинскую локализацию для РЕАКТ-ДАТАПИКЕРА
        registerLocale('uk', uk)
        setDefaultLocale('uk')
    }, [isAsFast])
    //выше решение такое себе... */

    //clarify - уточнение - условній рендеринг для отображения инпутов с подъездом, этажом (опциция)
    const [clarify, setClarify] = useState(false);


    const [chooseCityPopUp, setChooseCityPopUp] = useState(false);
    

    const handleClick = ()=>{
        setChooseCityPopUp(false);
    }
    useEffect(()=>{
        document.addEventListener('click', handleClick);
        return ()=>{document.removeEventListener('click', handleClick);} 
    }, [setChooseCityPopUp])

    //далее функционал тоже для условного рендеринга, платить после доставки или онлайн
    const [payAfter, setPayAfter] = useState(true);
    //далее функционад для понимания - нужно ли перезванивать
    const [wishCall, setWishCall] = useState(true);

    //надо же отправлять данные из корзины...
    const cartData = useSelector(state=>state.cart.cart);
    const ingr = useSelector(state=>state.general.ingr);
    const loadingIngr = useSelector(state=>state.general.loadingIngr);

    if(loadingIngr !== 'ok'){return null};
    const arrOfPizzas = Object.values(cartData).map((item=>{
        const {extra} = item[0];
    
        const deleted = item[0].deleted.map(item=>`(${ingr[item][0]})`);
        const extras = Object.keys(extra).map(item=>{return `(${ingr[item][0]} - x${extra[item].length})`}) 
        return `\n\n➤ <b>х${item.length} - ${item[0].name.toUpperCase()}</b> - ${item[0].price * item.length} грн ||| <b>борт ${item[0].bortName}</b> ${deleted.length !== 0 ? `||| <b>видалено з піци:</b> ${deleted}` : ``} ${extras.length !== 0 ? `||| <b>додано до піци:</b> ${extras}` : ``}`;
    }));
  

    const downSymbol = clarify ? '▲' : '▼';
    const downSymbol2 = chooseCityPopUp ? '▲' : '▼';

    const chooseElemTown = Object.keys(city).map(item=>{
        return (
            <li
            className='delivery__city-li'
            onClick={()=>{setChosenCity(item);
                        setChooseCityPopUp(false)}}
            >{city[item].city} - {city[item].price}</li>
        )})
   

    return (
        <form className="delivery" action="">
            <fieldset className="delivery__contact-fieldset">
            <legend className="delivery__contact-legend">Контактна інформація</legend>

            <div>
            <label className='delivery-label-star' for='namer'>ім'я</label>
            <input 
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

            <fieldset className="delivery__address-fieldset">
                <legend className="delivery__address-legend">Адреса</legend>
                <span 
                onClick={(e)=>{
                   e.stopPropagation();
                    setChooseCityPopUp(!chooseCityPopUp)}}
                className="delivery__city" aria-hidden="true">{city[chosenCity].city} {downSymbol2}</span>
                <div className='delivery__cost'>вартість доставки {city[chosenCity].price}</div>
                
                {chooseCityPopUp ?
                <div style={{position:'relative'}}>
                <ul className="delivery__city-ul">
                    { chooseElemTown}
                </ul>
               </div>
             
                : null     }
              

                <div className='delivery__address-first-wrapper'>
                
                <div>
                <label className='delivery-label-star' for='street'>вул.</label>
                <input 
                value={street}
                onChange={(e)=>{setStreet(e.target.value)}}
                id='street'
                name="street" type="text" className="delivery__street" />
                </div>
               
                <div>
                <label className='delivery-label-star' for='house'>буд.</label>
                <input 
                onChange={(e)=>{setHouse(e.target.value)}}
                id='house'
                value={house}
                name="house" type="text" className="delivery__house" />
                </div>

                <div>
                <label for='aprts'>кв.</label>
                <input 
                id='aprts'
                value={aprts}
                onChange={(e)=>{setAprts(e.target.value)}}
                name="aprts" type="text" className="delivery__flat" placeholder="квартира / офіс"/>
                </div>
                </div>

                <span 
                onClick={()=>{setClarify(!clarify)}}
                className="clarify">Вказати під'їзд, код, поверх {downSymbol}</span>
                {clarify && <div 
                className='delivery__address-second-wrapper'>
                
                <div> 
                <label for="entrance">під'їзд</label>
                <input 
                onChange={(e)=>{setEntrance(e.target.value)}}
                id='entrance'
                name="entrance" type="text" className="delivery__entrance" />
                </div>

                <div>
                <label for="code">код</label>
                <input 
                onChange={(e)=>{setCode(e.target.value)}}
                id='code'
                name="code" type="text" className="delivery__house" />
                </div>

                <div>
                <label for="floor">поверх</label>
                <input 
                onChange={(e)=>{setFloor(e.target.value)}}
                id='floor'
                name="floor" type="text" className="delivery__flat" />
                </div>
                </div>}
             

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
                <p className='order__time-info'>*Ми намагатимося привезти ваше замовлення настільки швидко, наскільки це можливо з урахуванням актуальної черги.</p>
                :
                /* <div style={{marginTop:'15px', display: 'flex'}}>
                 <Time timeUa={timeUa}/> 
                <Day timeUa={timeUa}/> 
                </div> */
                <textarea
                value={customDate}
                onChange={(e)=>{setCustomDate(e.target.value)}}
                className='order__custom-date' name="date" placeholder='Наприклад: "сьогодні о 15:00..."'></textarea>
                }
            </fieldset>

            <fieldset className="delivery__pay-fieldset">
                <legend className="delivery__pay-label">Оплата</legend>
                <div className="delivery__data-choose-wrapper">
                    {/* использую ниже условный рендеринг для того, чтобы отмечать активный выбор */}
                    <div 
                    onClick={()=>{setPayAfter(true)}}
                    className='asFast'><span className={payAfter ? 'custom-radio checked': 'custom-radio'}></span>Оплата при отриманні</div>
                    <div 
                    className='onTheData'><span className={payAfter ? 'custom-radio' : 'custom-radio checked'}></span><strike>Оплата online</strike> (тимчасово недоступна)</div>
                </div>
                {payAfter ?
                    <p className='order__pay-info'>*Ви зможете оплатити своє замовлення безпосередньо після його отримання. <br></br>Наш драйвер прйме оплату готівкою або через безготівковий розрахунок, використовуючи банківський міні-термінал.</p>
                    : null
                    }
            </fieldset>

            <fieldset className="order__add-fieldset">
                <legend className='order__add-label'>Додаткова інформація</legend>
                <p className='order__ask-for-call'>Передзвонити для уточнення замовлення?</p>
                <div className="delivery__data-choose-wrapper">
                    {/* использую ниже условный рендеринг для того, чтобы отмечать активный выбор */}
                <div 
                    onClick={()=>{setWishCall(true)}}
                    className='asFast'><span className={wishCall ? 'custom-radio checked': 'custom-radio'}></span>Так</div>
                <div 
                    onClick={()=>{setWishCall(false)}}
                    className='onTheData'><span className={!wishCall ? 'custom-radio checked': 'custom-radio'}></span>Ні</div>
                </div>
                {wishCall ? null : <p className='delivery-note-about-call'>Але якщо у нас виникнуть питання, ми всеодно муситимо вам подзовнити :)</p>}
                <p className='order__message-todel'>Коментар до служби доставки</p>
                <textarea
                value={comments}
                onChange={(e)=>{setComments(e.target.value)}}
                className='order__comments' name="comments" placeholder='залиште повідомлення у цьому текстовому полі, якщо бажаєте...'></textarea>
            </fieldset>
            <div className="order__form-totalPrice">Вартість замовлення - {totalPrice} грн</div>
            <div className='order__form-deliveryPrice'>*послуга доставки - {city[chosenCity].price}</div>
            
            {/* ниже будет проверка. Если сумма нулевая, то вместо кнопки подтверждения заказа - мы будем показывать надпись */}
            {totalPrice == 0 ?
            <div className='order__attention-empty'>Спершу додайте товар до кошика... :)</div>
                :
            <button
            onClick={(e)=>{e.preventDefault();

                            //самая простая проверка на наличие обязательных полей
                            if(namer.length === 0 || phone.length === 0 || street.length === 0 || house.length === 0){
                                alert("Будь ласка, заповніть усі обов'язкові поля (ім'я, номер, вулиця, будинок), інакше замовлення не буде опрацьовано.");
                                return
                            }
                            setOrderSuccess('pending');
                            const i = {
                                parse_mode: 'HTML',
                                text: `
                                <b>Клієнт:</b> ${namer}\n<b>Телефон:</b> +${phone}\n■ <b>${type} в ${city[chosenCity].city}</b> за <b>адресою:</b> ${street}, <b>будинок:</b> ${house}${aprts ? `<b>, квартира:</b> ${aprts}` : ''}${entrance ? `<b>, під'їзд:</b> ${entrance}` : ''}${code ? `<b>, код:</b> ${code}` : ''}${floor ? `<b>, поверх:</b> ${floor}`:''} ${isAsFast ? `\n<b>Просять якомога скоріше</b>` : `\n<b>Замовлення на певний час:</b> ${customDate}`} ${wishCall ? `` : '\n\n<b>Просять не передзвонювати</b>'} ${comments ? `\n<b>Коментар до замовлення:</b> ${comments}` : ''}
                                \n<b>Загальна сума замовлення:</b> ${totalPrice} грн + за доставку ${city[chosenCity].price}${arrOfPizzas}
                                `, 
                                chat_id: "-1001721175338",
                               
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
                                    localStorage.setItem('street', street);
                                    localStorage.setItem('house', house);
                                    localStorage.setItem('aprts', aprts);
                                    localStorage.setItem('city', chosenCity)
                                    dispatch(resetAllCart());
                                    setOrderSuccess('yes')
                                }
                            })

                          
                        }}
            className="order__submit-btn">Зробити замовлення</button>
            }
        </form>
    )
}



export default DeliveryForm;