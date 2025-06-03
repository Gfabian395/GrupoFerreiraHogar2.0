import React, { useRef } from 'react';
import './Carrusel.css'; // Ajusta el path si es necesario

export const Carrusel = () => {
  const carouselRef = useRef(null);
  const listRef = useRef(null);

  // Deshabilitar botones temporalmente para evitar clicks rápidos
  let unAcceppClick = useRef(null);

  const showSlider = (type) => {
    if (!carouselRef.current || !listRef.current) return;

    const nextButton = carouselRef.current.querySelector('#next');
    const prevButton = carouselRef.current.querySelector('#prev');

    // Desactivar clicks
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carouselRef.current.classList.remove('next', 'prev');

    const items = listRef.current.querySelectorAll('.item');

    if (type === 'next') {
      listRef.current.appendChild(items[0]);
      carouselRef.current.classList.add('next');
    } else {
      listRef.current.prepend(items[items.length - 1]);
      carouselRef.current.classList.add('prev');
    }

    clearTimeout(unAcceppClick.current);
    unAcceppClick.current = setTimeout(() => {
      nextButton.style.pointerEvents = 'auto';
      prevButton.style.pointerEvents = 'auto';
    }, 2000);
  };

  const handleSeeMoreClick = () => {
    if (!carouselRef.current) return;
    carouselRef.current.classList.remove('next', 'prev');
    carouselRef.current.classList.add('showDetail');
  };

  const handleBackClick = () => {
    if (!carouselRef.current) return;
    carouselRef.current.classList.remove('showDetail');
  };

  // Datos para evitar repetir mucho código
  const itemsData = [
    'img1.png',
    'https://samsungar.vtexassets.com/arquivos/ids/192879-1200-auto?width=1200&height=auto&aspect=true.',
    'https://samsungar.vtexassets.com/arquivos/ids/207652-1200-auto?width=1200&height=auto&aspect=true',
    'img4.png',
    'img5.png',
    'img6.png',
  ];

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="list" ref={listRef}>
        {itemsData.map((imgSrc, idx) => (
          <div className="item" key={idx}>
            <img src={imgSrc.startsWith('http') ? imgSrc : `images/${imgSrc}`} alt={`Slide ${idx + 1}`} />
            <div className="introduce">
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">Aerphone</div>
              <div className="des">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia,
                laborum cumque dignissimos quidem atque et eligendi aperiam
                voluptates beatae maxime.
              </div>
              <button className="seeMore" onClick={handleSeeMoreClick}>
                Ver más &#8599;
              </button>
            </div>
            <div className="detail">
              <div className="title">Aerphone GHTK</div>
              <div className="des">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor,
                reiciendis suscipit nobis nulla animi, modi explicabo quod
                corrupti impedit illo, accusantium in eaque nam quia adipisci aut
                distinctio porro eligendi. Reprehenderit nostrum consequuntur ea!
                Accusamus architecto dolores modi ducimus facilis quas
                voluptatibus! Tempora ratione accusantium magnam nulla tenetur
                autem beatae.
              </div>
              <div className="specifications">
                <div>
                  <p>Used Time</p>
                  <p>6 hours</p>
                </div>
                <div>
                  <p>Charging port</p>
                  <p>Type-C</p>
                </div>
                <div>
                  <p>Compatible</p>
                  <p>Android</p>
                </div>
                <div>
                  <p>Bluetooth</p>
                  <p>5.3</p>
                </div>
                <div>
                  <p>Controlled</p>
                  <p>Touch</p>
                </div>
              </div>
              <div className="checkout">
                <button>ADD TO CART</button>
                <button>CHECKOUT</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button id="prev" onClick={() => showSlider('prev')}>
          &lt;
        </button>
        <button id="next" onClick={() => showSlider('next')}>
          &gt;
        </button>
        <button id="back" onClick={handleBackClick}>
          Ver todo &#8599;
        </button>
      </div>
    </div>
  );
}
