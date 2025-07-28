import axios from 'axios'
import fs from 'fs'
import Formdata from 'form-data'
import user from '../models/UserModel.js'
import { buffer } from 'stream/consumers';


const removeBgImage = async(req,res)=>{
    try {

        const {userId} = req.user

        const User = await user.findById(userId)
        
        if(!User){
            return res.status(404).json({success:false,message:"User not Found"})     
        }

        const imagePath = req.file.path

        const imageFile = fs.createReadStream(imagePath)

        const formData = new Formdata()
        formData.append('image_file',imageFile)

        const {data} = await axios.post('https://clipdrop-api.co/remove-background/v1',formData,{
            headers:{
                'x-api-key':process.env.CLIPBORD_API
            },
            responseType:'arraybuffer'

        })
      const base64Image = Buffer.from(data, 'binary').toString('base64');
const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

        
        res.json({success:true,resultImage,message:"Image background removed successfully"})

    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export {removeBgImage}