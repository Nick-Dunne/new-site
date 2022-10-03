import './about.scss';

import otdel from '../assets/otdel.jpg';

const About = ()=>{


    return (
        <section className="about">
            <div className="container">
                <h1 className="about__title">Про нас</h1>
                <div className="about__text">
                    <p><strong>M2T Pizza</strong> — це експрес-піцерія, яка орієнтована на високу якість продукції, швидке обслуговування та дистанційні замовлення.</p>
                    <img src={otdel} alt="" className="about__present-img" />
                 
                    <p>Ми здійснюємо доставку піци по місту Добропілля, н.п Святогорівка та Ганнівка, але кожен охочий може забрати піцу й самостійно - безпосередньо у нашому павільоні, який знаходиться у торгівельному центрі "Добропілля".</p>
                    <br></br>
                    <p>Завдяки відкритій кухні, ви зможете на власні очі побачити - з яких продуктів та в яких умовах народжується смачна італійська страва у виконанні наших професійних кухарів.</p>
                    <br></br>
                    <p>Наразі діє тимчасовий графік роботи, відповідно до якого ми працюємо щодня з 10:00 до 17:30. Лише служба доставки має вихідний - середа.</p>
                </div>
                <br></br>
                <div className="about__cnt-info">
                    <p><strong>Контактна інформація:</strong></p>
                    <br></br>
                    <p>м. Добропілля, м-н Сонячний 30а (ТЦ&nbsp;«Добропілля»)</p>
                    <p>Тел. для замовлення та інших питань:<br></br>
                    <a href="tel:0993965777"><strong>099 3965 777</strong></a></p>
                    <p>Ел. адреса: m2t.pizza@gmail.com (для пропозицій)</p>
                </div>

            </div>
        </section>
    )
}

export default About;