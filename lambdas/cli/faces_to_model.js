const fs = require('fs');
const fr = require('face-recognition')
const recognizer = fr.FaceRecognizer()

var args = process.argv.slice(2);
if (args.length == 0) {
  console.log('No name provided');
  process.exit()
}
var name = args[0]

var facesDirectory = __dirname + '/assets/faces/' + name

fs.readdir(facesDirectory,function(err, facesPaths){
  if(err) throw err;
  let faces = []
  facesPaths.forEach(function(facePath) {
    faces.push(fr.loadImage(facesDirectory + '/' + facePath))
  });
  recognizer.addFaces(faces, name);

  fs.writeFileSync(__dirname + '/models/' + name + '.json', JSON.stringify(recognizer.serialize()))

  // const predictions = recognizer.predict(sheldonFaceImage)
});
