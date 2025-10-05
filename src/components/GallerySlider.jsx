import { useRef } from 'react';
import ProductCard from './ArtworkTile';
import './GallerySlider.css';



export default function GallerySlider({ products }) {
  const listRef = useRef(null);


  const scrollByCard = (direction = 1) => {
    const container = listRef.current;
    if (!container) return;
    const card = container.querySelector('.product-card');
    if (!card) return;
    const style = window.getComputedStyle(card);
    const marginRight = parseInt(style.marginRight || 20, 10);
    const scrollAmount = (card.offsetWidth + marginRight) * (direction > 0 ? 1 : -1);
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (  
    <div className="carousel-root">
      <header className="carousel-header">
        <h1 className="product-list-title">Product List</h1>
      </header>

      <div className="carousel-wrap">
        <button className="arrow left" onClick={() => scrollByCard(-1)} aria-label="previous">‹</button>

        <div ref={listRef} className="product-list">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <button className="arrow right" onClick={() => scrollByCard(1)} aria-label="next">›</button>
      </div>
    </div>
  );
}
