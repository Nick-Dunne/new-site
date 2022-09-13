import {NavLink} from 'react-router-dom';

import './headerAdd.scss';
const Header = ()=>{

  const activeStyle = {color: "white"};

    return (
        <header className='header'>
        <div className="container">
          <div className="header__wrapper">
            <div><a href="tel:+38 099 3965 777">+38 099 3965 777</a> 
            <span className="header__city"
                aria-hidden="true">Добропілля</span></div>
            <ul className="header__menu">

              <li><NavLink
                to="/"
                style={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }>Головна</NavLink></li>
              <li><NavLink
                to="/about"
                style={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }>Контакти</NavLink></li>
             
            </ul>
            {/* <div><button 
                  className="header__enter">Вхід</button> <button className="header__lang">Ua</button></div> */}
          </div>
        </div>
      </header>
    )
}

export default Header;