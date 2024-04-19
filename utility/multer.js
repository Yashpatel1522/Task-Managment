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



// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,path.join(__dirname,"../public/assets/taskdetailfiles"))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

module.exports ={ userProfileStorage,upload} 