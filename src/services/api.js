const LIVE_API_BASE_URL = "https://backend-srv-wftl.onrender.com"; 

export const BASE_ARTWORK_PRICE = 101.00; 

export const fetchProducts = async () => {
    const response = await fetch(`${LIVE_API_BASE_URL}/api/artworks`); 
        
    if (!response.ok) {
        throw new Error(`API hatası: ${response.status}`);
    }
    
    const products = await response.json();
    
    return products; 
};

export const getColorInfo = (key) => {
  switch (key.toLowerCase()) {

    case 'yellow': return { hex: '#E6CA97', displayName: 'Klasik' };
    case 'white': return { hex: '#D9D9D9', displayName: 'Modern' };
    case 'rose': return { hex: '#E1A4A9', displayName: 'Soyut' };
    default: return { hex: '#D9D9D9', displayName: 'Bilinmeyen Stil' };
  
  }
};