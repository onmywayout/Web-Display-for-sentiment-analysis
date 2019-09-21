
var englishrss = require('./models/englishrss.js');
var englishtweets = require('./models/englishtweets.js');
var evaluatedsentiments = require('./models/evaluatedsentiments.js');
var forexmarkets = require('./models/forexmarkets.js');
var googletrends = require('./models/googletrends.js');
var resultdetails = require('./models/resultdetails.js');
var results = require('./models/results.js');
var spanishrss = require('./models/spanishrss.js');
var spanishtweets = require('./models/spanishtweets.js');
var status = require('./models/status.js');
var stockmarketcols = require('./models/stockmarketcols.js');
var tests = require('./models/tests.js');


module.exports = function(app) {




    app.get('/api/result.json', function(req, res) {

        // use mongoose to get all todos in the database
        //results.find( [{"DATE": {$gt: new Date( 2015,5,29,00,00), $lt: new Date( 2014,5,29,23,59,59)}}] , function(err, result) {
        results.where('DATE').gte(new Date(2014, 3, 21, 00, 00)).lte(new Date(2014, 3, 29, 23, 59, 59)).sort({"DATE": 1}).exec(function(err, result) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
            {
                res.send(err);
            }

            res.json(result); // return all todos in JSON format
        });
    });





    app.get('/api/results.json/:valorInicio/:valorFin', function(req, res)
    {
        var buscarInicio = req.params.valorInicio + ""; //si no funciona utilizar solo minusculas
        var buscarFin = req.params.valorFin + "";
        
        // var fields = { 'properties.OBJECTID': 1, 'properties.TIMESTAMP': 1 };
        
        results.where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).sort({"DATE": 1}).exec(function(err, resultado) 
        {
            if (err)
            {
                res.send(err);
            }

            res.json(resultado);
        });
    });


    // Busca entre dos fechas el campo indicado. La consulta devuelve el campo y la fecha
    app.get('/api/detailedResults.json/:valorInicio/:valorFin', function(req, res)
    {
        var buscarInicio = req.params.valorInicio + ""; //si no funciona utilizar solo minusculas
        var buscarFin = req.params.valorFin + "";
        resultdetails.where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).sort({"DATE": 1}).exec(function(err, resultado) 
        {
            if (err)
            {
                res.send(err);
            }

            res.json(resultado);
        });
    });


    // Busca entre dos fechas el campo indicado. La consulta devuelve el campo y la fecha
    app.get('/api/consultacampo.json/:valorInicio/:valorFin/:IDCAMPO', function(req, res)
    {
        var buscarInicio = req.params.valorInicio + ""; //si no funciona utilizar solo minusculas
        var buscarFin = req.params.valorFin + "";
        var idcampo = req.params.IDCAMPO + "";
        resultdetails.where(idcampo).ne(0.0).where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).select('DATE ' + idcampo).sort({"DATE": -1}).exec(function(err, resultado) 
        {
            if (err)
            {
                res.send(err);
            }

            res.json(resultado);
        });
    });



        // calcula el promedio del campo pasado como parametro entre dos fechas tambien pasadas como parametro
    app.get('/api/promedioSentimiento.json/:valorInicio/:valorFin/:IDCAMPO', function(req, res)
    {
        var buscarInicio = req.params.valorInicio + ""; //si no funciona utilizar solo minusculas
        var buscarFin = req.params.valorFin + "";
        var idcampo = req.params.IDCAMPO + "";
       // resultdetails.where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).select('DATE ' + idcampo).exec(function(err, resultado)
        
        resultdetails.aggregate( {$match: {DATE :{$gt: new Date(buscarInicio),$lt: new Date(buscarFin)}}} ,{$group: {_id: null, PROM: { $avg: "$"+"10"+idcampo}}},function(err, resultado)     
        {
            if (err)
            {
                res.send(err);
            }

            res.json(resultado);
        });
    });


      // retorna el número de elementos del tipo (i.e. TWEET EN for english tweets) especificado entre dos fechas
    app.get('/api/contarTipo.json/:valorInicio/:valorFin/:TIPO/:LANG', function(req, res)
    {
        var buscarInicio = req.params.valorInicio + ""; //si no funciona utilizar solo minusculas
        var buscarFin = req.params.valorFin + "";
        var tipo = req.params.TIPO + "";
        var lang = req.params.LANG + "";
       // resultdetails.where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).select('DATE ' + idcampo).exec(function(err, resultado)
        
        evaluatedsentiments.find({LANGUAGE: {"$regex":lang}}).find({TYPE: {"$regex":tipo}}).where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).count().exec(function(err, resultado)    
        {
            if (err)
            {
                res.send(err);
            }

            res.json(resultado);
        });
    });


    //noticias en el RSS de español entre las fechas definidas
     app.get('/api/spanishrss.json/:valorInicio/:valorFin', function(req, res)
    {
        var buscarInicio = req.params.valorInicio + ""; //si no funciona utilizar solo minusculas
        var buscarFin = req.params.valorFin + "";
        
        spanishrss.where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).exec(function(err, resultado) 
        {
            if (err)
            {
                res.send(err);
            }

            res.json(resultado);
        });
    });


         //noticias en el RSS de español entre las fechas definidas
     app.get('/api/englishrss.json/:valorInicio/:valorFin', function(req, res)
    {
        var buscarInicio = req.params.valorInicio + ""; //si no funciona utilizar solo minusculas
        var buscarFin = req.params.valorFin + "";
        
        englishrss.where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).exec(function(err, resultado) 
        {
            if (err)
            {
                res.send(err);
            }

            res.json(resultado);
        });
    });


       //noticias en el RSS de español entre las fechas definidas
     app.get('/api/spanishtweets.json/:valorInicio/:valorFin', function(req, res)
    {
        var buscarInicio = req.params.valorInicio + ""; //si no funciona utilizar solo minusculas
        var buscarFin = req.params.valorFin + "";
        
        spanishtweets.where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).exec(function(err, resultado) 
        {
            if (err)
            {
                res.send(err);
            }

            res.json(resultado);
        });
    });

  //noticias en el RSS de español entre las fechas definidas
     app.get('/api/englishtweets.json/:valorInicio/:valorFin', function(req, res)
    {
        var buscarInicio = req.params.valorInicio + ""; //si no funciona utilizar solo minusculas
        var buscarFin = req.params.valorFin + "";
        
        englishtweets.where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).exec(function(err, resultado) 
        {
            if (err)
            {
                res.send(err);
            }

            res.json(resultado);
        });
    });



//---------------- formato consultas
//
//
//    app.get('/api/.json/:valorInicio/:valorFin', function(req, res)
//    {
//        var buscarInicio = req.params.valorInicio + ""; //si no funciona utilizar solo minusculas
//        var buscarFin = req.params.valorFin + "";
//        quien.where('DATE').gte(new Date(buscarInicio)).lte(new Date(buscarFin)).exec(function(err, resultado) 
//        {
//            if (err)
//            {
//                res.send(err);
//            }
//
//            res.json(resultado);
//        });
//    });
//
//
//
//
//
//    app.get('/api/.json/:valor', function(req, res)
//    {
//        var buscar = req.params.valor + "(?![a-z]|[A-Z])";
//        quien.find({ID: {"$regex": buscar}}, function(err, resultado)
//        {
//            if (err)
//            {
//                res.send(err);
//            }
//
//            res.json(resultado);
//        });
//    });



    //APPLICATION -------------------------------------------------------------
    app.get('*', function(req, res)
    {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};