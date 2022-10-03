import PizzaList from "../pizza-list/PizzaList";
import MoreFilters from "./more-filters/MoreFilters";
import useMedia768 from '../../hooks/useMedia.js';
import cart from '../../assets/cart.png';

import './pizzablock.scss';

import {Link} from 'react-router-dom';
import {useState, useRef, useEffect} from 'react';
import { useSelector } from "react-redux";

//данные для формирования сортировки
const liSort = [{cat: "rating", title: 'за рейтингом', order: 'desc'}, {cat: "price", title: 'за зменшенням ціни', order: 'desc'}, {cat: "price", title: 'за збільшенням ціни', order: 'asc'}];
//данные для формиования списка
const liFilters = [{id: '', title: 'Всі'}, {id: 'new', title: 'Новинки'}, {id: 'vegan', title: 'Веганські'}, {id: 'hit', title: 'Топ'}];

const Pizzablock = ()=>{

const isMobile = useMedia768();
const totalPrice = useSelector((state)=>state.cart.totalPriceCart);
const totalCount = useSelector((state)=>state.cart.totalCountCart);

 
//будем делать фильтрацию, локальный стэйт с определенным наименованием условной категории и передавать его в пицца блок, где непосредственно происходит запрос для получения пицц. Это значение будем передавать в http запрос для последующей фильтрации на бєке.
  const [filter, setFilter] = useState('');

  const [filtersMore, setFiltersMore] = useState({});

  //ниже стєйт для сортировки. Тоже будем передавать ниже для хттп запроса...
  const [sorting, setSorting] = useState({cat: "rating", title: 'за рейтингом', order: 'desc'});

  //ниже стэйт для появления блока с фильтрами
  const [isMoreFilters, setIsMoreFilters] = useState(false);
  //ниже стєйт для появления блока сортировки
  const [isSorting, setIsSorting] = useState(false);


  //ниже уже знакомый нам паттерн с рефами и слушателем событий (закрытие окошка сортировки)
  const ref = useRef();
  const triggerRef = useRef();
  const handleClickOutside = (event) =>{
    if (ref.current && !ref.current.contains(event.target) && triggerRef.current && !triggerRef.current.contains(event.target)){
       setIsSorting(!isSorting);
   } 
}

  useEffect(()=>{
  if(isSorting){
   document.addEventListener('click', handleClickOutside, {passive:true});
   return ()=>{
       document.removeEventListener('click', handleClickOutside, {passive:true});
   }
  }
}, [isSorting]);
//паттерн окончен

  //ниже моя уродливая проверка на то, получены ли элементы
  const loadingBorts = useSelector(state=>state.general.loadingBorts);
  const loadingCatOfIngred = useSelector(state=>state.general.loadingCatOfIngred);
  const loadingIngr = useSelector(state=>state.general.loadingIngr);

  //ниже проверка - если произошла ошибка в фетчинге, то вернет пустоту (ведь с этими сущностями мы произодим проверки)
  if (loadingBorts !== 'ok' || loadingCatOfIngred !== 'ok' || loadingIngr !== 'ok' ){
    return null
  }
  //проверка окончена

  const sortItems = liSort.map((item, index)=>{
    return (
    <li 
    onClick={()=>{setSorting(()=>({...sorting, cat: item.cat, title: item.title, order: item.order}));
                  setIsSorting(!isSorting)}}      
    key={item.title+index} className="sort-by-price__li">{item.title}</li>
    )
  });

  //создаем массив фильтров с джсИкс разметкой, тут же проверка на активный класс (привязка АЙДИ фильтра к ЛОКАЛЬНОМУ СТЭЙТУ - filter)
  const liItems = liFilters.map((item,ind)=>{
    return (
      <li 
      onClick={()=>{setFilter(item.id)}}
      key={ind+item.title} className={filter === item.id ? "pizzablock__filter-item pizzablock__filter-active" : "pizzablock__filter-item"}>{item.title}</li>
    )
  });

  //считаем количество задействованных фильтров
  const filtersCount = (filter ? 1 : 0) + Object.keys(filtersMore).length;



    return (
      <>
        <div className="pizzablock" id="pizzablock">
              <div className="wrap-for-mobile">
              <h2 className="pizzablock__title">ПІЦА</h2>
              <div className="pizzablock__filter-sort">
                <ul className="pizzablock__filter-items">
                 {liItems}
                </ul>
                {/* //ниже будет также условие, по которому будет появляться возможность удаления фильтров (только если их будет больше 0) */}

                {filtersCount ? <div 
                onClick={()=>{setFiltersMore({}); setFilter(''); setIsMoreFilters(false)}}
                className="pizzablock__reset-filters">скинути всі ({filtersCount}) фільтри ╳</div> : null}
                <div 
                onClick={()=>{setIsMoreFilters(!isMoreFilters)}}
                className={Object.keys(filtersMore).length>0 ? 'pizzablock__morefilters pizzablock__morefilters-active' : 'pizzablock__morefilters'}>Більше фільтрів {isMoreFilters ? '▲' : '▼'}</div>
              </div>
              {isMoreFilters ? <MoreFilters filtersMore={filtersMore} setFiltersMore={setFiltersMore}/> : null}
              
              <div className="sort-by-price"
              ref={triggerRef}
              onClick={()=>{setIsSorting(!isSorting)}}>{sorting.title} {isSorting ? '▲' : '▼'}</div>
              
              <div style={{position: 'relative'}}>
                {isSorting ? <ul ref={ref} className="sort-by-price__ul">
                  {sortItems} </ul> : null}
              </div>
              </div>
                 {/*  передаем пропс фильтр и сортинг для последующего ХТТП запроса и фильтерсМор тоже для фильтрации, но уже не через запрос (потому что джсон сервер не справляется c двумя и более запросами)*/}
                  <PizzaList filter={filter} sorting={sorting} filtersMore={filtersMore}/>             
            </div>


                  {/* //будем на мобильных показывать кнопку корзины внизу экрана */}
                  {isMobile && (totalCount > 0) ?
      
                  <Link to='/cart'>
                  <div className="fixed-cart">
                    <div className="fixed-cart__colone">
                    <span>{totalCount}</span>
                    <img src={cart} alt="" />
                    </div>
                   
                    <span className="fixed-cart__price">{totalPrice} грн</span>
                  </div>
                  </Link>
                  : null}

</>
    )
}




export default Pizzablock;