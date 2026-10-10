const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
   title:{
   type :  String,
   required: true,
  },
   description: String,
   image:{
    filename: String,
     url: String,
  } ,
    price:  Number,
    location: String ,
    country:   String,
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    owner: {
      type : Schema.Types.ObjectId,
      ref: "User",
    },
    geometry: {
      type : {
      type: String,  //Don't do `{location: {type: String}}`
      enum: ['Point'],  // 'location.type' must be 'point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  //new
  category: {
    type: String,
    enum: ['Trending','Farms', 'Rooms','Iconic Cities','Mountains Cities', 'Castles', 'Amazing Pools', 'Camping', 'Arctic', 'Domes', 'Boats'],
  },
});

listingSchema.post("findOneAndDelete", async(listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews} })
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;