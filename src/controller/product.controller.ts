import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";

export const productController = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    // products => /products/1

    const urlParts = url?.split("/");
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null
    // console.log('this is actual id', urlParts);
    console.log(urlParts);

    // Get all products
    if (url === "/products" && method === 'GET') {
        // const products = [{
        //     id: 1,
        //     product: "Smart Watch"
        // }];
        const products = readProduct();
        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "Product retrive successful", data: products }));
    }
    // Get single product
    else if (method === "GET" && id !== null) {
        const products = readProduct();
        const product = products.find((p: IProduct) => p.id === id);
        // console.log(product);\

        res.writeHead(200, { "content-type": "application/json" })
        res.end(JSON.stringify({ message: "Products retrive successful", data: product }));
    }
}