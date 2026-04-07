import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import { getAllScores } from '../actions/Score.action';
import ScoreCard from '../components/ScoreCard';

export default function Post() {
    const [scores, setScores] = useState([]);

  useEffect(() => {
    getAllScores()
    .then((response) => {
        if (response.data != null) {
            setScores(response.data);
        } else {
            alert("Failed to fetch scores protocol!");
        }
    })
    .catch((error) => {
        console.error("Error fetching scores:", error.message);
    });
  }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 max-w-4xl w-full mx-auto px-4 pb-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-neonAccent to-cyan-400 bg-clip-text text-transparent uppercase tracking-widest inline-block relative border-b-2 border-cyan-400/30 pb-2">
                        Global Leaderboard
                    </h1>
                </div>

                <div className="flex flex-col gap-6">
                    {scores.map((score, index) => (
                        <ScoreCard
                            key={index}
                            score_id={score._id}
                            username={score.owner.username}
                            score={score.value}
                            text={score.text}
                            comments={score.comments}
                            rank={index + 1}
                        />
                    ))}
                    
                    {scores.length === 0 && (
                        <div className="text-center text-slate-500 py-12 glass-panel">
                            No records found in the database. Be the first to initiate a sequence.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}