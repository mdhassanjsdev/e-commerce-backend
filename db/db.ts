import mongoose from "mongoose";

const url: string = 'mongodb+srv://hassan:hassan@cluster0.tta7ad9.mongodb.net/mern-ecommerce'

mongoose.connect(url)
    .then(() => {
        console.log('mongodb connected');
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    })