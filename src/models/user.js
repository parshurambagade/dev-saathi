import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 40,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      minLength: 12,
      maxLength: 30,
      validate(val) {
        if (!validator.isEmail(val)) {
          throw new Error("Enter valid email!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(val) {
        if (!validator.isStrongPassword(val)) {
          throw new Error("Enter strong password!");
        }
      },
    },
    age: {
      type: Number,
      min: 15,
      max: 100,
    },
    gender: {
      type: String,
      validate(val) {
        if (!["male", "female", "others"].includes(val)) {
          throw new Error("Invalid gender value!");
        }
      },
    },
    skills: {
      type: [String],
      validate(val) {
        if (val.length > 10) {
          throw new Error("Skills cant be more than 10");
        }
      },
    },
    imageUrl: {
      type: String,
      default:
        "https://www.vhv.rs/dpng/d/505-5058560_person-placeholder-image-free-hd-png-download.png",
      maxLength: 300,
      validate(val) {
        if (!validator.isURL(val)) {
          throw new Error("Enter valid image url!");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
