import './about.scss';

const About = ()=>{


    return (
        <section className="about">
            <div className="container">
                <h1 className="about__title">КОНТАКТИ</h1>
                <div className="about__text">
                    <p>M2T Pizza — это узкоспециализированная экспресс-пиццерия, которая ориентирована на быстрое обслуживание и дистанционные заказы.</p>
                    <img src="https://m2t.pizza/wp-content/uploads/2020/10/img_20201013_014623-min-min-768x499.jpg" alt="" className="about__present-img" />
                 
                    <p>Вы также можете посетить наш производственный павильон и забрать продукт посредством самовывоза.</p>
                    <p>Мы находимся в продуктовой зоне ТЦ «Доброполье» и работаем для вас (временный график) с 10:00 до 17:30.</p>
                </div>
                <br></br>
                <div className="about__cnt-info">
                    <p>Контактная информация:</p>
                    <p>г. Доброполье, м-н Солнечный 30а (ТЦ «Доброполье»)</p>
                    <p>Тел. для заказов: 099 3965 777</p>
                    <p>Эл. адрес: m2t.pizza@gmail.com</p>
                </div>

            </div>
        </section>
    )
}

export default About;