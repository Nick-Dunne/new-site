import m2t from '../../assets/M2T.png';

import {Link} from 'react-router-dom';

const Postheader = ()=>{

    return (
        <>
        <div className="postheader">
        <div className="container">
          <div className="postheader__wrapper">
             <div className="postheader__logo-menu-wrap"><Link to="/"><img src={m2t} alt=""/> </Link>
              <ul className="postheader__menu">
                <li style={{cursor: 'context-menu'}}><Link to="/">Піца</Link></li>
                <li style={{cursor: 'context-menu'}}>Напої</li>
              </ul>
            </div>
            {/* <div className="postheader__contact">Контакти</div> */}
          </div>
        </div>
      </div>
      </>
    )
}


export default Postheader;