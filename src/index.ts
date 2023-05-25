import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import colors from 'colors'

import userRoutes from "../routes/userRoutes";

const app = express()

require('../db/db')

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


app.get("/", (req: Request, res: Response) => {
    res.send("API IS RUNNING...");
})

app.use("/api/users/", userRoutes);


app.listen(3000, () => {
    console.log(colors.green(`Server is running at http://localhost:${3000}`));
})
