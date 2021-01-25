/* eslint-disable no-underscore-dangle */
/* eslint-disable no-global-assign */
/* eslint-disable func-names */
/* eslint-disable no-new */
import Resizer from 'react-image-file-resizer';

const resizeFile = (file, width, height) => {
  console.log('10*****', file, width, height);
  return new Promise(resolve => {
    Resizer.imageFileResizer(
      file, // Is the file of the image which will resized.
      width, // Is the maxWidth of the resized new image.
      height, // Is the maxHeight of the resized new image.
      'JPEG', // Is the compressFormat of the resized new image.
      100, // Is the quality of the resized new image.
      0, // Is the degree of clockwise rotation to apply to uploaded image.
      uri => {
        resolve(uri);
      }, // Is the callBack function of the resized new image URI.
      'blob', // Is the output type of the resized new image.
      // 300, // Is the minWidth of the resized new image.
      // 500, // Is the minHeight of the resized new image.
    );
  });
};

export default function resizeImage(file, width, height) {
  console.log('file', file, width, height);
  return new Promise((resolve, reject) =>
    resizeFile(file, width, height)
      .then(response => {
        const file1 = new File([response], file.name, { type: file.type });
        console.log(file1);
        resolve(file1);
      })
      .catch(err => {
        reject(err);
      }),
  );
}
