import React from 'react';
import './P404.css';

export const P404 = () => {
  return (
    <section className="page_404_unique">
      <div className="container_404_unique">
        <div className="row_404_unique">
          <div className="col-sm-12_404">
            <div className="col-sm-10_404 col-sm-offset-1_404 text-center_404">
              <div className="four_zero_four_bg_unique">
                <h1 className="text-center_404">404</h1>
              </div>

              <div className="content_box_404_unique">
                <h3 className="h2_404">Parece que estás perdido</h3>
                <p>La página que buscas no está disponible!</p>
                <a href="/" className="link_404_unique">Ir Al Inicio</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};