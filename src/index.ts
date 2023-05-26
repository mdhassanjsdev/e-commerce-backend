import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import colors from 'colors'

import { notFound, errorHandler } from "../error/handleError";

import userRoutes from "../routes/userRoutes";
import productRoutes from "../routes/productRoutes";
import orderRoutes from "../routes/orderRoutes";

const app = express()

require('../db/db')

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


app.get("/", (req: Request, res: Response) => {
    res.json({ message: "app health ok !" });
})

app.use("/api/users/", userRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/orders/", orderRoutes);



// Use Middleware
app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
    console.log(colors.green(`Server is running at http://localhost:${3000}`));
})
