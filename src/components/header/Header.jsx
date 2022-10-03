import {NavLink} from 'react-router-dom';

import place from '../../assets/placing.png';

import './headerAdd.scss';
const Header = ()=>{

  const activeStyle = {color: "white"};

    return (
        <header className='header'>
        <div className="container">
          <div className="header__wrapper">
            <div className='header__inf'><a href="tel:+38 099 3965 777">+38 099 3965 777</a> 
            <div className='header__city-ico-wr'>
              <img className='header__place-icon' src={place} alt="-" />
              <span className="header__city"
                aria-hidden="true">Добропілля</span>
            </div>
            <div className="header__worktime">10:00-17:30</div>
            </div>
            
            
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
                }>Про нас</NavLink></li>
              <li><NavLink
                to="/legend"
                style={({ isActive }) =>
                  isActive ? activeStyle : undefined
                }>Легенда</NavLink></li>
             
            </ul>
            {/* <div><button 
                  className="header__enter">Вхід</button> <button className="header__lang">Ua</button></div> */}
          </div>
        </div>
      </header>
    )
}

export default Header;