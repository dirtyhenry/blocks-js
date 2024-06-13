/**
 * Loads an image from the specified URL and returns a promise that resolves
 * with the loaded image element or rejects with an error event if the image
 * fails to load.
 *
 * @param {string} imageURL - The URL of the image to load.
 * @returns {Promise<HTMLImageElement>} A promise that resolves with the loaded image element.
 */
export const loadImage = (imageURL: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image();

    const onLoad = () => {
      image.removeEventListener("load", onLoad);
      image.removeEventListener("error", onError);
      resolve(image);
    };

    const onError = (error: ErrorEvent) => {
      image.removeEventListener("load", onLoad);
      image.removeEventListener("error", onError);
      reject(error);
    };

    image.addEventListener("load", onLoad);
    image.addEventListener("error", onError);
    image.src = imageURL;
  });
};
