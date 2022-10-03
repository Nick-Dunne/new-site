import Header from '../components/header/Header';
import Postheader from '../components/postheader/Postheader';
import Main from '../pages/Main';
import About from '../pages/About';
import Footer from '../components/footer/Footer';
import ApartCart from '../components/apart-cart/ApartCart';
import Legend from '../pages/Legend';


import Pizzablock from '../components/pizzablock/Pizzablock';
import ModPizza from '../components/mod-pizza/ModPizza';
import Order from '../components/order/Order';
import { fetchBorts, fetchIngr, fetchCatOfIngred, fetchPizza } from '../features/generalSlice';

import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
//4


function App  () {
  const dispatch = useDispatch();


  //при мнтировании - запрос для получения информации
  useEffect(()=>{
    dispatch(fetchBorts());
    dispatch(fetchIngr());
    dispatch(fetchCatOfIngred());

  }, [])

  /* const modify = useSelector(state=>state.general.modify); */

  return (
    <>
    <Header/>
    <Postheader/>
    <main>
    <Routes>
      {/* ниже говорим, что главный роут - ведет на страницу Main, на этой странице есть подроутинг (Оутлет). index - корень, будет рендерить пиццаблок./order - рендерим - Order. Но все в рамках МЭЙН, справа будет корзина. */}
      <Route path="/" element={<Main/>}>
        <Route path="p/:pizzaId" element={<ModPizza/>}/>
      </Route>

      <Route path="/order" element={<Main/>}/>
       
      {/* далее непотимизированно */}
      <Route path="/about" element={<About/>}/>
      <Route path="/cart" element={<ApartCart/>}/>
      <Route path="/legend" element={<Legend/>}/>

    {/*   если ничего не подошло - выбрасываем 404*/}
      <Route path="*" element={<section className='main'>
      <div className="container"><h2>Схоже, що такої сторінки не існує, або вона була видалена :(</h2></div></section>}/> 
    </Routes>
    </main>
    <Footer/>
      
    {/* {modify ? <ModPizza/> : null} */}
    </>
  );
}

export default App;
