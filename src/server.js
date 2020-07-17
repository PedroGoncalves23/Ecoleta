const express = require("express")
const server = express()

// Configurar pasta public
server.use(express.static("public"))


//utilizando tamplate engine (tem q instalar JUNJUCKS)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da aplicação
// Página inicial
// req: Requisição
// res: Resposta
server.get("/", function(req, res){
   return res.render("index.html", {title: "um título"})
})

server.get("/create-point", function(req, res){
    return res.render("create-point.html")
})

server.get("/search", function(req, res){
    return res.render("search-results.html")
})


// Ligar o servidor
server.listen(3000)