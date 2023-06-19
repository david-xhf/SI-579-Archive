// @todo did you notice the midterm styling isn't so great at the moment?
// you need to install React Bootstrap!
// - Use react bootstrap's installation instructions.
// - The instructions include adding CSS, you can add that to App.js.
import { Accordion } from "react-bootstrap";

const Problem1 = () => {
  // @todo, add a React Boostrap accordion that matches the wording in the
  // completed example online.
  // @tip - 99% of the code you need is somewhere in the React Boostrap docs.
  //   Pasting and changing a few words is all that should be needed here.
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Vanilla JavaScript</Accordion.Header>
        <Accordion.Body>☠️☠️☠️☠️☠️☠️☠️ BEWARE! ☠️☠️☠️☠️☠️☠️☠️</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>React</Accordion.Header>
        <Accordion.Body>💀💀💀💀💀💀💀 I GUESS BEWARE THIS TOO 💀💀💀💀💀💀💀</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
export default Problem1;
