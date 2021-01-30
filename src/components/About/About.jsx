import './About.css';
import avatar from '../../images/IMG_3660.png';

function About() {
  return (
    <section className="about">
      <img alt="Аватар" src={avatar} className="about__avatar" />
      <div className="about__content-box">
        <h2 className="about__title">Об авторе</h2>
        <p className="about__description">
          Это блок с&nbsp;описанием автора проекта. Здесь следует указать, как
          вас зовут, чем вы&nbsp;занимаетесь, какими технологиями разработки
          владеете. Также можно рассказать о&nbsp;процессе обучения
          в&nbsp;Практикуме, чему вы&nbsp;тут научились, и&nbsp;чем можете
          помочь потенциальным заказчикам.
        </p>
      </div>
    </section>
  );
}

export default About;
