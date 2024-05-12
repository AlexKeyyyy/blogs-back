import express from 'express'
import mongoose from "mongoose";
import {registerValidator, postCreateValidator, loginValidator} from './validations/auth.js'
import checkAuth from "./utils/checkAuth.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";
import * as UserController from './controllers/UserController.js'
import * as PostController from './controllers/PostController.js'
import multer from 'multer'
import cors from 'cors'


mongoose.connect('mongodb+srv://root:root@cluster0.jgfldjv.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
    .then(()=> console.log("DB ok"))
    .catch((err) => console.log('BD error', err))

const app = express()

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, "uploads");
    },
    filename: (_, file, cb)=> {
        cb(null, file.originalname)
    },
})

const upload = multer({storage});

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.post('/auth/login', loginValidator, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidator, handleValidationErrors, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/tags', PostController.getLastTags)

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts',checkAuth, postCreateValidator, handleValidationErrors, PostController.create)
app.delete('/posts/:id', checkAuth, PostController.remove)
app.patch('/posts/:id', checkAuth, postCreateValidator, handleValidationErrors, PostController.update)

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
})

app.get('/posts/tags', PostController.getLastTags)



app.listen(4444, (err) => {
    if(err) {
        return console.log(err)
    }
    console.log('Server is working')
})