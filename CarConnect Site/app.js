// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';
var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;
const bodyParser = require('body-parser');



var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var feedRouter = require('./src/routes/feed');
var curtidasRouter = require('./src/routes/curtida')
var comentariosRouter = require('./src/routes/comentario')
var dashboardRouter = require('./src/routes/dashboard')


app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({ limit: '15mb' })); 
app.use(bodyParser.urlencoded({ limit: '15mb', extended: true }));
app.use('/api/feed', feedRouter);
app.use('/api/curtidas', curtidasRouter);
app.use('/api/comentarios', comentariosRouter);
app.use('/dash', dashboardRouter)


app.use(cors({
  origin: 'http://localhost:3333',
  credentials: true
}));

const session = require('express-session');

app.use(session({
  secret: 'segredoSuperSecretoAqui',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));



app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    #######   #######     #########     ####### #########  ######        ##  ######        ##  ##########  #######  ##############
  ###                ##   ##       ##  ###      ##     ##  ##    ##      ##  ##    ##      ##  ##         ###             ## 
  ###                ##   ##        ## ###      ##     ##  ##     ##     ##  ##     ##     ##  ##         ###             ##
  ###          ########   ##       ##  ###      ##     ##  ##      ##    ##  ##      ##    ##  ########## ###             ##
  ###         ##     ##   ##  #####    ###      ##     ##  ##       ##   ##  ##       ##   ##  ##         ###             ##
  ###         ##     ##   ##    ###    ###      ##     ##  ##        ##  ##  ##        ##  ##  ##         ###             ##
    #######    #######    ##      ###   ####### #########  ##         ###    ##         ###    ##########  #######        ##
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
