export default function StarRating({ popularityScore }) {
  const ratingValue = popularityScore * 5;
  const fullStars = Math.round(ratingValue); 
  const maxStars = 5;

  return (
    
    <div className="d-flex align-items-center">
      <div className="star-icons-container">
         {'★'.repeat(fullStars)}
         {'☆'.repeat(maxStars - fullStars)}
      </div>
      
      <span className="rating-score-text ms-1">{ratingValue.toFixed(1)}/5</span>
    </div>
  
);
}