require('dotenv').config();
const express = require('express');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors());

let kullanicilar = [{ id: 310635, kullaniciadi: 'admin', sifre: '1234' }];

server.get('/', (req, res) => {
    res.send("<h1>Sunucu Aktif!</h1>");
});

server.get('/api/kullanıcılar', (req, res) => {
    res.json(kullanicilar);
});

// DİKKAT: Bu kısım en altta olmalı ve hata içermemeli
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});