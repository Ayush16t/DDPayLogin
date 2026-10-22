interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl flex flex-col items-center"
        style={{
          width: "320px",
          padding: "36px 28px 28px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div
          className="flex items-center justify-center rounded-full mb-5"
          style={{ width: "72px", height: "72px", backgroundColor: "#e8f7ee" }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <circle cx="19" cy="19" r="19" fill="#2eaa6c" />
            <path
              d="M10 19l6 6 12-12"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Title */}
        <h2
          className="font-bold text-center mb-3"
          style={{ fontSize: "18px", color: "#1a1a1a" }}
        >
          Success!
        </h2>

        {/* Message */}
        <p
          className="text-center leading-relaxed mb-7"
          style={{ fontSize: "15px", color: "#555", lineHeight: "1.6" }}
        >
          Your report has been successfully submitted; your issue will be resolved promptly.
        </p>

        {/* OK Button */}
        <button
          onClick={onClose}
          className="w-full rounded-full font-bold text-white transition-all active:scale-95"
          style={{
            height: "48px",
            fontSize: "16px",
            background: "linear-gradient(135deg, #2eaa6c, #1e8a54)",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(46,170,108,0.3)",
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
