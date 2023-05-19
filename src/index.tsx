import { Canvas, Image } from 'react-native-canvas';
import ImageSize from 'react-native-image-size';

export async function getDominantColor(imagePath: string) {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const size = await ImageSize.getSize(imagePath);
      const { width, height } = size;

      getPixelData(width, height, imagePath, (dominantColor: string) => {
        resolve(dominantColor);
      });
    } catch (error) {
      reject('Resim boyutu alınamadı: ' + error);
    }
  });
}

const getPixelData = (
  width: number,
  height: number,
  imagePath: string,
  returnDominantColor: Function,
) => {
  let canvas = new Canvas(width, height);
  const ctx = canvas.getContext('2d');

  const image = new Image(canvas, width, height);
  image.src = imagePath;

  image.addEventListener('load', () => {
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, width, height);

    returnDominantColor(findDominantColor(imageData.data));
  });

  image.addEventListener('loadstart', () => {
    ctx.drawImage(image, 0, 0);
  });
};

const findDominantColor = (pixelData: any) => {
  let totalRed = 0;
  let totalGreen = 0;
  let totalBlue = 0;

  for (let i = 0; i < pixelData.length; i += 4) {
    totalRed += pixelData[i];
    totalGreen += pixelData[i + 1];
    totalBlue += pixelData[i + 2];
  }

  const pixelCount = pixelData.length / 4;
  const dominantRed = Math.round(totalRed / pixelCount);
  const dominantGreen = Math.round(totalGreen / pixelCount);
  const dominantBlue = Math.round(totalBlue / pixelCount);

  return `rgb(${dominantRed}, ${dominantGreen}, ${dominantBlue})`;
};
