import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { createScorePost } from "../actions/Score.action";
import Navbar from '../components/Navbar';

const indonesianWords = [
  "aku", "kamu", "dia", "makan", "minum", "tidur", "lari", "jalan", "cepat", "lambat",
  "besar", "kecil", "tinggi", "rendah", "panjang", "pendek", "buku", "meja", "kursi", "pintu",
  "jendela", "rumah", "sekolah", "pasar", "kantor", "belajar", "bekerja", "bermain", "merah", "kuning",
  "hijau", "biru", "hitam", "putih", "hari", "malam", "pagi", "sore", "siang", "besok",
  "kemarin", "sekarang", "nanti", "kucing", "anjing", "burung", "ikan", "ayam", "sapi", "kambing",
  "air", "api", "tanah", "angin", "hujan", "panas", "dingin", "udara", "awan", "matahari",
  "bulan", "bintang", "gunung", "laut", "sungai", "danau", "pohon", "bunga", "daun", "batu",
  "baik", "buruk", "indah", "jelek", "sedih", "senang", "marah", "takut", "cinta", "benci",
  "satu", "dua", "tiga", "empat", "lima", "banyak", "sedikit", "semua", "tidak", "ya",
  "dan", "atau", "tetapi", "karena", "jika", "mungkin", "pasti", "selalu", "kadang", "jarang",
  "orang", "anak", "ayah", "ibu", "teman", "nama", "kata", "basa", "apa", "siapa",
  "kapan", "dimana", "kenapa", "bagaimana", "ini", "itu", "sini", "situ", "sana", "begitu",
  "sangat", "paling", "lebih", "kurang", "seperti", "sama", "beda", "baru", "lama", "tua"
];

function generateRandomQuote(wordCount) {
  const result = [];
  for (let i = 0; i < wordCount; i++) {
    result.push(indonesianWords[Math.floor(Math.random() * indonesianWords.length)]);
  }
  return result.join(" ");
}

