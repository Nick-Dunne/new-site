import './addIngredients.scss';

import { useSelector} from 'react-redux';
import {  useState } from 'react';





const AddIngredients = ({formStateWithExtraIngr, extraIngr, minusExtraIngr})=>{



    //in View мы передаем активный класс категории под АЙДИ 2, если посмотреть на базу данных, то все МЯСные продукты начинаются на двойку, именно поэтому ниже ты найдешь регулярное выражение.
    const [activeClass, setActiveClass] = useState(2);
    // addIngredients__borderB
    //ниже сделаем разніе фоны для разных категорий
    let ingredientsColorStyle = '';
    switch(activeClass){
        case '2': ingredientsColorStyle = 'addIngredients__ingr lred';
        break;
        case '4': ingredientsColorStyle = 'addIngredients__ingr lgreen';
        break;
        case '8': ingredientsColorStyle = 'addIngredients__ingr lyel';
        break;
        case '7': ingredientsColorStyle = 'addIngredients__ingr lred';
        break;
        default: ingredientsColorStyle = 'addIngredients__ingr';
    };
    

    const allIngredients = useSelector(state=>state.general.ingr);
    const regExp = new RegExp(`^${activeClass}`,'g');
    const filteredIngred = Object.keys(allIngredients).filter(item=>{
         return item.match(regExp)}).map(item=>{
            return (
                <li className={ingredientsColorStyle} key={item}>
                    <span className="addIngredients__ingr-title">{allIngredients[item][0]}</span>
                    <div>
                    <div className='addIngredients__ingr-price-wrapper'><span>порція&nbsp;</span><span className="addIngredients__ingr-price">{allIngredients[item][1]} грн</span></div>
                    {!extraIngr[item] ?
                    <span 
                    onClick={()=>{formStateWithExtraIngr(item, allIngredients[item][1])}}
                    className="addIngredients__ingr-count">➕</span> 
                    : 
                    <div className="aside-cart__footer-config-count">
                    <button 
                    style={{width: '15px', marginRight: '1px'}}
                    onClick={()=>{minusExtraIngr(item)}}
                    className="aside-cart__min">-</button> 
                    <span
                      className="aside-cart__count">{extraIngr[item].length}</span> 
                    <button
                    style={{width: '15px', marginLeft: '1px'}}
                    onClick={()=>{formStateWithExtraIngr(item, allIngredients[item][1])}}
                    className="aside-cart__plus">+</button></div>
                    }
                    
                    </div>
                </li>
            )
         })


    const catOfIngred = useSelector(state=>state.general.catOfIngred);

    const categories = Object.keys(catOfIngred).map((item)=>{
        const classNames = activeClass == item ? 'addIngredients__ingr-cat addIngredients__borderB' : 'addIngredients__ingr-cat'
        if(item == 1 || item == 3){
            return null;
        }
        return (
            <li 
            onClick={()=>{setActiveClass(item)}}
            id={item} key={item + 1} className={classNames}>{catOfIngred[item]}</li>
        )

    })
   

    return (
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
    )
}


export default AddIngredients;