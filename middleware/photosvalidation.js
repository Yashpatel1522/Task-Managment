const fs = require("fs");

exports.profileUploadesMiddleware = (req, res, next) => {
  const magicNumber = {
    jpg: Buffer.from([0xff, 0xdb, 0xff, 0xe0]),
    png: Buffer.from([0x89, 0x50, 0x4e, 0x47]),
    pdf: Buffer.from([0x25, 0x50, 0x44, 0x46]),
  };
  const buffer = fs.readFileSync(req.file.path);
  // console.log("jpg", buffer.slice(0, 4).equals(magicNumber.jpg));
  if(buffer.slice(0, 4).equals(magicNumber.jpg)|| buffer.slice(0, 4).equals(magicNumber.png)) 
  {
    next()
  }
  else
  {
    fs.unlink(file.path)
    res.send({
      flag:false,
      msg:"Please Uploade JPG or PNG only"
    })
  }
  // console.log("png", buffer.slice(0, 4).equals(magicNumber.png));
  // console.log("pdf", buffer.slice(0, 4).equals(magicNumber.pdf));
  // next();
};
