import { CRUD } from "../../common/interfaces/crud.interface";
import debug from "debug";
import config from "../../config/config";
import imagesDao from "./images.dao";
import ProductsService from "../products/products.service";
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
cloudinary.config(config.cloundinaryUrl);

const log: debug.IDebugger = debug("app:images-service");

class ImagesService implements CRUD {
  async uploadImage(file: any) {
    const image: any = await this.uploadImageCloudinary(file)
    const destructuringImagen = image.split('/')  
    const name = destructuringImagen[ destructuringImagen.length -1 ]
    const version = destructuringImagen[ destructuringImagen.length -2 ]

    //guardo el nombre de la imagen en la base de datos
    const imageDB = await this.saveImageDB(`${version}/${name}`)

    return {
      imageId: imageDB?.id,
      imageUrl: `${config.cloudinaryPath}${version}/${name}` 
    }      
  }

  async deleteImage(imageId: string) {
    const image: any = await imagesDao.getImageById(imageId)    
    const destructuringImagen = image.image.split('/')  
    const name = destructuringImagen[ destructuringImagen.length -1 ]
    const [ publicId ] = name.split('.')

    await this.deleteProductReferenceImage(imageId) //borro del los productos que tienen esta imagen
    await cloudinary.uploader.destroy(publicId) //borro de cloudinary
    await imagesDao.deleteImage(imageId) //borro de la base de datos

    return image
  }

  async deleteProductReferenceImage(imageId: string) {
    const products: any = await ProductsService.getAll()
    for(let i = 0; i < products.length; i++){
      let array = products[i].images
      array = array.filter((x: any) => x.id !== imageId)
      await ProductsService.deleteImageReference(products[i].id, array)
    }
    return
  }

  uploadImageCloudinary(file: any){
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error: any, result: any) => {
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
  }

  async saveImageDB (image: string) {
    return imagesDao.saveImage(image)
  }

  async getImageById(imageId: string) {
    return imagesDao.getImageById(imageId)
  }

  async getImageUrl(imageId: string) {
    const imageName = await imagesDao.getImageById(imageId)
    return {
      imageId: imageName?.id,
      imageUrl: `${config.cloudinaryPath}${imageName?.image}` 
    }
  }
}

export default new ImagesService();
