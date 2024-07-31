"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./prisma/database");
const express_1 = require("express");
const app = (0, express_1.default)();
app.get('/api', function (req, res) {
    res.send('Hello World');
});
app.post('/api/product', async (req, res) => {
    try {
        const { title, content } = req.body;
        const product = await database_1.prisma.post.create({ data: { title, content } });
        return res.status(201).json(product);
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api', async (req, res) => {
    try {
        const products = await database_1.prisma.post.findMany();
        return res.status(201).json(products);
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map