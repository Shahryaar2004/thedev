const express = require("express");
const md5 = require("md5");
const sendEmail = require("./Mailsend");               
const welcomeEmailTemplate = require("./WelocmeEmailTemplate");
const loginmail = require('./loginmail')
const cors = require("cors");
const {
  mongoosemodel,
  productmodel,
  adminPagemodel: adminmodel,
} = require("./schema");
const jwt = require("jsonwebtoken");
const { mongo } = require("mongoose");



const jwtkey = "e-comdb";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());


// app.post("/register", async (req, res) => {
//   try {
//     req.body.password = md5(req.body.password);
//     const newData = new mongoosemodel(req.body);
//     const result = await newData.save();

//     jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (error, token) => {
//       if (error) {
//         res.send("huhu");
//       } else {
//      try{ 
//           sendEmail({
//          to: result.email,
//          subject : "welcome to e-com bazar",
//          text:"you have successfully registered",
//          html:{mail}

//   })
// }     
// catch(err){
//   console.log(err)
// }   res.send({ result, auth: token });

//       }
//     });
//   } catch (err) {
//     res.send("an error occured sending data failed");
//   }
// });
app.post("/register", async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    const newData = new mongoosemodel(req.body);
    const result = await newData.save();

    
    const token = jwt.sign({ result }, jwtkey, { expiresIn: "2h" });

    try {
   
      await sendEmail({
        to: result.email,
        subject: "Welcome to e-com bazar",
        text: "You have successfully registered",
        html: welcomeEmailTemplate, 
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
  }

    
    res.send({ result, auth: token });
  } catch (err) {
    console.error(err);
    res.send("An error occurred sending data failed");
  }
});

app.post("/getdata", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashes = md5(password);
    const admin = await mongoosemodel.findOne({ email, password: hashes });

    if (admin) {
      const token = jwt.sign({ id: admin._id }, jwtkey, { expiresIn: "2h" });
      try {
      await sendEmail({
        to: admin.email,
        subject: "Welcome to e-com bazar",
        text: "You have successfully registered",
        html: loginmail,
      });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
     
    }

    
   
      res.status(200).json({
        success: true,
        user: admin,
        token: token,
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
});

app.post("/addProduct", async (req, res) => {
  const productData = new productmodel(req.body);
  const saveData = await productData.save();
  res.send(saveData);
});
app.get("/products", async (req, res) => {
  const allProducts = await productmodel.find();
  res.send(allProducts);
});
app.post("/Searchproducts", async (req, res) => {
  try {
    const name = req.body.name;

    const products = await productmodel.find({
      name: { $regex: name, $options: "i" },
    });

    res.send(products);
  } catch (err) {
    console.error("Search error");
    res.send({ message: "Server error" });
  }
});
app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const result = await productmodel.findByIdAndDelete(req.params.id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, deleted: result });
  } catch (err) {
    console.error("Delete error:", err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await adminmodel.findOne({ username, password });

    if (admin) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.put("/updateProduct/:id", async (req, res) => {
  const { id } = req.params;
  const { publish } = req.body;

  try {
    const updated = await productmodel.findByIdAndUpdate(
      id,
      { publish },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product updated", updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
