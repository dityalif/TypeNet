import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logoSBD.png';

export default function Navbar() {
    const [cookies, setCookies] = useCookies(["username", "isLoggedIn", "score"]);
    
    const handleLogout = () => {
        setCookies('score', 0, { path: '/' });
        setCookies('isLoggedIn', false, { path: '/' });
    };

    const navLinkClass = ({ isActive }) => 
      `px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
        isActive 
          ? "bg-neonAccent/20 text-neonAccent shadow-[0_0_10px_rgba(62,180,137,0.3)]" 
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`;

    return (
        <div className="sticky top-0 z-50 w-full mb-8">
            <div className="glass-panel mx-auto max-w-5xl mt-4 px-6 flex justify-between items-center h-20">
                <div className="flex items-center gap-8">
                    <span className="text-2xl font-bold bg-gradient-to-r from-neonAccent to-cyan-400 bg-clip-text text-transparent tracking-wide">
                        TypeNet
                    </span>
                    <nav className="flex gap-2">
                        <NavLink to="/game" className={navLinkClass}>Play</NavLink>
                        <NavLink to="/post" className={navLinkClass}>Scores</NavLink>
                    </nav>
                </div>
                <div className="flex items-center gap-6">
                    <span className="font-medium text-slate-300 border-r border-slate-700 pr-6">
                        {cookies.username}
                    </span>
                    <NavLink to="/" onClick={handleLogout} className="text-sm text-slate-400 hover:text-neonError transition-colors">
                        Logout
                    </NavLink>
                    <img src={logo} alt="Logo" className="w-16 drop-shadow-md hidden sm:block" />
                </div>
            </div>
        </div>
    );
}
