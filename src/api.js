var express = require ("express");
const app = express();

app.use(express.urlencoded({extended : true}));
app.use(express.json());

const router = express.Router();
app.use('/', router.get('/', (req, res)=>{
    res.status(200).send("<h1>API - CHAT </h1>")
}))

app.use('/sobre', router.get('/sobre', (req, res, next) =>{
    res.status(200).send({
        "nome": "API_CHAT",
        "versao":"0.1.0",
        "autor": "laura "
    })
}));

app.use('/salas', router.get('/salas', async (req, res,) => {
    const salaController = require("./controllers/salaController");
    const resp = await salaController.get();
    res.status(200).send(resp);
}));

app.use("/entrar",router.post("/entrar", async(req, res, next) =>{
    const suarioController = require("./controllers/usuarioController");
    let resp= await usuarioController.entrar(req.body.nick);
}));

app.use("/salas", router.get("/salas", async (req, res, next) => {
    if(await
        token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick)
    ){
        let resp = await salaController.get();
        res.status(200).send(resp);
    }else{
        res.status(400).send({msg:"usuário não autorizado"});
    }
}))


app.use("/sala/entrar", router.put("/sala/entrar", async (req, res)=>{
    if (!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick))
        return false;
    let resp= await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
}))

app.use("/sala/mensagem/", router.post("/sala/mensagem", async (req, res) => {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick))
        return false;
    let resp = await salaController.enviarMensagem(req.headers.nick,req.body.msg,req.body.idSala);
    res.status(200).send(resp);
}))

app.use("/sala/mensagens/", router.get("/sala/mensagens", async (req, res) => {
    if(!token.checkToken(req.headers.token,req.headers.iduser,req.headers.nick))
        return false;
    let resp= await salaController.buscarMensagens(req.query.idSala,req.query.timestamp);
    res.status(200).send(resp);
}))

module.exports=app;