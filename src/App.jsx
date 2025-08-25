// Import React library and the useState hook
import React, { useState } from "react";

// Import CSS styles for this component
import "./App.css";

// Default empty state for the form
const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  dob: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

function App() {
  // State hooks
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validate one field
  const validateField = (name, value, allValues = formData) => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        return "";
      case "lastName":
        if (!value.trim()) return "Last name is required";
        return "";
      case "email":
        if (!value) return "Email is required";
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Email address is invalid";
        return "";
      case "phone":
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone must be 10 digits";
        return "";
      case "country":
        if (!value) return "Please select a country";
        return "";
      case "dob":
        if (!value) return "Date of birth is required";
        return "";
      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        return "";
      case "confirmPassword":
        if (!value) return "Confirm Password is required";
        if (value !== allValues.password) return "Passwords do not match";
        return "";
      case "terms":
        if (!value) return "You must accept the terms";
        return "";
      default:
        return "";
    }
  };

  // Validate entire form
  const validateForm = () => {
    const nextErrors = {};
    Object.keys(formData).forEach((key) => {
      const msg = validateField(key, formData[key], formData);
      if (msg) nextErrors[key] = msg;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // Handle typing
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    const updated = { ...formData, [name]: newValue };
    setFormData(updated);

    // live validate if touched
    if (touched[name]) {
      const msg = validateField(name, newValue, updated);
      setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    const { name, type, value, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const msg = validateField(name, val, formData);
    setErrors((prev) => ({ ...prev, [name]: msg || undefined }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // mark all as touched
    const allTouched = {};
    Object.keys(formData).forEach((key) => (allTouched[key] = true));
    setTouched(allTouched);

    if (validateForm()) {
      alert("Account Created Successfully ✅");
      setFormData(initialForm);
      setErrors({});
      setTouched({});
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} noValidate className="form-grid">
          {/* First Name */}
          <div className="form-group">
            <label>First Name</label>
            <input
              name="firstName"
              type="text"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label>Last Name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              type="tel"
              placeholder="Enter phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          {/* Country */}
          <div className="form-group">
            <label>Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="">Select…</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
            {errors.country && <span className="error">{errors.country}</span>}
          </div>

          {/* DOB */}
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Terms */}
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                onBlur={handleBlur}
              />{" "}
              I agree to the Terms & Conditions
            </label>
            {errors.terms && <span className="error">{errors.terms}</span>}
          </div>

          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;