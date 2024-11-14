const express = require("express");
const router = express.Router();
const Print = require("../models/Print");

// Rota para adicionar nova impressão
router.post("/add", async (req, res) => {
  try {
    const {
      cliente,
      responsavel,
      motivo,
      qtd_col,
      val_col,
      qtd_pb,
      val_pb,
      mtd_pgto,
      val_total,
    } = req.body;

    // Registro de impressão
    const agora = new Date();
    const newPrint = new Print({
      cliente,
      responsavel,
      motivo,
      qtd_col,
      val_col,
      qtd_pb,
      val_pb,
      mtd_pgto,
      val_total,
      registrationDate: agora,
    });

    // Salvar
    await newPrint.save();

    console.log(await Print.find());

    // Respostas
    res.json({
      message: "Impressão registrada com sucesso!",
      val_total,
      registrationDate: newPrint.registrationDate,
    });
  } catch (error) {
    console.error("<E> Erro de registro.");
    res.status(500).json({ error: "Erro ao registrar impressão" });
  }
});

// Rota para exportar dados em CSV
router.get("/report", async (req, res) => {
  try {
    // Recebendo o JSON com data inicial e data final
    const { inicial, final } = req.query;
    console.log("RECEIVED: ", inicial, final);

    // Convertendo as datas recebidas em strings para objetos Date
    const startDate = new Date(inicial);
    const endDate = new Date(final);

    // Realizando a consulta para obter os registros entre as datas fornecidas
    const prints = await Print.find({
      registrationDate: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    // Verificando se há registros no intervalo de datas
    if (prints.length === 0) {
      return res.status(404).json({
        message: "Nenhum registro encontrado no intervalo de datas fornecido.",
      });
    }

    // Criação do conteúdo CSV com os registros filtrados
    let csvData =
      "Cliente,Responsável,Motivo,Qtd Col,Val Col,Qtd PB,Val PB,Método Pgt,Val Total,Data de Registro\n";
    prints.forEach((print) => {
      csvData += `${print.cliente},${print.responsavel},${print.motivo},${
        print.qtd_col
      },${print.val_col},${print.qtd_pb},${print.val_pb},${print.mtd_pgto},${
        print.val_total
      },${print.registrationDate.toLocaleDateString("pt-BR")}\n`;
    });

    // Definindo cabeçalhos para download automático
    res.header("Content-Type", "text/csv");
    res.attachment("impressao_filtrada.csv"); // Nome do arquivo CSV gerado
    return res.send(csvData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao exportar dados para CSV." });
  }
});

// Rota Apenas para Testar Conexões
router.get("/status", async (req, res) => 
  {
    res.status(200).send('');
  })

module.exports = router;
