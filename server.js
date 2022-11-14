const http = require('http');  //allows us access to the internet
const fs = require('fs')  //gives us access to the file system
const url = require('url');  //gives us access to url resolution
const querystring = require('querystring');  //allows us to ask for things in the url
const figlet = require('figlet')  //makes cool asci art

const server = http.createServer((req, res) => {  //server creation starts here!

  const readWrite = (file, contentType) => {
  fs.readFile(file, function(err, data) {
    res.writeHead(200, {'Content-Type': contentType});
    res.write(data);
    res.end();
  });
  }

  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);


  switch (page) {
    case '/':
      readWrite('index.html', 'text/html')
      break;
    case '/otherpage':
      readWrite('otherpage.html', 'text/html')
      break;
    case '/otherotherpage':
      readWrite('otherotherpage.html', 'text/html')
      break;
    case '/api':
      let personName = 'unknown'
      let personStatus = 'unknown'
      let personOccupation = 'unknown'

      if(params['student']== 'leon'){
        personName = 'leon'
        personOccupation = 'Boss Man'
        personStatus = 'Baller'
      }
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          name: personName,
          status: personStatus,
          currentOccupation: personOccupation
        }
        res.end(JSON.stringify(objToJson));
      break;
    case '/css/style.css':
      fs.readFile('css/style.css', function(err, data) {
        res.write(data);
        res.end();
      });
      break;
    case '/js/main.js':
      readWrite('js/main.js', 'text/javascript')
      break;
    default:  
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });

  }

  // if (page == '/') {
  //   readWrite('index.html', 'text/html')
  // }
  // else if (page == '/otherpage') {
  //   readWrite('otherpage.html', 'text/html')
  // }
  // else if (page == '/otherotherpage') {
  //   readWrite('otherotherpage.html', 'text/html')
    
  // }
  // else if (page == '/api') {
  //     let personName = 'unknown'
  //     let personStatus = 'unknown'
  //     let personOccupation = 'unknown'

  //     if(params['student']== 'leon'){
  //       personName = 'leon'
  //       personOccupation = 'Boss Man'
  //       personStatus = 'Baller'
  //     }
  //       res.writeHead(200, {'Content-Type': 'application/json'});
  //       const objToJson = {
  //         name: personName,
  //         status: personStatus,
  //         currentOccupation: personOccupation
  //       }
  //       res.end(JSON.stringify(objToJson));



  // }//else if
  // else if (page == '/css/style.css'){
  //   fs.readFile('css/style.css', function(err, data) {
  //     res.write(data);
  //     res.end();
  //   });


  // }else if (page == '/js/main.js'){
  //   readWrite('js/main.js', 'text/javascript')
    
  // }else{
  //   figlet('404!!', function(err, data) {
  //     if (err) {
  //         console.log('Something went wrong...');
  //         console.dir(err);
  //         return;
  //     }
  //     res.write(data);
  //     res.end();
  //   });
  // }
});

server.listen(8000);
