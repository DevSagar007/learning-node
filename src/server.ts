import { createServer, IncomingMessage, Server } from "http";
import { productController } from "./routes/product.controller";

const server: Server = createServer((req: IncomingMessage, res) => {
    // console.log(req.url); // 'user', '/product'
    // console.log(req.method); // 'GET', "POST", "PUT", "DELETE" "PATCH", 
    const url = req.url;
    const method = req.method;
    
    if (url === '/' && method === 'GET') {
        // console.log("This is Root route");
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "this is root route" }))
    } else if (url?.startsWith('/products')) {
        productController(req, res);
    } else {
        res.writeHead(400, { "content-type": "text/plan" })
        res.end(JSON.stringify({ message: "route not found" }))
    }
});

server.listen(5000, () => {
    console.log("Server is running on the port 500");
});
