import './more-filters.scss';
import {useState} from 'react';
import { useSelector } from 'react-redux';
//тут создам микро-компонент с бОльшими фильтрами
const MoreFilters = ({filtersMore, setFiltersMore})=>{

  const catOfIngred = useSelector(state=>state.general.catOfIngred);
  const allIngredients = useSelector(state=>state.general.ingr);


  
  //ниже мне пришлось возвращая один массив для рендера (возвращая элементы), внутри этих элементов возвращать и делать операции еще с одним массивом. Как видишь пришлось создавать отдельную область видимости, которая по итогу вчислений возвращала мне ингредиенты, в зависимсоти от категории.
  const blocks = Object.keys(catOfIngred).map(itemy=>{
    

    //получаем названия категорий, кроме тех, что мне не нужны
    if(itemy == 1 || itemy == 3){
      return null;
  }
    return (
      <li key={itemy} className='pizzablock__more-cat-li'>
        <div  id={itemy} className="pizzablock__more-cat">{catOfIngred[itemy]} </div>
        
            {
              Object.keys(allIngredients).filter(item=>{
                return item.match(new RegExp(`^${itemy}`,'g'))}).map(item=>{
                  return (
                    <div 
                    //в компоненте выше (ПиццаБЛОК) - создаем стэйт с объектом, где ключи и значение - это АЙДИ ингредиента, по которому мы будем дальше искать нужные пиццы . Я выбрал объект, потому что привлекает паттерн по удалению элементов из объекта с учетом правил иммутабельности.
                    onClick={()=>{setFiltersMore(()=>{
                      if(filtersMore.hasOwnProperty(item)){
                        let copyObj = {...filtersMore};
                        delete copyObj[item]
                        return copyObj
                      }
                      else{
                        return {...filtersMore, [item]: item}
                      }
                      } )}}
                    key={item} className={item in filtersMore ? "pizzablock__more-ingr pizzablock__more-ingr-active" : 'pizzablock__more-ingr'}>{allIngredients[item][0]}</div>
                  )
                })
            }

      </li>
    )
  })
    return (
      <div className="pizzablock__more-wrapper">
        <div className="pizzablock__more-filters">
                <ul className="pizzablock__more-cat-ul">
                  {blocks}
                </ul>
        </div>
      </div>
    )
    }


export default MoreFilters;