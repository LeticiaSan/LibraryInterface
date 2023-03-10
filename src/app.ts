/*
Exemplo simples de sistema monolítico com persistência (listagem e inserção)
Autor: Fabrício G. M. de Carvalho, Ph.D
*/

/* importando o express */
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

/* importando o modelo */
import { Book } from "./models/BookDTO";
import { Category } from "./models/CategoryDTO";
import { User } from "./models/UserDTO";

/* importanto o data source inicializado */
import {Service} from "./models/services";


/* Configurando a template engine. */
app.set('view engine', 'ejs');
app.set('views', './src/views'); //Referência a partir do ponto de execução, fora de src

/* Configuração para leitura de parâmetros em requisição do tipo post em form */
app.use(bodyParser.urlencoded({extended: false}));

/* Inicializando a fonte de dados: */
var service = new Service();
service.start();


/* Configurando o diretório que serve arquivos estáticos.*/
app.use(express.static('src/public'));

app.get('/', listProjectHandler);

app.get('/adicionarProjetoForm', addProjectHandlerForm);

app.post('/addBook', addBookHandler);
app.post('/addUser', addUserHandler);

app.listen(port, listenHandler);

/* Função que gera o formulário para adição de um projeto*/
function addProjectHandlerForm(req,res){
    res.render('adicionar_projeto_form.ejs'); 
}

/* Função que efetivamente adiciona um projeto. */
function addBookHandler(req,res){
    let new_book = new Book();    
    new_book.author = req.body.author;
    new_book.category = req.body.category;
    new_book.publicationDate = req.body.publicationDate;
    new_book.registrationNumber = req.body.registrationNumber;
    new_book.title = req.body.title;    
    //MariaDBDataSource.manager.save(novo_projeto);
    service.insert(new_book);
    res.render('adicionar_projeto_confirm.ejs', {projeto: new_book}); 
}
function addUserHandler(req,res){
    let new_user = new User();    
    new_user.id = req.body.id;
    new_user.name = req.body.name;
    new_user.password = req.body.password;
    new_user.registration = req.body.registration;
    //MariaDBDataSource.manager.save(novo_projeto);
    service.insert(new_user);
    res.render('adicionar_projeto_confirm.ejs', {projeto: new_user}); 
}


async function listProjectHandler(req, res){
    /* dados vindos diretamente do banco de dados */
    let projetos = await service.listAll(); 
    console.log(projetos); //para debug somente
    res.render('listar_projetos.ejs',{lista_projetos: projetos});    
}

function listenHandler(){
    console.log(`Escutando na porta ${port}!`);
}