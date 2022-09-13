import PizzaItem from "../pizza-item/PizzaItem";

//это скелетон, заглушка, которая будет показываться, когда асинхронный экшен (его промис) будет в состоянии ожидания (генералСлайс)
import Skeleton from "../skeleton/Skeleton";

//асинхронные экшены для получения из базы данных пицц и списка ингредиентов
import { fetchPizza} from "../../features/generalSlice";


import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";



//из пропсов получаем информацию для фильтрации и сортировки из родительского ПИЦЦАБЛОК
const PizzaList=({filter, filtersMore, sorting})=>{


 const dispatch = useDispatch();
  //при первом монтировании компонента...
  useEffect(()=>{
    //ниже из нативного джс, поднимает страницу вверх при монтировании (надо, когда переходим с других роутов). Cделаем это только при маунтинте (пустой массив зависимостей)
    window.scrollTo({top: 0,
      lef: 0,
      behavior: "smooth"});
  }, [])
  //в ФЕТЧПИЦЦА, а это createAsyncThunk, мы можем передать только один аргумент. И если нужно передать несколько значений, значит будем передавать объект.
  //создали отдельный ЮЗЭФФЕКТ, потому что запрос должен меняться в зависимости от выбранного пользователем фильтра.
  useEffect(()=>{
    dispatch(fetchPizza({filter, sorting}));
  }, [filter, sorting]);

  //эта переменная из генерального среза будет помогать нам понять, что показывать и как прошел запрос. Толи запрос прошел успешно и выводить списки, толи идет ожидание - скелетон, толи ошибка - ошибка.
  const pizzaLoadingStatus = useSelector(state=>state.general.pizzaLoadingStatus);
  //ниже сам массив с объектами (пиццами)
  const data = useSelector(state => state.general.pizzas)
  

  //если загрузка, то скелетое
  if(pizzaLoadingStatus === 'loading'){
    return (
        <div className="pizzablock__pizza">
        <ul className="pizzablock__pizza-items">
        <Skeleton/><Skeleton/><Skeleton/><Skeleton/><Skeleton/><Skeleton/>
       </ul>
        </div>)
  }
  //если ошибка - ошибка
  else if(pizzaLoadingStatus === 'error'){
    return 'Произошла неизвестная ошибка, попробуйте зайти на сайт позже'
  }
  //два return выше закончат выполнение функции, если нет, то формируем пицца-айтемы, передавая в соответствующие компоненты пропсы в виде объекта с данными конкретной пиццы
  //но тут же мы будем пытаться фильровать результат, если в объекте с допонительными фильтрами что-то есть...
  const items = !Object.keys(filtersMore).length > 0 ?
  data.map((item)=>{
    return <PizzaItem key={item.id} info={item}/>
  })
  :
  //ниже использовали новый интересный метод every(), который возвращает тру, если каждый элемент массива удовлетворяет условию, переданному в кол бэк функцию.
  data.filter(item=>{
  return Object.values(filtersMore).every((elem)=>{
  return item.descr.includes(elem.toString())})})
  .map((item)=>{
  return <PizzaItem key={item.id} info={item}/>
  }) 
     
    




  return (
    <div id="pizzalist" className="pizzablock__pizza">
        <ul className="pizzablock__pizza-items">
           {items.length === 0 ? 'Пицц по заданному запросу не найдено' : items} 
    </ul>
    </div>
  )

}

export default PizzaList;