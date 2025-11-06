const mongoose = require('mongoose');

const TesteSchema = new mongoose.Schema({
  mensagem: {
    type: String,
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Teste', TesteSchema);