// index.js
const express = require('express');
const connectDB = require('./db');
const Reserva = require('./models/Reserva');
const cors = require('cors');
require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API conectada ao MongoDB! 🚀'));

app.post('/reservar', async (req, res) => {
  try {
    const { espaco, dia, hora, nome, cpf, matricula, categoria } = req.body;

    const novaReserva = new Reserva({
      espaco,
      dia,
      hora,
      usuario: {
        nome,
        cpf,
        matricula,
        categoria,
      },
    });

    await novaReserva.save();

    res.status(201).json({
      message: "Reserva criada com sucesso!",
      reserva: novaReserva,
    });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ message: 'Erro ao criar a reserva' });
  }
});

app.get('/reservas', async (req, res) => {
  try {
    const reservas = await Reserva.find(); // Busca as reservas
    console.log(reservas); // Adicione o console.log para ver o que está sendo retornado
    res.status(200).json(reservas); // Retorna as reservas
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    res.status(500).json({ message: "Erro ao buscar reservas" });
  }
});


const PORT = process.env.PORT || 5137;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
