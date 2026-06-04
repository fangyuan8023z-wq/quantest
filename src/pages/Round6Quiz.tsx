import { round6Questions } from "../data/round6";
import GenericQuiz from "./GenericQuiz";

const Round6Quiz = () => {
  return (
    <GenericQuiz
      questions={round6Questions}
      title="第六轮 · 生活智慧"
      route="/result-r6"
    />
  );
};

export default Round6Quiz;
