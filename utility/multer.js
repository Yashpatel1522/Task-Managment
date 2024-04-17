const multer = require('multer')
const path = require('path');

const userProfileStorage= multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(__dirname,"../public/assets/userprofiles"))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const taskdetailfiles=multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file)
    cb(null,path.join(__dirname,"../public/assets/taskdetailfiles"))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

module.exports={userProfileStorage,taskdetailfiles};