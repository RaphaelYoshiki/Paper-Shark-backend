const mongoose = require("mongoose");

const printSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true, // Torna o campo obrigatório
  },
  responsavel: {
    type: String,
    required: true, // Torna o campo obrigatório
  },
  motivo: {
    type: String,
    required: true, // Torna o campo obrigatório
  },
  qtd_col: {
    type: Number,
    required: true, // Torna o campo obrigatório
    min: 0, // Exemplo de validação para números negativos
  },
  val_col: {
    type: Number,
    required: true, // Torna o campo obrigatório
    min: 0, // Exemplo de validação para números negativos
  },
  qtd_pb: {
    type: Number,
    required: true, // Torna o campo obrigatório
    min: 0, // Exemplo de validação para números negativos
  },
  val_pb: {
    type: Number,
    required: true, // Torna o campo obrigatório
    min: 0, // Exemplo de validação para números negativos
  },
  mtd_pgto: {
    type: String,
    required: true, // Torna o campo obrigatório
  },
  val_total: {
    type: Number,
    required: true, // Torna o campo obrigatório
    min: 0, // Exemplo de validação para números negativos
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Print", printSchema);
