const mongoose = require('mongoose');

const printSchema = new mongoose.Schema({
    cliente: String,
    responsavel: String,
    motivo: String,
    qtd_col: Number,
    val_col: Number,
    qtd_pb: Number,
    val_pb: Number,
    mtd_pgto: String,
    val_total: Number,
    registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Print', printSchema);