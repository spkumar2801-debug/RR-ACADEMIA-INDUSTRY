import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";
import { Logo } from "../components/common/Logo";
import { getFirebaseDiagnosticInfo } from "../services/firebase";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Info,
  Wrench,
  Copy,
  Check,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [showApiKeyGuide, setShowApiKeyGuide] = useState(false);
  const [copiedUid, setCopiedUid] = useState(false);

  const { login, user, adminData, authAttempt } = useAdminAuth();
  const navigate = useNavigate();
  const diagnostics = getFirebaseDiagnosticInfo();

  // If already logged in and authorized, redirect immediately to dashboard
  if (user && adminData) {
    navigate("/admin");
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate("/admin");
    } catch (err: any) {
      const msg = err.message || "Failed to authenticate administrator.";
      setError(msg);
      if (msg.includes("auth/api-key-not-valid") || msg.includes("API key")) {
        setShowApiKeyGuide(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUid = (uid: string) => {
    navigator.clipboard.writeText(uid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2500);
  };

  const isApiKeyError = Boolean(error && (error.includes("auth/api-key-not-valid") || error.includes("API key")));

  return (
    <div className="min-h-screen bg-[#070D1F] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-[#1C2541]/80 blur-3xl" />
      </div>

      <div className="w-full max-w-lg space-y-6 sm:space-y-8 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-block">
            <Logo variant="mark" theme="light" size="lg" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-cinzel tracking-wide">
            Administrator Portal
          </h1>
          <p className="text-xs text-slate-400">
            Secure identity verification for RR Academia &amp; Industry Connect
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#0B132B] border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="font-bold block text-red-200">Authentication Notice</span>
                <p className="text-[11px] leading-relaxed text-red-300/90 break-words">{error}</p>
                {isApiKeyError && (
                  <button
                    type="button"
                    onClick={() => setShowApiKeyGuide(!showApiKeyGuide)}
                    className="text-[#E5C158] hover:underline font-bold mt-1 text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Wrench className="w-3 h-3" />
                    <span>View Firebase Console Action Checklist</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Dedicated Allowlist Registration Assistant (Active when Auth succeeds but Firestore check needs setup) */}
          {authAttempt && authAttempt.uid && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-slate-200 text-xs space-y-3 animate-fade-in shadow-md">
              <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                <div className="flex items-center gap-2 text-[#E5C158] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Firebase Auth Verified • Firestore Allowlist Action Needed</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-[#E5C158]">
                  Step 2 Pending
                </span>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Authenticated Email:</span>
                    <span className="text-white font-mono font-semibold">{authAttempt.email}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-400 flex-shrink-0">Verified User UID:</span>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <code className="text-[#E5C158] font-mono text-[10px] truncate max-w-[200px] sm:max-w-[240px]">
                        {authAttempt.uid}
                      </code>
                      <button
                        type="button"
                        onClick={() => handleCopyUid(authAttempt.uid)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer flex-shrink-0 flex items-center gap-1 text-[10px]"
                        title="Copy UID to Clipboard"
                      >
                        {copiedUid ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-slate-300">
                  <p className="font-semibold text-[#E5C158]">
                    {authAttempt.stage === "firestore-permission-denied" && "Resolution: Publish Firestore Rules in Firebase Console"}
                    {authAttempt.stage === "allowlist-missing" && "Resolution: Register UID in adminUsers Collection"}
                    {authAttempt.stage === "role-denied" && "Resolution: Administrative Privilege Required"}
                    {authAttempt.stage === "auth-failed" && "Resolution: Verify Identity Credentials"}
                  </p>

                  {authAttempt.stage === "firestore-permission-denied" && (
                    <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-400 leading-relaxed">
                      <li>
                        Open{" "}
                        <a
                          href="https://console.firebase.google.com/project/rr-academia/firestore/rules"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#E5C158] underline inline-flex items-center gap-0.5"
                        >
                          Firebase Console &gt; Firestore Rules <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        , paste the verified <code className="text-white font-mono">firestore.rules</code> file from this workspace, and click <strong className="text-white">Publish</strong>.
                      </li>
                      <li>
                        Confirm that collection <strong className="text-white font-mono">adminUsers</strong> has a document whose <strong className="text-white">Document ID</strong> matches your verified UID: <code className="text-[#E5C158] font-mono font-bold">{authAttempt.uid}</code>.
                      </li>
                      <li>
                        Ensure the document fields are correctly typed: <code className="text-white font-mono">active: true</code> (boolean) and <code className="text-white font-mono">role: &quot;admin&quot;</code> (string).
                      </li>
                      <li>Click &quot;Sign In to Dashboard&quot; below once published.</li>
                    </ol>
                  )}

                  {authAttempt.stage === "allowlist-missing" && (
                    <ol className="list-decimal pl-4 space-y-1 text-[11px] text-slate-400 leading-relaxed">
                      <li>
                        Open{" "}
                        <a
                          href="https://console.firebase.google.com/project/rr-academia/firestore/data"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#E5C158] underline inline-flex items-center gap-0.5"
                        >
                          Firestore &gt; Data <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                        , select or create collection <strong className="text-white font-mono">adminUsers</strong>, and click <strong className="text-white">Add document</strong>.
                      </li>
                      <li>
                        Set <strong className="text-white">Document ID</strong> to your copied UID: <code className="text-[#E5C158] font-mono font-bold">{authAttempt.uid}</code> <em className="text-amber-300">(Do NOT use your email as Document ID!)</em>.
                      </li>
                      <li>
                        Add these exact document fields:
                        <div className="bg-slate-950 p-2 rounded-lg font-mono text-[10px] text-slate-300 mt-1 space-y-0.5">
                          <div>uid: &quot;{authAttempt.uid}&quot; (string)</div>
                          <div>email: &quot;{authAttempt.email}&quot; (string)</div>
                          <div>role: &quot;admin&quot; (string)</div>
                          <div>active: true (boolean)</div>
                        </div>
                      </li>
                      <li>Click <strong className="text-white">Save</strong>, then click &quot;Sign In to Dashboard&quot; below.</li>
                    </ol>
                  )}

                  {authAttempt.stage === "role-denied" && (
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Your account document exists in <code className="text-white font-mono">adminUsers</code>, but does not have active administrative privileges. In Firebase Console &gt; Firestore &gt; adminUsers &gt; {authAttempt.uid}, verify that <code className="text-white font-mono">role</code> is set to <strong className="text-white">&quot;admin&quot;</strong> and <code className="text-white font-mono">active</code> is set to <strong className="text-white">true</strong>.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Firebase Console Action Checklist for API Key verification */}
          {showApiKeyGuide && (
            <div className="p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-slate-300 text-xs space-y-2.5 animate-fade-in">
              <div className="flex items-center gap-2 text-[#E5C158] font-bold">
                <Wrench className="w-4 h-4 text-[#D4AF37]" />
                <span>Google Cloud / Firebase Console Checklist:</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                The application runtime correctly loaded project <strong className="text-white font-mono">{diagnostics.projectId}</strong> with API key <strong className="text-white font-mono">{diagnostics.apiKeyMasked}</strong>. To authorize requests from Google Identity Toolkit:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-[11px] text-slate-300 leading-relaxed">
                <li>
                  Open <a href={`https://console.cloud.google.com/apis/library/identitytoolkit.googleapis.com?project=${diagnostics.projectId}`} target="_blank" rel="noreferrer" className="text-[#E5C158] underline">Google Cloud Console &gt; Identity Toolkit API</a> and click <strong className="text-white">Enable</strong>.
                </li>
                <li>
                  Open <a href={`https://console.cloud.google.com/apis/credentials?project=${diagnostics.projectId}`} target="_blank" rel="noreferrer" className="text-[#E5C158] underline">APIs &amp; Services &gt; Credentials</a>, select your Web API Key:
                  <ul className="list-disc pl-4 mt-0.5 space-y-0.5 text-slate-400">
                    <li>Under <strong className="text-white">API restrictions</strong>, ensure <strong className="text-white">Identity Toolkit API</strong> and <strong className="text-white">Token Service API</strong> are permitted (or choose &quot;Don&apos;t restrict key&quot;).</li>
                    <li>Under <strong className="text-white">Application restrictions</strong>, ensure <strong className="text-white">localhost</strong> is allowed (or &quot;None&quot; during development).</li>
                  </ul>
                </li>
                <li>
                  In <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-[#E5C158] underline">Firebase Console &gt; Authentication &gt; Sign-in method</a>, ensure <strong className="text-white">Email/Password</strong> is enabled.
                </li>
              </ol>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="adminEmail"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="adminEmail"
                  type="email"
                  required
                  disabled={loading}
                  autoComplete="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="adminPassword"
                className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  id="adminPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white cursor-pointer transition-colors p-0.5 disabled:opacity-60"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B38F26] text-[#0B132B] font-extrabold py-3 rounded-xl shadow-lg hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0B132B] border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Administrator Authorization...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Secure Authorization Architecture Disclosure */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Firebase Auth &amp; Firestore Allowlist</span>
            </span>

            <button
              type="button"
              onClick={() => setShowSetupGuide(!showSetupGuide)}
              className="text-[#E5C158] hover:text-[#D4AF37] font-semibold cursor-pointer flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Setup Guide</span>
            </button>
          </div>
        </div>

        {/* Collapsible Setup Instructions for Authorized Administrator */}
        {showSetupGuide && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 text-slate-300 text-xs space-y-3 animate-fade-in shadow-xl">
            <div className="flex items-center gap-2 text-[#E5C158] font-bold">
              <Info className="w-4 h-4 text-[#D4AF37]" />
              <span>Administrator Account Provisioning Steps:</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Active Project:</span>
                <span className="text-white font-mono">{diagnostics.projectId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>API Key Loaded:</span>
                <span className="text-[#D4AF37] font-mono">{diagnostics.apiKeyMasked}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Database Client:</span>
                <span className="text-emerald-400 font-mono">Initialized</span>
              </div>
            </div>
            <ol className="list-decimal pl-5 space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
              <li>
                In your <strong className="text-white">Firebase Console</strong> under <strong className="text-white">Authentication &gt; Users</strong>, create an Email/Password account for the administrator.
              </li>
              <li>
                Copy the created account&apos;s <strong className="text-[#E5C158] font-mono">User UID</strong>.
              </li>
              <li>
                In <strong className="text-white">Cloud Firestore</strong>, open the <strong className="text-white font-mono">adminUsers</strong> collection and create a document with the Document ID set exactly to that <strong className="text-[#E5C158] font-mono">UID</strong> (not email!).
              </li>
              <li>
                Add the document fields:
                <div className="bg-slate-950 p-2 rounded-lg font-mono text-[10px] text-slate-300 mt-1 space-y-0.5">
                  <div>uid: &quot;&lt;your-uid&gt;&quot; (string)</div>
                  <div>email: &quot;&lt;your-email&gt;&quot; (string)</div>
                  <div>role: &quot;admin&quot; (string)</div>
                  <div>active: true (boolean)</div>
                </div>
              </li>
              <li>
                Ensure <strong className="text-white font-mono">firestore.rules</strong> is published in Firebase Console &gt; Firestore Database &gt; Rules.
              </li>
            </ol>
          </div>
        )}

        {/* Return to Public Website */}
        <div className="text-center">
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-[#E5C158] transition-colors"
          >
            ← Back to RR Academia Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
