import type { IncomingMessage, ServerResponse } from "http";

export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    const products = [{
        id: 1,
        product: "Smart Watch"
    }]
    if (url === "/products" && method === 'GET') {
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "Product retrive successful", data: products }));
    }
}