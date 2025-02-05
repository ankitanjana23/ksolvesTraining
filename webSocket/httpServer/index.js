//import required built in modules
const http = require('http')
const url = require('url')

//// Define constants for the server port and content types
const PORT = 3000;
const CONTENT_TYPE_JSON = { "Content-Type": "application/json" };
const CONTENT_TYPE_HTML = { "Content-Type": "text/html" };


let products = [
    { id: 1, name: 'Product 1', price: 20.0 },
    { id: 2, name: 'Product 2', price: 30.0 },
  ];

const server = http.createServer((req,res)=>{
    const parsedUrl = url.parse(req.url, true);

    // Handle GET /products request
    if (req.method === 'GET' && parsedUrl.pathname === '/products') {
        res.writeHead(200, CONTENT_TYPE_JSON);
        res.end(JSON.stringify(products));
    } else {
        // Handle 404 Not Found
        res.writeHead(404, CONTENT_TYPE_JSON);
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

//Get all products 



// Start the server and listen on the specified port
server.listen(PORT, () => {
    console.log(`Product server listening on ${PORT}`);
  });