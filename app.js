const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const printRoutes = require("./routes/print"); // Importe o arquivo de rotas

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Atlas conectado"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB Atlas", err));

// Use as rotas
app.use("/", printRoutes); // Registre as rotas com a raiz da aplicação

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
