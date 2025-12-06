export const validateName = (name) => {
  if (!name.trim()) return "Name is required";
  return "";
};

export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) return "Enter a valid email address";

  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";

  if (password.length < 8)
    return "Password must be at least 8 characters long";

  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter";

  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter";

  if (!/[0-9]/.test(password))
    return "Password must contain at least one number";

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return "Password must contain at least one special character";

  return "";
};
