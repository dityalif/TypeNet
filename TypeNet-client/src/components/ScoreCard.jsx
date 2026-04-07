import CommentCard from './CommentCard';
import { useState } from 'react';
import { addComment } from '../actions/Score.action';
import { useCookies } from 'react-cookie';

export default function ScoreCard({ score_id, username, score, text, comments, rank }) {
  const [commentText, setCommentText] = useState("");
  const [cookies] = useCookies(["user_id"]);

  const postComment = () => {
    addComment({
      text: commentText,
      post: score_id,
      author: cookies.user_id,
    })
    .then((response) => {
      if (response.data != null) {
        window.location.reload();
      } else {
        alert("Failed to post comment!");
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
  }

  const isTopThree = rank <= 3;

  return (
    <div className={`glass-panel p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isTopThree ? 'border-neonAccent/50 shadow-[0_0_20px_rgba(62,180,137,0.15)]' : 'border-slate-700/50'}`}>
      
      {/* Decorative rank background */}
      <div className="absolute -right-6 -top-6 text-[120px] font-bold text-slate-800/30 select-none z-0">
        #{rank}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-start justify-between border-b border-slate-700/50 pb-6 mb-6">
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-slate-900 font-bold shadow-lg">
              {username.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-slate-200">{username}</h2>
            {isTopThree && <i className="fas fa-crown text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.8)] ml-2"></i>}
          </div>
          
          <div className="mt-4">
             <p className="text-slate-400 italic">"{text || "No log provided."}"</p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-slate-900/80 px-6 py-4 rounded-xl border border-slate-700">
          <div className="text-center">
            <span className="block text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Score</span>
            <span className="text-3xl font-mono font-bold text-neonAccent drop-shadow-[0_0_8px_rgba(62,180,137,0.5)]">
               {score} <span className="text-sm text-slate-400 font-sans">WPM</span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <h4 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-wider">Communication Log</h4>
        
        <div className="flex flex-col gap-3 mb-6">
          {comments && comments.length > 0 ? comments.map((comment, index) => (
            <CommentCard
              key={index}
              username={comment.author.username}
              text={comment.text}
            />
          )) : (
            <p className="text-slate-500 text-sm">No communications yet.</p>
          )}
        </div>

        <div className="flex bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50 focus-within:border-cyan-400 transition-colors">
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="flex-1 bg-transparent px-4 py-2 text-sm text-slate-200 focus:outline-none" 
            value={commentText} 
            onChange={(e) => setCommentText(e.target.value)} 
          />
          <button 
            onClick={postComment} 
            className="bg-slate-700 hover:bg-cyan-500 hover:text-slate-900 text-slate-300 font-medium px-4 py-2 text-sm transition-colors"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
}
