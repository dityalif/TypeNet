export default function CommentCard({ username, text }) {
  return (
    <div className="bg-[#0b1120] rounded-lg p-3 border border-slate-800 flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mt-1 flex-shrink-0">
          <i className="fas fa-user text-slate-500 text-xs"></i>
      </div>
      <div>
        <h3 className="font-bold text-sm text-cyan-400">{username}</h3>
        <p className="text-sm text-slate-300 mt-1">{text}</p>
      </div>
    </div>
  );
}
