import './addIngredients.scss';
import './m-addIngredients.scss';

import plus from '../../../assets/plus.png';

import { useSelector} from 'react-redux';
import {  useState, useRef, useEffect } from 'react';

import useMedia768 from '../../../hooks/useMedia';





const AddIngredients = ({formStateWithExtraIngr, extraIngr, minusExtraIngr, setIsMobileWantAdd, setExtraIngr})=>{

    const isMobile = useMedia768();

    //создам функцию, которая будет просчитывать количество добавленных ингредиентов (для категорий)
const countForCat = (cat)=>{
    const reg = new RegExp(`^${cat}`)
    const initial = 0;
    return Object.keys(extraIngr).filter(item=>item.match(reg)).reduce((acc,cur)=>{return acc+extraIngr[cur].length}, initial);
}

    

  
    //in View мы передаем активный класс категории под АЙДИ 2, если посмотреть на базу данных, то все МЯСные продукты начинаются на двойку, именно поэтому ниже ты найдешь регулярное выражение.
    const [activeClass, setActiveClass] = useState(2);
    // addIngredients__borderB
    //ниже сделаем разніе фоны для разных категорий
    //создадим переменную, чтобы менять в зависимости от ширина экрана ситли
    const classChosen = isMobile ? 'm-addIngredients__ingr' : 'addIngredients__ingr';
    let ingredientsColorStyle = '';

    switch(activeClass.toString()){
        case '2': ingredientsColorStyle = classChosen + ' lred';
        break;
        case '4': ingredientsColorStyle = classChosen + ' lgreen';
        break;
        case '8': ingredientsColorStyle = classChosen + ' lyel';
        break;
        case '7': ingredientsColorStyle = classChosen + ' lred';
        break;
        default: ingredientsColorStyle = classChosen;
    };
    

    const allIngredients = useSelector(state=>state.general.ingr);
    const regExp = new RegExp(`^${activeClass}`,'g');
    const filteredIngred = Object.keys(allIngredients).filter(item=>{
         return item.match(regExp)}).map((item, index)=>{
            return (
                <>  
                {
                    isMobile ? 

                    <li className={ingredientsColorStyle} key={item+1+index}>
                    
                    <div className='m-addIngredients__wr-info'>
                    <span className="addIngredients__ingr-title">{allIngredients[item][0]}</span>
                    
                    <div className='m-addIngredients__ingr-price-wrapper'><span>(порція&nbsp;</span><span className="addIngredients__ingr-price">{allIngredients[item][1]} грн)</span></div>
                    </div>

                    {!extraIngr[item] ?
                    <img 
                    src={plus}
                    alt='plus'
                    onClick={()=>{formStateWithExtraIngr(item, allIngredients[item][1])}}
                    className="m-addIngredients__ingr-count"></img> 
                    : 
                    <div className="m-addIngredients__config-count">
                    <button 
                    onClick={()=>{minusExtraIngr(item)}}
                    className="m-addIngredients__minus">-</button> 
                    <span
                      className="aside-cart__count">{extraIngr[item].length}</span> 
                    <button
                    onClick={()=>{formStateWithExtraIngr(item, allIngredients[item][1])}}
                    className="m-addIngredients__plus">+</button></div>
                    }
                 
                </li>

                

                    :
                  


                <li className={ingredientsColorStyle} key={item}>
                    <span className="addIngredients__ingr-title">{allIngredients[item][0]}</span>
                    <div>
                    <div className='addIngredients__ingr-price-wrapper'><span>порція&nbsp;</span><span className="addIngredients__ingr-price">{allIngredients[item][1]} грн</span></div>
                    {!extraIngr[item] ?
                    <img 
                    src={plus}
                    alt='plus'
                    onClick={()=>{formStateWithExtraIngr(item, allIngredients[item][1])}}
                    className="addIngredients__ingr-count"></img> 
                    : 
                    <div className="aside-cart__footer-config-count">
                    <button 
                    style={{width: '20px', height: '20px', marginRight: '2px'}}
                    onClick={()=>{minusExtraIngr(item)}}
                    className="aside-cart__min">-</button> 
                    <span
                      className="aside-cart__count">{extraIngr[item].length}</span> 
                    <button
                    style={{width: '20px', height: '20px', marginLeft: '2px'}}
                    onClick={()=>{formStateWithExtraIngr(item, allIngredients[item][1])}}
                    className="aside-cart__plus">+</button></div>
                    }
                    
                    </div>
                </li>
         
                }
                </>
            )
         })


    const catOfIngred = useSelector(state=>state.general.catOfIngred);


    const categories = Object.keys(catOfIngred).map((item, index)=>{
        const classNames = activeClass == item ? 'addIngredients__ingr-cat addIngredients__borderB' : 'addIngredients__ingr-cat';
        const count = countForCat(item) ? ' (' + countForCat(item) + ')' : null;
        if(item == 1 || item == 3){
            return null;
        }
        return (
            <li 
            onClick={()=>{setActiveClass(item)}}
            id={item} key={item + 1 + index} className={classNames}>{catOfIngred[item]}{count}</li>
        )

    })
   

    return (
       <>

        {   isMobile 
            ?
            <>
            
            {
                <div 
                className="m-addIngredients__wr">

                <div>
                    <ul className="addIngredients__cat-list m-addIngredients__cat-list">
                {categories}
                </ul>
                <div>
                    <ul className="m-addIngredients__list">
                        {filteredIngred}
                    </ul>
                </div> 
                {activeClass == 2 ? <div style={{fontSize: 12, marginTop: 5}}>*здебільшого стандартна піца скадається з щонайменше 4 порцій м'ясних виробів</div> : null}
                </div>
                <button
                className = 'm-addIngredients__reset-mod' 
                onClick={()=>{setExtraIngr({})}}>Очистити весь вибір</button>
                    
                    <button
                    className = 'm-addIngredients__submit' 
                    onClick={()=>{setIsMobileWantAdd(false)}}>Завершити додавання інгредієнтів</button>
                
                
                </div>

                  
                    
               
            }
             
            </>


            :

            <>
            <ul className="addIngredients__cat-list">
            {categories}
            </ul>
            <div>
                <ul className="addIngredients__list">
                    {filteredIngred}
                </ul>
            </div>
            {activeClass == 2 ? <div style={{fontSize: 12,}}>*здебільшого стандартна піца скадається з щонайменше 4 порцій м'ясних виробів</div> : null}
            </>
        }
       </>
    )
}


export default AddIngredients;