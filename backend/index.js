const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000; 

app.use(cors());

const INVENTORY_FILE_PATH = path.join(__dirname, 'data', 'products.json');
const jsonString = fs.readFileSync(INVENTORY_FILE_PATH, 'utf-8');
const inventoryCatalog = JSON.parse(jsonString); 

const DEFAULT_UNIT_PRICE = 101.00; 

app.get('/', (req, res) => {
    res.send('API hizmeti başarıyla çalışıyor.');
});

app.get('/api/products', (req, res) => {
    try {
        const pricedItems = inventoryCatalog.map(item => ({
            ...item,
            price: DEFAULT_UNIT_PRICE, 
        }));

        res.json(pricedItems);
        
    } catch (error) {
        console.error(`[API ERROR] Veri işleme sırasında kritik hata: ${error.message}`);
        res.status(500).json({ message: "Sunucu hatası: Ürün katalogu yüklenemedi." });
    }
});

app.listen(PORT, () => {
    console.log(`[SERVER START] Sunucu başlatıldı ve ${PORT} numaralı portta dinleniyor.`); 
    console.log(`[ROUTE] Ürünler rotası: /api/products`);
});