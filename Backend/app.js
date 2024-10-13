import express from 'express';
import db from './config/db.js'
import cors from 'cors';
import router from './routes/index.js';
import bodyParser from 'body-parser';
const app = express();


app.use(cors()); // Allow Cross origin
app.use(express.json()); // Allow     

app.get('/fakeproducts', (req, res) => {
    res.json({
        message: "Successfully get",
        status: true,
        product: [
            { name: "Black Valved Parse" },
            { name: "Gray Valved Parse" },
            { name: "White Valved Parse" },
        ]
    })
})

app.use('/', router);
app.use(bodyParser.json());


app.listen(3008, () => {
    console.log('Server listining at 3008')

    db.connection.once('open', () => {
        console.log('DB Connected Successfully');
    })
})

