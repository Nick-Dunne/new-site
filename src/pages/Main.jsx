
import AsideCart from "../components/aside-cart/AsideCart";

import {Outlet} from 'react-router-dom';

import Pizzablock from "../components/pizzablock/Pizzablock";
import Order from "../components/order/Order";
import { useLocation } from "react-router-dom";

const Main = ()=>{

const path = useLocation().pathname;


    return (
        <section className="main">
        <div className="container">
          <div className="main-wrapper">
          <div className="main-block">
            {path !== '/order' ?  <Pizzablock/> : <Order/>}
          </div>
          <AsideCart/>
          </div>
        </div>
        <Outlet/>
      </section>  
    )
}

export default Main;