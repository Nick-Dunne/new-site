
import AsideCart from "../components/aside-cart/AsideCart";

import {Outlet} from 'react-router-dom';



const Main = ()=>{




    return (
        <section className="main">
        <div className="container">
          <div className="main-block">
            {<Outlet/>}
          </div>
          <AsideCart/>
        </div>
      </section>
    )
}

export default Main;