export default function Game() {
  const inputRef = useRef(null);
  const guessRef = useRef(null);
  const scoreRef = useRef(null);

  const [quote, setQuote] = useState("");
  const [userInput, setUserInput] = useState("");
  const startTimeRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);

  const [disabled, setDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Reset Quote");
  const [cookies, setCookies] = useCookies(["score", "user_id"]);
  const [score, setScore] = useState(0);
  const [post, setPost] = useState(false);
  const [scoreText, setScoreText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
    setQuote(generateRandomQuote(15));

    if (!cookies.score) {
      setCookies("score", 0, { path: '/' });
      setScore(0);
    } else {
      setScore(Number(cookies.score));
    }
  }, []);

  useEffect(() => {
    if (scoreRef.current) {
      scoreRef.current.textContent = `Highscore: ${score} WPM`;
    }
  }, [score]);

  const handleInputChange = (e) => {
    if (disabled) return;
    const val = e.target.value;
    const lowerVal = val.toLowerCase();
    setUserInput(val);

    if (!isTyping && val.length > 0) {
      startTimeRef.current = Date.now();
      setIsTyping(true);
      guessRef.current.textContent = "Timer started! Focus...";
      guessRef.current.className = "text-cyan-400 font-mono text-sm";
    }

    if (lowerVal === "") {
      guessRef.current.textContent = "Start typing...";
      guessRef.current.className = "text-slate-400 font-mono text-sm";
      setIsTyping(false);
      startTimeRef.current = null;
    } else if (lowerVal === quote) {
      const endTime = Date.now();
      const durationMs = endTime - (startTimeRef.current || endTime);
      const timeInMin = durationMs > 0 ? durationMs / 60000 : 0.01;
      const wordCount = quote.length / 5;
      const wpm = Math.round(wordCount / timeInMin);

      guessRef.current.textContent = `Mission Accomplished: ${wpm} WPM!`;
      guessRef.current.className = "text-neonAccent font-bold font-mono text-lg animate-pulse";

      if (wpm > score) {
        setScore(wpm);
        setCookies("score", wpm, { path: '/' });
      }
      
      setButtonText("Replay");
      setDisabled(true);
      setIsTyping(false);
      setPost(true);
    } else if (quote.startsWith(lowerVal)) {
      guessRef.current.textContent = "Great pace. Keep going...";
      guessRef.current.className = "text-cyan-300 font-mono text-sm";
    } else {
      guessRef.current.textContent = `Typo detected at pos ${lowerVal.length}! Expected: '${quote[lowerVal.length - 1] || ""}'`;
      guessRef.current.className = "text-neonError font-mono text-md shadow-neonError drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]";
    }
  };

  const handleStartReplay = () => {
    setQuote(generateRandomQuote(20));
    setUserInput("");
    startTimeRef.current = null;
    setIsTyping(false);
    setDisabled(false);
    setButtonText("Reset Quote");
    setPost(false);

    if (guessRef.current) {
      guessRef.current.textContent = "Start typing...";
      guessRef.current.className = "text-slate-400 font-mono text-sm";
    }
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const postScore = () => {
    createScorePost({
      value: score,
      text: scoreText,
      owner: cookies.user_id,
    })
      .then((response) => {
        if (response.data != null) {
          alert("Score securely transmitted.");
          navigate("/post");
        } else {
          alert("Transmission failed!");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center -mt-20 p-4">
        <div className="glass-panel w-full max-w-3xl p-8 relative overflow-hidden">
          {/* Decorative neon flashes */}
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-neonAccent/10 rounded-full blur-3xl pointer-events-none"></div>

          <header className="flex justify-between items-center mb-6 relative z-10">
            <h1 className="text-xl font-bold bg-gradient-to-r from-slate-200 to-slate-400 bg-clip-text text-transparent">
              Terminal Sequence
            </h1>
            <p className="px-4 py-1.5 bg-slate-800/80 rounded-full text-neonAccent font-mono text-sm border border-slate-700/50 shadow-[0_0_10px_rgba(62,180,137,0.2)]" ref={scoreRef}>
              Highscore: 0 WPM
            </p>
          </header>

          <div className="mb-6 p-6 bg-[#0f172a]/90 rounded-xl border border-slate-700/50 shadow-inner relative z-10">
            <div className="flex justify-between items-end mb-3">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Target Sequence</span>
              <span className="text-xs text-slate-500 font-mono">{quote.length} chars</span>
            </div>
            <p className="font-mono text-xl md:text-2xl leading-relaxed text-slate-300 select-none tracking-wide">
              {quote}
            </p>
          </div>

          <div className="h-8 flex items-center justify-center mb-4 relative z-10">
            <p ref={guessRef} className="text-slate-400 font-mono text-sm transition-all duration-300">
              Start typing...
            </p>
          </div>

          <div className="flex flex-col gap-4 relative z-10">
            <input
              type="text"
              ref={inputRef}
              disabled={disabled}
              value={userInput}
              onChange={handleInputChange}
              placeholder="Inject sequence here..."
              autoComplete="off"
              className="w-full bg-[#0f172a]/60 font-mono text-lg text-slate-200 border-2 border-slate-700 rounded-xl px-6 py-4 focus:outline-none focus:border-neonAccent focus:bg-[#0f172a] focus:shadow-[0_0_20px_rgba(62,180,137,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            
            <button 
              onClick={handleStartReplay} 
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold py-4 px-6 rounded-xl border border-slate-600 transition-all active:scale-[0.98] uppercase tracking-wider text-sm flex justify-center items-center gap-2"
            >
              <i className="fas fa-sync-alt"></i> {buttonText}
            </button>
          </div>

          {post && (
            <div className="mt-8 pt-6 border-t border-slate-700/50 flex flex-col md:flex-row gap-4 relative z-10 animate-[fadeIn_0.5s_ease-out]">
              <input 
                type="text" 
                placeholder="Log a comment for the leaderboard..." 
                onChange={(e) => setScoreText(e.target.value)}
                className="flex-1 bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-400 transition-colors" 
              />
              <button 
                onClick={postScore} 
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition-transform active:scale-[0.98] uppercase tracking-wider text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] whitespace-nowrap"
              >
                Transmit Score <i className="fas fa-satellite-dish ml-2"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}