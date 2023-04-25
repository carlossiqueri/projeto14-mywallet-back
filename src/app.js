import express from "express"
import cors from "cors"
import router from "./routes/index.routes.js"


// Creating server
const app = express();

// Server config
app.use(express.json());
app.use(cors());
app.use(router);

// Server waiting for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
