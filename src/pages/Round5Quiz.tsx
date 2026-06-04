import { round5Questions } from "../data/round5";
import GenericQuiz from "./GenericQuiz";

const Round5Quiz = () => {
  return (
    <GenericQuiz
      questions={round5Questions}
      title="第五轮 · 创造力挑战"
      route="/result-r5"
    />
  );
};

export default Round5Quiz;
