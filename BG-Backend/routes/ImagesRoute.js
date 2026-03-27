import express from 'express'
import upload from '../middleware/multer.js'
import auth from '../middleware/auth.js'
import {removeBgImage} from '../controllers/ImageController.js'

const imageRouter = express.Router()

imageRouter.post('/remove-bg',auth,upload.single('image'),removeBgImage)

export default imageRouter
