import Header from '../components/header/Header';
import Postheader from '../components/postheader/Postheader';
import Main from '../pages/Main';
import About from '../pages/About';
import Footer from '../components/footer/Footer';
import ApartCart from '../components/apart-cart/ApartCart';


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

  const modify = useSelector(state=>state.general.modify);

  return (
    <>
    <Header/>
    <Postheader/>
    <main>
    <Routes>
      {/* ниже говорим, что главный роут - ведет на страницу Main, на этой странице есть подроутинг (Оутлет). index - корень, будет рендерить пиццаблок./order - рендерим - Order. Но все в рамках МЭЙН, справа будет корзина. */}
      <Route path="/" element={<Main/>}>
        <Route index element={<Pizzablock/>}/>
        <Route path="order" element={<Order/>}/>
      </Route>
      {/* далее непотимизированно */}
      <Route path="/about" element={<About/>}/>
      <Route path="/cart" element={<ApartCart/>}/>

    {/*   если ничего не подошло - выбрасываем 404*/}
      <Route path="*" element={<h1>404</h1>}/> 
    </Routes>
    </main>
    <Footer/>
      
    {modify ? <ModPizza/> : null}
    </>
  );
}

export default App;
