const express = require('express');
const router = express.Router();
const Print = require('../models/Print');

// Rota para adicionar nova impressão
router.post('/add', async (req, res) => {
  try {
    const { cliente, responsavel, motivo, qtd_col, val_col, qtd_pb, val_pb, mtd_pgto, val_total } = req.body;

    // Registro de impressão
    const newPrint = new Print({
      cliente,
      responsavel,
      motivo,
      qtd_col,
      val_col,
      qtd_pb,
      val_pb,
      mtd_pgto,
      val_total
    });

    // Salvar
    await newPrint.save();

    // Respostas
    res.json({ message: 'Impressão registrada com sucesso!', val_total, registrationDate: newPrint.registrationDate });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar impressão' });
  }
});

// Rota para exportar dados em CSV
router.get('/export-csv', async (req, res) => {
  try {
    const prints = await Print.find({});
    
    // Converter os dados para CSV
    let csvData = 'Cliente,Responsável,Motivo,Qtd Col,Val Col,Qtd PB,Val PB,Método Pgt,Val Total,Data de Registro\n';
    prints.forEach(print => {
      csvData += `${print.cliente},${print.responsavel},${print.motivo},${print.qtd_col},${print.val_col},${print.qtd_pb},${print.val_pb},${print.metodo_pgt},${print.val_total},${print.registrationDate}\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('prints.csv');
    return res.send(csvData);

  } catch (error) {
    res.status(500).json({ error: 'Erro ao exportar dados para CSV' });
  }
});

module.exports = router;
