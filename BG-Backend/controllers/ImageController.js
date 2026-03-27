import axios from 'axios'
import fs from 'fs'
import Formdata from 'form-data'
import user from '../models/UserModel.js'


const removeBgImage = async(req,res)=>{
    let imagePath

    try {

        const {userId} = req.user

        const User = await user.findById(userId)
        
        if(!User){
            return res.status(404).json({success:false,message:"User not Found"})     
        }

        if(!req.file?.path){
            return res.status(400).json({success:false,message:"Please upload an image"})
        }

        imagePath = req.file.path

        const imageFile = fs.createReadStream(imagePath)

        const formData = new Formdata()
        formData.append('image_file',imageFile)

        const clipdropApiKey = process.env.CLIPDROP_API || process.env.CLIPBORD_API

        if(!clipdropApiKey){
            return res.status(500).json({success:false,message:"Background removal API key is missing"})
        }

        const {data} = await axios.post('https://clipdrop-api.co/remove-background/v1',formData,{
            headers:{
                ...formData.getHeaders(),
                'x-api-key':clipdropApiKey
            },
            responseType:'arraybuffer'

        })
      const base64Image = Buffer.from(data, 'binary').toString('base64');
const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

        
        res.json({success:true,resultImage,message:"Image background removed successfully"})

    } catch (error) {
        console.log(error)
        const message = error.response?.data
            ? Buffer.from(error.response.data).toString('utf-8')
            : "Internal Server Error"
        res.status(500).json({success:false,message})
    } finally {
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlink(imagePath, () => {})
        }
    }
}

export {removeBgImage}
