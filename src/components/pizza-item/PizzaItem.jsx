import man from '../../assets/man.png';

import './pizzaItem.scss';
import './m-pizzaItem.scss';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PizzaNamePlusCaloriesInfo from '../pizzaNamePlusCaloriesInfo/PizzaNamePlusCaloriesInfo';

//импортируем экшен для того, чтобы открывать модальное окно для модификации при нажатии "Изменить ингредиенты"
import { goModify } from '../../features/generalSlice';

//импортируем экшены добавления в корзину объекта, плюс и минус
import { addToCart, plusToCart, minusToCart } from '../../features/cartSlice';

 //имортируем наш кастомный хук для определения ширины экрана
 import useMedia768 from '../../hooks/useMedia';



//в пропсах иp ПиццаЛист приходит объект с данными конкретной пиццы (там у нас map)
const PizzaItem = ({info})=>{
  const isMobile = useMedia768();

  //далее до ЮЗЭФФЕКТ реализован попАП для выбора бортиков. Тут же и рефы для того, чтобы определять в какую область клацать. В слушателе событий есть четкая зависимость от появления или скрытия окна, кроме этого - слушатель вешается только в случае, если модальное для бортиков открыто, когда оно будет закрыто, то слушатель будет удален.
  const [bortIndex, setBortIndex] = useState('0');



  const dispatch = useDispatch();
  

//получаем данные из корзины для проверок
const cartData = useSelector(state=>state.cart.cart);


  //получаем объект {порядковый номер:название ингредиента}
  //это делается для того, чтобы потом мы могли перевести порядковые номера, полученные из объектов с пиццами в нормальный язык. А почему я использую порядковые номера вместо буквенных обозначений? Потому что мы с ними формируем уникальные айди, сортируем их (чтобы была идентичность) и т.д. Мне нужны числа, потому что потом я их сортирую, формируя айди, чтобы быть уверенным в порядке. Да и красиво это
    const allIngr = useSelector(state=>state.general.ingr);
    
  //так же поступаем и с бортиками
  const borts = useSelector(state=>state.general.borts);

    
  //деструктуризируем объект с данными пиццы (пропсы) и достаем все, что нужно
    const {id, img, name, price, descr, category, calories, feature, satiety} = info;

    //ниже условия (если есть определенный элемент массива, то показываем определенный контент, если нет, то ничего)
    const isNew = category.includes('new') ? <span className="pizzablock__isNew">NEW</span> : null;
    const isHit = category.includes('hit') ?  <span className="pizzablock__isHit">ХІТ</span> : null;
    const isVegan = feature.includes('vegan') ? <span className="pizzablock__special">ВЕГАН</span> : null;

    //получу статус загрузки ингредиентов, бортиков...
    const loadingIngr = useSelector((state)=>{return state.general.loadingIngr});
    const loadingBorts = useSelector((state)=>{return state.general.loadingBorts})

    //ниже формируем айди, которое будет создавать в корзине уникальную запись + проверки (хотя как знать - может лучше просто проверять на пустоту)
    const fullId = loadingBorts === 'ok' ? id + bortIndex + descr.join('') : null;
    //ниже формируем полную цену для отправки уже с бортиком
    const fullPrice = loadingBorts === 'ok' ? price + borts[bortIndex].price : null;

   //ниже проверка для вывода ингредиентов и их распознавания
   //проверку пришлось делать, иначе иногда бывают ошибки. Тут ведь вычисления... Если ингредиены не загружены, то будет пустота.
   const translateDescr = loadingIngr === 'ok'
   ?
   descr.map((item, ind, arr)=>{
   if(ind === arr.length -1){
     //allIngr[item][0] - из-за структуры моей базы данных
     return `${allIngr[item][0]}`
   } else{
     return `${allIngr[item][0]}, `
   }})   : null;



    return (
      <>
      {
        isMobile ?
        <li className="mmi">
          <div className='mmi__img-wr'>
            {isNew} {isHit} {isVegan}
            <img src={img} alt="" className="mmi__img" />
          </div>
          <div className="mmi__sec-wr">
            <div>
            <h2 className="mmi__pname">{name}</h2>
            <div className="mmi__pdescr">{translateDescr}</div>
            </div>
            <div className="mmi__info-wr">
              <span className="mmi__price">от {price} грн</span>
              <button 
              onClick={()=>{dispatch(goModify(id))}}
              className="mmi__choose">Выбрать</button>
            </div>
          </div>
        </li>

        
        :


        <li className="pizzablock__pizza-item"><img className="pizzablock__pizza-img" src={img} alt=""/>
        <div className="pizzablock__more-info">
          <div>  {isNew} {isHit} </div>
          <div> {isVegan} 
          <img className='pizzablock__people-man' src={man} alt="" />
          <span className="pizzablock__people">{satiety}</span></div>
        </div>
        {/* вывел калории в отдельный компонент, чтобы своим рендером он не затрагивал другие элементы */}
        <PizzaNamePlusCaloriesInfo name={name} calories={calories}/>

        <div className="pizzablock__pizza-descr">{translateDescr}</div>
        <div className="pizzablock__change-ingr">
          
          <span
          onClick={()=>{dispatch(goModify(id))}}
          ><strong>змінити інгредієнти</strong></span></div>
          
        {/* ниже выводим бортики */}
        <div className="modal__borts">
                      
              {
                  Object.keys(borts).map(item=>{
                  return (
                      <span
                      className={item===bortIndex ? 'modal__borts-item modal__borts-item-act' : 'modal__borts-item' } 
                      key={item} onClick={()=>{setBortIndex(item);}}>{borts[item].title}<br></br><span>борт</span>  </span>
                  )
                  })
              }
              </div>
        {/* бортики окончены */}
       
        <div className="pizzablock__order-details"><span className="pizzablock__price">{fullPrice} грн <span style={{fontSize: '10px'}}>(за од.)</span></span> 
       {/*    ниже важное условие - для этого мы и получали юзСелектором данные из корзины. Мы спрашиваем, есть ли в корзине айди, которое способен сгенерировать компонент. Если нет, то значит добавления в корзину еще не было и показывается обычная кнопка с экшеном АДТУКАРТ, но если в редакс-стэйте корзины уже есть пицца или группа пицц под соответствующим АЙДИ, то вместо кнопки добавить в корзину у нас появляется счетчик пицц и сообщение об успешно добавленном товаре */}
        {!cartData[fullId] ?
        <button 
        onClick={()=>{dispatch(addToCart({id: fullId, price: fullPrice, name, bortName: borts[bortIndex].title, img, deleted:[], extra: {}}))}}
        className="pizzablock__addCart-btn">У кошик</button>
          :
          <div>
          У кошику&nbsp;&nbsp;
          <button
          className='btn-minus'
          onClick={()=>{dispatch(minusToCart(fullId))}}
          >-</button> 
          {/* без проверки работать не будет. Мы отрисовывем количество пицц под данным АЙДИ. */}
          <span>{cartData[fullId] ? cartData[fullId].length : 0}</span> 
          <button
           className='btn-plus'
          onClick={()=>{dispatch(plusToCart(fullId))}}
          >+</button>
        </div>
        }
        
    
        </div>
      </li>
      }    

      </>
    )
}






export default PizzaItem;