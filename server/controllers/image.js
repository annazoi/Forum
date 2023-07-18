// const Image = require("../model/Image");

// const getImage = async (req, res) => {
//   try {
//     Image.find({}).then((data) => {
//       res.render("imagepage", { items: data });
//     });
//   } catch (err) {
//     res.json({ message: err });
//   }
// };

// const postImage = async (req, res, next) => {
//   let obj = {
//     label: req.body.label,
//     description: req.body.description,
//     img: {
//       data: fs.readFileSync(
//         path.join(__dirname + "/uploads/" + req.file.filename)
//       ),
//       contentType: "image/png",
//     },
//   };
//   try {
//     Image.create(obj).then((item) => {
//       item.save();
//       res.redirect("/");
//     });
//   } catch (err) {
//     res.json({ message: err });
//   }
// };

// exports.getImage = getImage;
// exports.postImage = postImage;
