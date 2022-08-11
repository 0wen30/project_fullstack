const http  = require("http");

const app = require("./app");

const servidor = http.createServer(app);

const { PORT } = process.env;

servidor.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
