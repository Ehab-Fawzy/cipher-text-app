const express = require('express');
const router = express.Router();
const fs = require('fs');


router.post('/encode' , function(request , response){
    let input = request.body.input;

    let code = "";
    for ( let i = 0; i < input.length; ++i ){
        let ascii = input.charCodeAt(i);
        if ( ascii >= 65 && ascii <= 90 ){
            ascii += 3;
            if ( ascii > 90 )
                ascii -= 26;
        }
        else if ( ascii >= 97 && ascii <= 122 ){
            ascii += 3;
            if ( ascii > 122 )
                ascii -= 26;
        }
        code += String.fromCharCode(ascii);
    }

    let fileName = Math.random().toString(36).substring(10);
    fs.copyFile('prefix.html', fileName, (err) => {
        if (err) throw err;
        else{
            fs.appendFile(fileName , code +  '</textarea>\n</body>\n</html>' , function (){
                response.writeHead(200, {'Content-Type': 'text/html'});
                fs.readFile('./' + fileName, null, function(error, data) {
                    if (error) {
                        response.writeHead(404);
                        response.write('File not found!');
                    } else {
                        response.write(data);
                    }
                    response.end();
                    fs.unlink(fileName, function (err){});
                });
            });

        }
    });
})

router.post('/decode' , function(request , response){
    let input = request.body.input;

    let code = "";
    for ( let i = 0; i < input.length; ++i ){
        let ascii = input.charCodeAt(i);
        if ( ascii >= 65 && ascii <= 90 ){
            ascii -= 3;
            if ( ascii < 65 )
                ascii += 26;
        }
        else if ( ascii >= 97 && ascii <= 122 ){
            ascii -= 3;
            if ( ascii < 97 )
                ascii += 26;
        }
        code += String.fromCharCode(ascii);
    }

    let fileName = Math.random().toString(36).substring(10);
    fs.copyFile('prefix.html', fileName, (err) => {
        if (err) throw err;
        else{
            fs.appendFile(fileName , code +  '</textarea>\n</body>\n</html>' , function (){
                response.writeHead(200, {'Content-Type': 'text/html'});
                fs.readFile('./' + fileName, null, function(error, data) {
                    if (error) {
                        response.writeHead(404);
                        response.write('File not found!');
                    } else {
                        response.write(data);
                    }
                    response.end();
                    fs.unlink(fileName, function (err){});
                });
            });

        }
    });
})

module.exports = router;