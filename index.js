const net = require('net');
var environment;

try{
environment= require('./environment.js');
}catch(ex)
{
console.log(ex)
}

const addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/;
var addr;
if(process.argv.length>4)
 addr= {
    from: addrRegex.exec(process.argv[2]),
    to: addrRegex.exec(process.argv[3])
};



net.createServer(function(from) {
    var to = net.createConnection({
        host: addr?addr.to[2]:environment.to.host,
        port: addr?addr.to[3]:environment.to.port
    });
    from.pipe(to).on('error', function (e) {
console.log(e)
});
    to.pipe(from).on('error', function (e) {
console.log(e)})
}).listen(process.env.PORT||(addr?addr.from[3]:environment.from.port));
