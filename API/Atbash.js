const express = require('express');
const router = express.Router();
const fs = require('fs');


router.post('/encode&decode' , function(request , response){
    let input = request.body.input;

    let code = "";
    const forward  = "AaBbYyZz";
    const backward = "ZzYyBbAa";

    for ( let i = 0; i < input.length; ++i ){
        let found = false;
        for ( let j = 0; j < forward.length; ++j ){
            if ( input.charAt(i) == forward.charAt(j) ){
                code += backward.charAt(j).toString();
                found = true;
                break;
            }
        }
        if ( found == false ){
            code += input.charAt(i).toString();
        }
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