const Print = require("../models/Print");
async function reportController(req, res)
{
    try {
        // Recebendo o JSON com data inicial e data final
        const { inicial, final } = req.query;
    
        // Convertendo as datas recebidas em strings para objetos Date
        const startDate = new Date(inicial);
        const endDate = new Date(final);
    
        // Realizando a consulta para obter os registros entre as datas fornecidas
        let prints = await Print.find({
          registrationDate: {
            $gte: startDate,
            $lte: endDate,
          }
        });
        // Verificando se há registros no intervalo de datas
        if (prints.length === 0) {
          return res.status(404).json({
            message: "Nenhum registro encontrado no intervalo de datas fornecido.",
          });
        }
    
        return res.status(200).json(prints);
      } catch (error) {
        return res.status(500).json({ error: "Erro ao obter dados." });
      }
}

module.exports = reportController;