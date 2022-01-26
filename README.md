# Responsive image gallery with React and imgix

This project is an example of how you can create a responsive image gallery with React, [imgix](https://www.imgix.com), and the [react-imgix](https://github.com/imgix/react-imgix) component.

## Setting up the project locally

To run the project on your local machine, follow these steps:

1. Clone this project.
2. In the project directory on your local machine, run `yarn` to install all the dependencies.
3. Use the `yarn run start` to start the development server and open the browser with the project.

## Using your own images

If you’d like to run the demo using your own set of images, follow the [imgix setup guide](https://docs.imgix.com/setup) to create an imgix account and connect an image source.

Once your image source is deployed in imgix, change the [images list and the image base URL](https://github.com/chief-wizard/react-imgix-responsive-gallery/blob/master/src/Gallery.js#L5-L11) in the `src/Gallery.js` file.
