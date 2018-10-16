var http = require('http')
var url = require ('url')
var fs = require ('fs')
var pug = require('pug')

var puburl= /\/titulo\//

http.createServer((req,res)=>{
    var purl = url.parse(req.url)

    if((purl.pathname == '/')||(purl.pathname == '/index')){
        res.writeHead(200, {'content-Type': 'text/html'})
        fs.readFile('obras-musicais-json/json/index.json','utf8',(erro,dados)=>{
            if(!erro){
                console.log(JSON.parse(dados))
                res.write(pug.renderFile('index.pug', {ind:JSON.parse(dados)}))
            }else
                res.write('<p><b>Erro:</b>' + erro + '</p>')
            
        res.end()
        })
    }
    else if(puburl.test(purl.pathname)){
        var ficheiro = purl.pathname.split('/')[2]
        res.writeHead(200, {'content-Type': 'text/html'})
        fs.readFile('obras-musicais-json/json/'+ ficheiro + '.json',(erro,dados)=>{
            if(!erro)
                res.write(pug.renderFile('template.pug', {obra:JSON.parse(dados)}))
            else
                res.write('<p><b>Erro asdasd:</b>' + erro + '</p>')
            
        res.end()
        })
    }
    else if(purl.pathname == '/w3.css'){
        res.writeHead(200, {'content-Type': 'text/css'})
        fs.readFile('estilo/w3.css', (erro,dados)=>{
            if(!erro)
                res.write(dados)
            else
                res.write('<p><b>Erro:</b>' + erro + '</p>')
            
        res.end()
        })
    }
    else{
        res.writeHead(200, {'content-Type': 'text/html'})
        res.write('<p><b>Erro, pedido desconhecido:</b>'+ purl.pathname+ '</p>') 
        res.end()
    }

}).listen(5000,()=>{
    console.log('Servidor à escuta na porta 5000...')

})