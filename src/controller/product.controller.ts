
import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../types/product.type";
import { parseBody } from "../utility/parseBody";

export const productController = async (
    req: IncomingMessage,
    res: ServerResponse,
) => {
    const url = req.url;
    const method = req.method;
    // products => /products/1

    const urlParts = url?.split("/");
    const id =
        urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
    // console.log('this is actual id', urlParts);
    console.log(urlParts);

    // Get all products
    if (url === "/products" && method === "GET") {
        // const products = [{
        //     id: 1,
        //     product: "Smart Watch"
        // }];
        const products = readProduct();
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
            JSON.stringify({ message: "Product retrive successful", data: products }),
        );

    }
    // Get single product
    else if (method === "GET" && id !== null) {
        const products = readProduct();
        // get single product id
        const product = products.find((p: IProduct) => p.id === id);
        // console.log(product);

        if (!product) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(
                JSON.stringify({ message: "Products not found", data: product }),
            );
        }

        res.writeHead(200, { "content-type": "application/json" });
        res.end(
            JSON.stringify({ message: "Products retrive successful", data: product }),
        );
    } else if (method === "POST" && url === "/products") {
        const body = await parseBody(req);
        const products = readProduct();
        const newProduct = {
            id: Date.now(),
            ...body,
        }
        products.push(newProduct) // [{},{},{},{new push}]
        insertProduct(products)
        console.log('check push product', products);
        console.log("newProduct", newProduct);
        console.log("body", body);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
            JSON.stringify({
                message: "Products created successful",
                data: products
            }),
        );
    }
    // Update single product
    else if (method === "PUT" && id !== null) {
        const body = await parseBody(req);
        const products = readProduct();
        const index = products.findIndex((p: IProduct) => p.id === id);

        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(
                JSON.stringify({
                    message: "Products not found!",
                    data: null,
                }),
            );
        }

        products[index] = {
            ...products[index],
            ...body,
            id: products[index].id,
        };

        insertProduct(products);

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Product updated successfully",
            data: products[index],
        }));
    }
    // delete single product
    else if (method === "DELETE" && id !== null) {
        const products = readProduct()
        const index = products.find((p:IProduct)=> p.id === id)
        if (index < 0) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(
                JSON.stringify({
                    message: "Products not found!",
                    data: null,
                }),
            );
        }
        products.splice(index, 1)
        // console.log(products);
        insertProduct(products)
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Product deleted successfully",
            data: null,
        }))
    } 
};
