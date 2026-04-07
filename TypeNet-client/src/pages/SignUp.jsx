import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { signUpUser } from "../actions/User.actions";

export default function SignUp() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['isLoggedIn']);

  useEffect(() => {
    if (cookies.isLoggedIn) {
      navigate('/game');
    }
  }, [cookies.isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const change = e => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
  }

  const submitData = (event) => {
    event.preventDefault();
    
    signUpUser(formData)
    .then((response) => {
      if (response.data != null) {
        alert("Successfully registered account");
        navigate("/");
      } else {
        alert("Failed to register account!");
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 font-sans">
      <div className="glass-panel w-full max-w-md p-8 relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent relative z-10">
          Create Account
        </h2>
        
        <form onSubmit={submitData} className="flex flex-col gap-5 relative z-10">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
              <i className="fas fa-user"></i>
            </div>
            <input 
              name="username" 
              type="text" 
              onChange={change} 
              value={formData.username} 
              placeholder="Username" 
              className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-slate-500"
              required 
            />
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-400 transition-colors">
              <i className="fas fa-lock"></i>
            </div>
            <input 
              name="password" 
              type="password" 
              onChange={change} 
              value={formData.password} 
              placeholder="Password" 
              className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder-slate-500"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all active:scale-[0.98] shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            REGISTER
          </button>

          <div className="text-center mt-4 text-slate-400">
            Already have an account? <Link to="/login" className="text-cyan-400 hover:underline ml-1">Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
