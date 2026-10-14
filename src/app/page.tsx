'use client';

import { useState } from 'react';
import { Sparkles, Globe, MessageSquare, Share2, Copy, Check, Image as ImageIcon, Loader2, Lock, KeyRound } from 'lucide-react';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'linkedin' | 'twitter' | 'instagram'>('linkedin');
  const [copied, setCopied] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setLoginError('Password ghalat hai bhai!');
      }
    } catch (err) {
      setLoginError('Connection error.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, niche }),
      });

      const data = await res.json();
      if (data.success) {
        setResult(data.data);
      } else {
        alert('Generation failed. Please check your API key.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend server.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 🔒 Agar Login nahi kiya toh Password Screen dikhao
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 bg-cyan-950/60 border border-cyan-800/50 rounded-2xl text-cyan-400">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Protected Access</h1>
            <p className="text-zinc-400 text-sm">Enter your master password to unlock Rayyan's Growth Engine.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">Password</label>
              <div className="relative">
                <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  placeholder="Enter secret password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition"
                  required
                />
              </div>
            </div>

            {loginError && <p className="text-red-400 text-xs text-center">{loginError}</p>}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-zinc-950 font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Unlock Engine 🚀'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // 🚀 Main Dashboard (Jab password theek ho jaye)
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Powered by Rayyan Agentic Developer
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            All-in-One AI Growth Engine
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto">
            Generate LinkedIn posts, Twitter threads, Reel scripts, and dynamic social banners in seconds.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-1">
              <label className="text-xs text-zinc-400 font-medium">Topic or Keyword *</label>
              <input
                type="text"
                placeholder="e.g. Next.js 15 Web Apps, AI Agent Workflows, Restaurant Marketing"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-zinc-400 font-medium">Target Niche (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Tech, SaaS, B2B, Fitness"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-zinc-950 font-bold py-3.5 px-6 rounded-xl transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating Viral Package...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate All Growth Content
              </>
            )}
          </button>
        </form>

        {/* Result Dashboard */}
        {result && (
          <div className="space-y-6">

            {/* Platform Tabs */}
            <div className="flex border-b border-zinc-800 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('linkedin')}
                className={`flex items-center gap-2 pb-3 px-4 border-b-2 font-medium text-sm transition cursor-pointer ${activeTab === 'linkedin' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
              >
                <Globe className="w-4 h-4" /> LinkedIn
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('twitter')}
                className={`flex items-center gap-2 pb-3 px-4 border-b-2 font-medium text-sm transition cursor-pointer ${activeTab === 'twitter' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
              >
                <MessageSquare className="w-4 h-4" /> Twitter Thread
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('instagram')}
                className={`flex items-center gap-2 pb-3 px-4 border-b-2 font-medium text-sm transition cursor-pointer ${activeTab === 'instagram' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
                  }`}
              >
                <Share2 className="w-4 h-4" /> Reel Script
              </button>
            </div>

            {/* Content Display Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative space-y-4">
              {activeTab === 'linkedin' && (
                <div>
                  <h3 className="font-semibold text-lg text-zinc-200 mb-2">{result.linkedin?.title}</h3>
                  <p className="whitespace-pre-wrap text-zinc-300 text-sm leading-relaxed">{result.linkedin?.content}</p>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.linkedin?.content || '')}
                    className="mt-4 flex items-center gap-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-2 rounded-lg transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied Post!' : 'Copy LinkedIn Post'}
                  </button>
                </div>
              )}

              {activeTab === 'twitter' && (
                <div className="space-y-3">
                  {result.twitter?.tweets?.map((tweet: string, idx: number) => (
                    <div key={idx} className="p-3 bg-zinc-950 border border-zinc-800/80 rounded-xl text-sm text-zinc-300">
                      {tweet}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.twitter?.tweets?.join('\n\n---\n\n') || '')}
                    className="mt-2 flex items-center gap-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-2 rounded-lg transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied Thread!' : 'Copy Entire Thread'}
                  </button>
                </div>
              )}

              {activeTab === 'instagram' && (
                <div className="space-y-4 text-sm">
                  <div className="p-3 bg-cyan-950/40 border border-cyan-900/50 rounded-xl text-cyan-300">
                    <strong>0-3s Hook:</strong> {typeof result.instagram?.hook === 'string' ? result.instagram.hook : JSON.stringify(result.instagram?.hook)}
                  </div>
                  <div>
                    <strong className="text-zinc-200 block mb-1">Reel Script:</strong>
                    <p className="whitespace-pre-wrap text-zinc-300 leading-relaxed">
                      {typeof result.instagram?.script === 'string' ? result.instagram.script : JSON.stringify(result.instagram?.script)}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-zinc-800">
                    <strong className="text-zinc-200 block mb-1">Caption:</strong>
                    <p className="text-zinc-400">
                      {typeof result.instagram?.caption === 'string' ? result.instagram.caption : JSON.stringify(result.instagram?.caption)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Dynamic Social Banner Preview */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-zinc-200 font-semibold text-sm">
                <ImageIcon className="w-4 h-4 text-cyan-400" /> Auto-Generated Social Banner Image
              </div>
              <div className="rounded-xl overflow-hidden border border-zinc-800">
                <img
                  src={`/api/og?text=${encodeURIComponent(result.bannerText || 'All-in-One AI Growth Engine')}`}
                  alt="Generated Social Banner"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}