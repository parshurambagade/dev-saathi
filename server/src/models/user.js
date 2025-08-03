import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    about: {
      type: String,
      maxLength: 250,
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
        if (!["male", "female", "other"].includes(val)) {
          throw new Error("Invalid gender value!");
        }
      },
    },
    skills: {
      type: [String],
      validate(val) {
        if (val.length > 8) {
          throw new Error("Skills cant be more than 8");
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
    cloudinaryPublicId: {
      type: String,
      default: null,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    primiumExpiry: {
      type: Date,
      default: null,
      validate(val) {
        if (val !== null && !(val instanceof Date)) {
          throw new Error("Invalid date format for premium expiry!");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  try {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    if (!token) throw new Error("Token not found!");

    return token;
  } catch (error) {
    throw new Error("ERROR: " + error.message);
  }
};

userSchema.methods.comparePasswords = async function (password) {
  try {
    const user = this;

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) throw new Error("Invalid credentials!");

    return isPasswordValid;
  } catch (error) {
    throw new Error("ERROR: " + error.message);
  }
};
const User = mongoose.model("User", userSchema);

export default User;
