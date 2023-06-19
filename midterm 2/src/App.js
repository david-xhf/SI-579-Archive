import './App.css';
import Problem1 from "./components/problems/Problem1";
import Problem2 from "./components/problems/Problem2";
import Problem3 from "./components/problems/Problem3";
import Problem4 from "./components/problems/Problem4";
import Problem5 from "./components/problems/Problem5";
import ProblemWrapper from "./components/problems/ProblemWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <ProblemWrapper name='Problem 1'><Problem1 /></ProblemWrapper>
      <ProblemWrapper name='Problem 2'><Problem2 /></ProblemWrapper>
      <ProblemWrapper name='Problem 3'><Problem3 /></ProblemWrapper>
      <ProblemWrapper name='Problem 4'><Problem4 /></ProblemWrapper>
      <ProblemWrapper name='Problem 5'><Problem5 /></ProblemWrapper>
    </>
  );
}

export default App;
