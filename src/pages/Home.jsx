import { useEffect, useState } from 'react';
import ProductCarousel from '../components/GallerySlider';
import { fetchProducts } from '../services/api'; 

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    fetchProducts()
      .then((data) => { 
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error while taking data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
      return (
          <div className="container-fluid py-5" style={{ textAlign: 'center' }}>
              <h2>Uploading Products</h2>
          </div>
      );
  }

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#fff', maxWidth: '1440px', margin: '0 auto' }}>
      <ProductCarousel products={products} />
    </div>
  );
}