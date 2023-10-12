import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cor from 'cors'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'



import authRoutes from './routes/auth.js'
import { register } from './controllers/auth.js'
//import { verifyToken } from 'middleware/auth.js'
import userRoutes from './routes/user.js'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


dotenv.config()

const app = express()
app.use(morgan('common'))
app.use(cor())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'public/assets')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

app.post('/auth/register', upload.single('picture'), register)

 app.use('/auth', authRoutes)
 app.use('/user', userRoutes)

const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
        console.log('connect database successfully')
    })
}
).catch((error) => {
    console.log(error.message)
})


app.get('/',(req, res) =>{
    console.log(req);
    return res.status(234).send('Welcome new user');
})