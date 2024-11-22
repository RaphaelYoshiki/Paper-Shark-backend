const Print = require("../models/Print");
async function addController(req, res)
{
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
    
        // Respostas
        res.json({
        message: "Impressão registrada com sucesso!",
        val_total,
        registrationDate: newPrint.registrationDate,
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar impressão" });
    }
}

module.exports = addController;