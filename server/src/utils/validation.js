import validator from "validator";
import { ALLOWED_EDIT_FIELDS } from "../constants.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";

export const validateRegisterData = (body) => {
  const { firstName, email, password } = body;

  if (!firstName || !email || !password) {
    throw new Error("First name, email and password fields are required!");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!");
  }
};

export const validateProfileEditData = (body) => {
  const isEditAllowed = Object.keys(body).every((field) =>
    ALLOWED_EDIT_FIELDS.includes(field)
  );

  if (!isEditAllowed)
    throw new Error(
      "We can only edit the following fields: " + ALLOWED_EDIT_FIELDS.join(", ")
    );

  const { firstName, lastName, age, gender, about, skills, imageUrl } = body;

  if (firstName && firstName.length < 3)
    throw new Error("First name must be at least 3 characters long!");

  if (lastName && lastName.length < 3)
    throw new Error("Last name must be at least 3 characters long!");

  if (age && (age < 15 || age > 100))
    throw new Error("Age must be between 15 and 100!");

  if (gender && !["male", "female", "other"].includes(gender))
    throw new Error("Invalid gender value!");

  if (skills && skills.length > 8) {
    throw new Error("Skills cannot be more than 8");
  }

  if (about && about.length > 250)
    throw new Error("About section cannot exceed 250 characters!");

  if (imageUrl && !validator.isURL(imageUrl)) {
    throw new Error("Image URL is not valid!");
  }
};

export const validateChangePasswordData = async (req) => {
  const { currentPassword, newPassword } = req?.body;

  if (!currentPassword || !newPassword)
    throw new Error("Please enter current password and new password!");

  const isValidPassword = await bcrypt.compare(
    currentPassword,
    req?.user?.password
  );

  if (!isValidPassword) throw new Error("Invalid current password!");

  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("New password is not strong enough!");
  }
};

export const validateSendrequestData = async (req) => {
  const { receiverId, status } = req.params;

  if (!receiverId || !status) {
    throw new Error("Receiver ID and status are required.");
  }

  const ALLOWED_STATUS = ["interested", "ignored"];

  if (!ALLOWED_STATUS.includes(status))
    throw new Error("Invalid connection request!");

  const receiver = await User.findById(receiverId);

  if (!receiver) throw new Error("Invalid receiver ID!");
};

export const validateViewRequestData = (req) => {
  const { status, requestId } = req.params;

  if (!status || !requestId) throw new Error("Missing status or requestId");

  const ALLOWED_STATUS = ["accepted", "rejected"];
  if (!ALLOWED_STATUS.includes(status))
    throw new Error("Invalid request status!");
};
