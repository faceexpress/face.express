const fr = require('face-recognition')
const detector = fr.FaceDetector()

const image = fr.loadImage('sergey/1.jpg')

const faceImages = detector.detectFaces(image)

faceImages.forEach((img, i) => fr.saveImage(`sergey/face/${i}.jpg`, img))

// fr.hitEnterToContinue()
