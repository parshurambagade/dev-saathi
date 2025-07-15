import validator from "validator";

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
