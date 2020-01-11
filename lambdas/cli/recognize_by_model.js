const fs = require('fs');
const fr = require('face-recognition')
const recognizer = fr.FaceRecognizer()
const detector = fr.FaceDetector()

var args = process.argv.slice(2);
if (args.length == 0) {
  console.log('No name provided');
  process.exit()
}
var name = args[0]

const modelState = require(__dirname + '/models/' + name + '.json')
recognizer.load(modelState)

var imagesDirectory = __dirname + '/assets/images'

fs.readdir(imagesDirectory, function(err, imagesPaths){
  if(err) throw err;
  let image,
      predictions,
      faces,
      imagesWithModel = []
  imagesPaths.forEach(function(imagePath) {
    if (imagePath.charAt(0) == '.') return
    image = fr.loadImage(imagesDirectory + '/' + imagePath)
    faces = detector.detectFaces(image)

    faces.forEach((img, i) => {
      prediction = recognizer.predictBest(img)
      if (prediction.distance <= 0.6) {
        imagesWithModel.push({
          file: imagePath,
          distance: prediction.distance
        })
        // destination.txt will be created or overwritten by default.
        fs.copyFile(imagesDirectory+'/'+imagePath, __dirname + '/result/'+imagePath, (err) => {
          if (err) throw err;
          console.log(imagePath + ' was copied to result folder');
        });

      }
    })
  });

  console.log(imagesWithModel)

});
