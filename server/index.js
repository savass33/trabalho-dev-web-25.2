const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const Teste = require('./Teste');

require('dotenv').config();

const startServer = async () => {
  await connectDB();

  // Cria um documento de teste
  const doc = new Teste({ mensagem: 'Primeira gravação no banco!' });
  await doc.save();
  console.log('Documento salvo no MongoDB:', doc);

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/', (req, res) => res.send('API conectada ao MongoDB! 🚀'));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
};

startServer();