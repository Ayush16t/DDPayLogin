import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const rawTime = (location.state as { submittedAt?: string })?.submittedAt;
  const formattedTime = rawTime
    ? new Date(rawTime).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : null;

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(160deg, #0f4c2a 0%, #1a7a47 40%, #2eaa6c 75%, #5dd69a 100%)",
        padding: "32px 24px",
      }}
    >
      {/* Decorative Circles */}
      <div
        className="absolute rounded-full"
        style={{
          width: "380px",
          height: "380px",
          top: "-100px",
          right: "-100px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "260px",
          height: "260px",
          bottom: "-60px",
          left: "-80px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "140px",
          height: "140px",
          top: "60px",
          left: "30px",
          background: "rgba(255,255,255,0.04)",
        }}
      />

      {/* Logo */}
      <div
        className="mb-8 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.5s ease",
        }}
      >
        <img
          src="https://cdn-ai.onspace.ai/onspace/files/FbTXz8eM2zcJYp9HmCNu2K/9888.jpg"
          alt="DDPay Logo"
          style={{
            width: "110px",
            height: "90px",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.25))",
          }}
        />
      </div>

      {/* Main Card */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          width: "100%",
          maxWidth: "360px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "28px",
          border: "1px solid rgba(255,255,255,0.25)",
          padding: "44px 32px 40px",
          boxShadow: "0 24px 64px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
          transition: "all 0.55s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Animated Check Icon */}
        <div
          className="flex items-center justify-center rounded-full mb-6"
          style={{
            width: "100px",
            height: "100px",
            background: "linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))",
            border: "2px solid rgba(255,255,255,0.35)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
          }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "74px",
              height: "74px",
              background: "linear-gradient(135deg, #ffffff, #d0f5e6)",
              boxShadow: "0 4px 20px rgba(255,255,255,0.4)",
            }}
          >
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
              <path
                d="M8 19l8 8 14-14"
                stroke="#1e8a54"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1
          className="font-bold text-center mb-3"
          style={{
            fontSize: "24px",
            color: "#ffffff",
            letterSpacing: "0.5px",
            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          Submitted Successfully!
        </h1>

        {/* Divider */}
        <div
          style={{
            width: "48px",
            height: "3px",
            borderRadius: "2px",
            background: "rgba(255,255,255,0.5)",
            marginBottom: "20px",
          }}
        />

        {/* Message */}
        <p
          className="text-center leading-relaxed mb-10"
          style={{
            fontSize: "15px",
            color: "rgba(255,255,255,0.88)",
            lineHeight: "1.75",
            maxWidth: "280px",
          }}
        >
          Your report has been successfully submitted; your issue will be resolved promptly.
        </p>

        {/* Submission Time */}
        {formattedTime && (
          <div
            className="flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.3px" }}>
              {formattedTime}
            </span>
          </div>
        )}

        {/* OK Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full font-bold text-center transition-all active:scale-95"
          style={{
            height: "54px",
            fontSize: "17px",
            borderRadius: "27px",
            background: "linear-gradient(135deg, #ffffff, #e0f8ed)",
            color: "#1a7a47",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 6px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.8)",
            letterSpacing: "0.5px",
          }}
        >
          OK
        </button>
        {/* bottom note removed; time badge above is sufficient */}
      </div>

      {/* Version */}
      <div
        className="mt-8 relative z-10"
        style={{
          fontSize: "13px",
          color: "rgba(255,255,255,0.45)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
        }}
      >
        v1.2.2
      </div>
    </div>
  );
}
