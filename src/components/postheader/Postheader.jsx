/* import m2t from '../../assets/M2T.png';
import logo3 from '../../assets/logo3.png';
 */
import {Link, useLocation} from 'react-router-dom';

import phone from '../../assets/phone.svg';

const Postheader = ()=>{

  const path = useLocation().pathname;


    return (
        <>
        <div className="postheader">
        <div className="container">
          <div className="postheader__wrapper">
             <div className="postheader__logo-menu-wrap">
             {/*  ниже было просто img без класса */}
             {
              path !== '/' 
              ? 
              <Link to="/"> <div className="postheader__logo-text">M2T</div> </Link>
              :
              <div
              onClick={()=>{window.scrollTo({top: 0,
                lef: 0,
                behavior: "smooth"});}} 
              className="postheader__logo-text">M2T</div>
             }
              
              <ul className="postheader__menu">
                {
                  path !== '/'
                  ?
                  <li
                  className='postheader__menu-li' 
                  ><Link to="/">Вітрина</Link></li>
                  :
                  <li
                  className='postheader__menu-li' 
                  onClick={()=>{window.scrollTo({top: 0,
                    lef: 0,
                    behavior: "smooth"});}} 
                  >Вітрина</li>
                }
                
              </ul>
              <a className='postheader__phone' href="tel:+38 099 3965 777">
              <svg className='postheader__svg' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
              width="30px" height="30px" viewBox="0 0 611.989 611.989" 
              >
              <g>
                <g id="_x34__16_">
                  <g>
                    <path d="M593.742,68.874l-56.656-56.499l0,0c-15.65-15.591-41.006-15.591-56.656,0l-84.985,112.998
                      c-12.992,19.135-15.65,40.888,0,56.499l34.667,34.568c-25.71,34.451-56.577,72.031-91.323,106.68
                      c-39.274,39.175-82.997,74.807-122.29,104.041l-33.506-33.428l0,0c-15.65-15.61-37.462-12.953-56.656,0L13.023,478.482
                      c-18.997,13.091-15.65,40.907,0,56.499l56.656,56.499c31.281,31.202,71.992,21.201,113.313,0c0,0,125.066-70.023,232.139-176.801
                      c100.714-100.438,178.611-232.828,178.611-232.828C609.983,137.342,625.023,100.096,593.742,68.874z"/>
                  </g>
                </g>
              </g>
              </svg></a>

            </div>
            {/* <div className="postheader__contact">Контакти</div> */}
          </div>
        </div>
      </div>
      </>
    )
}


export default Postheader;