
import AsideCart from "../components/aside-cart/AsideCart";

import {Outlet} from 'react-router-dom';



const Main = ()=>{




    return (
        <section className="main">
        <div className="container">
          <div className="main-wrapper">
          <div className="main-block">
            {<Outlet/>}
          </div>
          <AsideCart/>
          </div>
        </div>
      </section>
    )
}

export default Main;