require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Users = require("./users/users-model");

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({
    message: "API çalışıyor",
  });
});

// GET /api/kullanıcılar
server.get("/api/kullan%C4%B1c%C4%B1lar", (req, res) => {
  const users = Users.tumunuGetir();

  const guvenliUsers = users.map((user) => ({
    id: user.id,
    kullaniciadi: user.kullaniciadi,
  }));

  res.status(200).json(guvenliUsers);
});

// POST /api/kayıtol
server.post("/api/kay%C4%B1tol", (req, res) => {
  const { kullaniciadi, sifre } = req.body;

  if (!kullaniciadi || !sifre) {
    return res.status(400).json({
      message: "kullaniciadi ve sifre zorunludur",
    });
  }

  const mevcutKullanici = Users.kullaniciBul(kullaniciadi);

  if (mevcutKullanici) {
    return res.status(409).json({
      message: "Bu kullanıcı adı zaten kayıtlı",
    });
  }

  const yeniKullanici = Users.ekle({ kullaniciadi, sifre });

  res.status(201).json({
    id: yeniKullanici.id,
    kullaniciadi: yeniKullanici.kullaniciadi,
  });
});

// POST /api/giriş
server.post("/api/giri%C5%9F", (req, res) => {
  const { kullaniciadi, sifre } = req.body;

  if (!kullaniciadi || !sifre) {
    return res.status(400).json({
      message: "kullaniciadi ve sifre zorunludur",
    });
  }

  const kullanici = Users.kullaniciBul(kullaniciadi);

  if (!kullanici || kullanici.sifre !== sifre) {
    return res.status(401).json({
      message: "Geçersiz kullanıcı adı veya şifre",
    });
  }

  res.status(200).json({
    message: `Hoş geldin ${kullanici.kullaniciadi}`,
  });
});

server.use((req, res) => {
  res.status(404).json({
    message: "İstenen endpoint bulunamadı",
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});