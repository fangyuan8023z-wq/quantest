import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Fortune from "./pages/Fortune";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

import IDCardTest from "./pages/IDCardTest";
import Round2 from "./pages/Round2";
import ResultR2 from "./pages/ResultR2";
import Round3 from "./pages/Round3";
import ResultR3 from "./pages/ResultR3";
import SoftSpot from "./pages/SoftSpot";
import ScamGame from "./pages/ScamGame";
import Round4 from "./pages/Round4";
import ResultR4 from "./pages/ResultR4";
import Round5Quiz from "./pages/Round5Quiz";
import Round5Result from "./pages/Round5Result";
import Round6Quiz from "./pages/Round6Quiz";
import Round6Result from "./pages/Round6Result";
import FinalReport from "./pages/FinalReport";

function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5faf7" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/fortune" element={<Fortune />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/round2" element={<Round2 />} />
        <Route path="/result-r2" element={<ResultR2 />} />
        <Route path="/round3" element={<Round3 />} />
        <Route path="/result-r3" element={<ResultR3 />} />
        <Route path="/soft-spot" element={<SoftSpot />} />
        <Route path="/scam-game" element={<ScamGame />} />
        <Route path="/round4" element={<Round4 />} />
        <Route path="/result-r4" element={<ResultR4 />} />
        <Route path="/round5" element={<Round5Quiz />} />
        <Route path="/result-r5" element={<Round5Result />} />
        <Route path="/round6" element={<Round6Quiz />} />
        <Route path="/result-r6" element={<Round6Result />} />
        <Route path="/final-report" element={<FinalReport />} />
        <Route path="/idcard-test" element={<IDCardTest />} />
      </Routes>
    </div>
  );
}

export default App;
