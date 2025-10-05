import { useState } from 'react';
import { getColorInfo } from '../services/api'; // getColorInfo stil/tema için kullanılıyor


export default function ArtworkTile({ product }) {
  // Varsayılan rengi/temayı 'yellow' (Klasik) olarak koruyalım
  const initial = 'yellow'; 

  const [currentColor, setCurrentColor] = useState(initial);

  // Bu değerin backend'den geldiğini varsayıyoruz, bu yüzden doğrudan kullanılıyor.
  // Bu değer 0 ile 1 arasında olmalı.
  const ratingValue = (product.popularityScore * 5); 
  const fullStars = Math.floor(ratingValue);
  const halfStar = ratingValue - fullStars >= 0.25 && ratingValue - fullStars <= 0.75;

  return (
    <div className="product-card"> 
      <div className="image-wrap">
        <img
          src={product.styleImages ? product.styleImages[currentColor] : 'https://placehold.co/400x400/f7f7f7/4a4a4a?text=Loading'}
          alt={product.name}
          onError={(e) => (e.target.src = 'https://placehold.co/400x400/f7f7f7/4a4a4a?text=Image')}
          className="product-image"
        />
      </div>

      <div className="card-body">

        <h4 className="product-title">{product.name || 'Sanat Eseri Başlığı'}</h4> 
        
        <p className="product-price">${product.price.toFixed(2)} <span className="price-unit">USD</span></p>

        <div className="color-row">
          {product.styleImages && Object.entries(product.styleImages).map(([key, url]) => {
            const info = getColorInfo(key); 
            const active = key === currentColor;
            return (
              <button
                key={key}
                className={`color-selector ${active ? 'active' : ''}`}
                onClick={() => setCurrentColor(key)}
                aria-label={info.displayName}
              >
                <span className="color-dot" style={{ backgroundColor: info.hex }} />
              </button>
            );
          })}
        </div>

        <p className="product-color-text">Tema: {getColorInfo(currentColor).displayName}</p>

        <div className="rating-row">

          <div className="stars">
            {Array.from({ length: fullStars }).map((_, i) => <svg key={'f'+i} width="16" height="16" viewBox="0 0 20 20" fill="#E6B77A"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.046a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.046a1 1 0 00-1.175 0l-2.817 2.046c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.015 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
            {halfStar && <svg key="half" width="16" height="16" viewBox="0 0 20 20" fill="#E6B77A"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.046a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.046a1 1 0 00-1.175 0l-2.817 2.046c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.015 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>}
            {Array.from({ length: 5 - fullStars - (halfStar ? 1 : 0) }).map((_, i) => <svg key={'e'+i} width="16" height="16" viewBox="0 0 20 20" fill="#E5E7EB"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.046a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.046a1 1 0 00-1.175 0l-2.817 2.046c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.015 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
          </div>

          <div className="rating-text">{(ratingValue).toFixed(1)}/5</div>
        </div>
      </div>
    </div>
  );
}