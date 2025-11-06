const mongoose = require("mongoose");

const reservaSchema = new mongoose.Schema({
  espaco: {
    type: String,
    required: true,
  },
  dia: {
    type: Date,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  usuario: {
    nome: {
      type: String,
      required: true,
    },
    cpf: {
      type: String,
      required: true,
    },
    matricula: {
      type: String,
      required: true,
    },
    categoria: {
      type: String,
      enum: [
        "Graduação",
        "Pós-Graduação",
        "Doutorado",
        "Mestrado",
        "Negócios",
        "Eventos",
        "Seleção",
        "Aluguel",
      ],
      required: true,
    },
  },
});

const Reserva = mongoose.model("Reserva", reservaSchema);

module.exports = Reserva;
