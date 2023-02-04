import { MaxRectsBin } from "./MaxRectsBin.js";

export default class ImagePacker<T> { 
  constructor(width: number, height: number, images: Array<T & { width: number, height: number }>) {
    this.bin = new MaxRectsBin(width, height);
    this.images = images;
  }

  private bin: MaxRectsBin;
  private images: Array<T & { width: number, height: number }>;

  packImages(): Array<Array<T & { width: number, height: number, x: number, y: number }>> {
    try {
      const packedImages = [];
      let currentImage = [];
  
      for (const image of this.images) {
        if (image.width > this.bin.width || image.height > this.bin.height) {
          throw new Error("Input image dimensions are greater than the packer dimensions");
        }
  
        const packedImage = this.bin.insertRect(image.width, image.height);
  
        if (packedImage === null) {
          packedImages.push(currentImage);
          this.bin.reset();
          currentImage = [];
        }
  
        image.x = packedImage.x;
        image.y = packedImage.y;
        currentImage.push(image);
      }
  
      packedImages.push(currentImage);
  
      return packedImages;
    } catch (error) {
      console.error(error);
    }
  }
}