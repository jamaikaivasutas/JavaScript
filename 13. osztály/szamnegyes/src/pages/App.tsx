import { useState } from "react";
import "../App.css";
import { Button, Col, Container, Row } from "react-bootstrap";

function App() {
  const [count, setCount] = useState(0);
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [thirdNumber, setThirdNumber] = useState(0);
  const [fourthNumber, setFourthNumber] = useState(0);
  const [fifthNumber, setFifthNumber] = useState(0);
  const [sixthNumber, setSixthNumber] = useState(0);
  const [seventhNumber, setSeventhNumber] = useState(0);
  const [eighthNumber, setEighthNumber] = useState(0);
  const [ninthNumber, setNinthNumber] = useState(0);
  const [firstCounter, setFirstCounter] = useState(0);
  const [secondCounter, setSecondCounter] = useState(0);
  const [thirdCounter, setThirdCounter] = useState(0);
  const [fourthCounter, setFourthCounter] = useState(0);

  return (
    <>
      <Button
        id="button1"
        onClick={() => {
          setFirstNumber(firstNumber + 1);
          setSecondNumber(secondNumber + 1);
          setFifthNumber(fifthNumber + 1);
          setFourthNumber(fourthNumber + 1);
          setFirstCounter(firstCounter + 1);
        }}
      >
        A
      </Button>
      <Button
        onClick={() => {
          setSecondNumber(secondNumber + 1);
          setThirdNumber(thirdNumber + 1);
          setFifthNumber(fifthNumber + 1);
          setSixthNumber(sixthNumber + 1);
          setSecondCounter(secondCounter + 1);
        }}
      >
        B
      </Button>
      <Container className="border">
        <Row>
          <Col className="border">{firstNumber}</Col>
          <Col className="border">{secondNumber}</Col>
          <Col className="border">{thirdNumber}</Col>
        </Row>
        <Row>
          <Col className="border">{fourthNumber}</Col>
          <Col className="border">{fifthNumber}</Col>
          <Col className="border">{sixthNumber}</Col>
        </Row>
        <Row>
          <Col className="border">{seventhNumber}</Col>
          <Col className="border">{eighthNumber}</Col>
          <Col className="border">{ninthNumber}</Col>
        </Row>
      </Container>
      <Button
        id="button2"
        onClick={() => {
          setFourthNumber(fourthNumber + 1);
          setFifthNumber(fifthNumber + 1);
          setSeventhNumber(seventhNumber + 1);
          setEighthNumber(eighthNumber + 1);
          setThirdCounter(thirdCounter + 1);
        }}
      >
        C
      </Button>
      <Button
        onClick={() => {
          setFifthNumber(fifthNumber + 1);
          setSixthNumber(sixthNumber + 1);
          setEighthNumber(eighthNumber + 1);
          setNinthNumber(ninthNumber + 1);
          setFourthCounter(fourthCounter + 1);
        }}
      >
        D
      </Button>

      <Button
        className="d-flex m-5"
        onClick={() => {
          setFirstNumber(0);
          setSecondNumber(0);
          setThirdNumber(0);
          setFourthNumber(0);
          setFifthNumber(0);
          setSixthNumber(0);
          setSeventhNumber(0);
          setEighthNumber(0);
          setNinthNumber(0);
          setFirstCounter(0);
          setSecondCounter(0);
          setThirdCounter(0);
          setFourthCounter(0);
        }}
      >
        Nullazas
      </Button>

      <div>
        [{firstCounter}, {secondCounter}, {thirdCounter}, {fourthCounter}]
      </div>
    </>
  );
}

export default App;
