import React, {useEffect, useState} from "react";
import styled from "@emotion/styled";
import {Display} from "./const";
import diceOne from "../svg/dice-one.svg";
import diceTwo from "../svg/dice-two.svg";
import diceThree from "../svg/dice-three.svg";
import diceFour from "../svg/dice-four.svg";
import diceFive from "../svg/dice-five.svg";
import diceSix from "../svg/dice-six.svg";

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
`;

const TeamContainer = styled.div`
  width: 100%;
  height: calc(100vh - 150px);
  padding: 30px;
  border: 1px solid black;
  margin: 20px;
`;

const PersonContainer = styled.div`
  padding: 8px;
  margin: 2px;
  display: flex;
  column-gap: 10px;

  .name {
    width: 150px;
  }
`;

const DiceImg = styled.img`
  width: 50px;
  height: 50px;
  opacity: 0.7;

  @keyframes blink {
    0% {
      opacity: 0.7;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0.7;
    }
  }

  animation: blink 0.7s infinite;
`;

const DiceResultImg = styled.img`
  width: 50px;
  height: 50px;
`;

interface Props {
  armyCount: number;
  enemyCount: number;
  setDisplay: (display: Display) => void;
}

export const Result = ({ armyCount, enemyCount, setDisplay }: Props) => {
  return (
    <>
      <button onClick={() => setDisplay(Display.INPUT)}>Go back</button>
      <ResultContainer>
        <TeamContainer>
          <div>Army result {armyCount}</div>
          {Array.from({ length: armyCount }).map((_, i) => (
            <Person key={i} name={`Army ${i + 1}`} />
          ))}
        </TeamContainer>
        <TeamContainer>
          <div>Enemy result {enemyCount}</div>
          {Array.from({ length: enemyCount }).map((_, i) => (
            <Person key={i} name={`Enemy ${i + 1}`} />
          ))}
        </TeamContainer>
      </ResultContainer>
    </>
  );
};

const Person = ({ name }: { name: string }) => (
  <PersonContainer>
    <div className="name">{name}</div>
    <Item />
    <Item />
    <Item />
  </PersonContainer>
);

const Item = () => {
  const [randomNumber, setRandomNumber] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      console.log("timeout");
      setRandomNumber(generateRandomNumber);
    }, 5000);
  }, []);

  return randomNumber ? (
    <div>
      <DiceResultImg alt="" src={dices[randomNumber - 1]} />
    </div>
  ) : (
    <div>
      <DiceImg alt="" src={diceOne} />
    </div>
  );
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 6) + 1;
};

const dices = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix];
