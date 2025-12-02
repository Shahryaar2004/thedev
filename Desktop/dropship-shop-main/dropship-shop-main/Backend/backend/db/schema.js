const mongoose = require('mongoose')
require('./config')

const mongoschemea = mongoose.Schema({
    email : String,
    password : String,
    name:String
})

const productSchema = mongoose.Schema(
  {
    sku: String,
    slug: String,
    name: String,
    title: String,
    description: String,

    category: {
      type: String,
      required: true,
      enum: ["Clothing", "Kitchen", "Accessories", "Electronics"],
      default: "Clothing",
    },
    brand: String,

    price: Number,
    originalPrice: Number,
    saleOffPercent: Number,
    currency: String,

    quantity: Number,
    maxPurchaseLimit: Number,

    cashOnDelivery: {
      type: Boolean,
      default: true,
    },

    mainImage: String,
    image: String,
    images: [String],

    colors: [
      {
        name: String,
        code: String,
      },
    ],

    sizes: [String],
    tags: [String],

    rating: Number,
    ratingCount: Number,

    isFeatured: Boolean,
    isNew: Boolean,
    status: String,

    shippingFee: Number,
    freeShipping: Boolean,
    returnPolicyDays: Number,

    label: String,

    publish: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);




const adminSchema  = mongoose.Schema({
    username : String,
    password : String
})
const adminPagemodel = new mongoose.model('admins' , adminSchema)
const productmodel = new mongoose.model('product' , productSchema)
const mongoosemodel = new mongoose.model('usersdatas' , mongoschemea)

module.exports = {
  mongoosemodel,
  productmodel,
  adminPagemodel
};
