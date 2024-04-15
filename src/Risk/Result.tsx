import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Display } from "./const";
import uniq from "lodash.uniq";
// @ts-ignore
import diceOne from "../svg/dice-one.svg";
// @ts-ignore
import diceTwo from "../svg/dice-two.svg";
// @ts-ignore
import diceThree from "../svg/dice-three.svg";
// @ts-ignore
import diceFour from "../svg/dice-four.svg";
// @ts-ignore
import diceFive from "../svg/dice-five.svg";
// @ts-ignore
import diceSix from "../svg/dice-six.svg";

enum Team {
  ARMY,
  ENEMY,
}

const Container = styled.div`
  background: #81ecec;
  display: flex;
  flex-direction: column;

  button {
    height: 45px;
    width: 250px;
    background: #0984e3;
    font-size: 20px;
    color: white;
    margin-top: 20px;
    align-self: center;
  }
`;

const ResultContainer = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 10px;
`;

const TeamContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 30px;
  margin: 20px;
  background: white;
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
  const [armyMaxes, setArmyMaxes] = useState<{
    first: number;
    second: number;
  }>();
  const [enemyMaxes, setEnemyMaxes] = useState<{
    first: number;
    second: number;
  }>();

  const generatedNumbers = generateAllRandom({ armyCount, enemyCount });

  useEffect(() => {
    setTimeout(() => {
      setArmyMaxes(
        getMax(
          uniq(
            Object.keys(generatedNumbers[Team.ARMY]).flatMap(
              (key) => generatedNumbers[Team.ARMY][key],
            ),
          ),
        ),
      );
      setEnemyMaxes(
        getMax(
          uniq(
            Object.keys(generatedNumbers[Team.ENEMY]).flatMap(
              (key) => generatedNumbers[Team.ENEMY][key],
            ),
          ),
        ),
      );
    }, 9000);
  }, [generatedNumbers]);

  return (
    <Container>
      <button onClick={() => setDisplay(Display.INPUT)}>Go back</button>
      <ResultContainer>
        <TeamContainer>
          <div>Army result {armyCount}</div>
          {armyMaxes && (
            <div>
              Numbers {armyMaxes.first} {armyMaxes.second}
            </div>
          )}
          {Object.keys(generatedNumbers[Team.ARMY]).map((key, i) => (
            <Person
              key={i}
              name={`Army ${i + 1}`}
              results={generatedNumbers[Team.ARMY][key]}
            />
          ))}
        </TeamContainer>
        <TeamContainer>
          <div>Enemy result {enemyCount}</div>
          {enemyMaxes && (
            <div>
              Numbers {enemyMaxes.first} {enemyMaxes.second}
            </div>
          )}
          {Object.keys(generatedNumbers[Team.ENEMY]).map((key, i) => (
            <Person
              key={i}
              name={`Enemy ${i + 1}`}
              results={generatedNumbers[Team.ENEMY][key]}
            />
          ))}
        </TeamContainer>
      </ResultContainer>
    </Container>
  );
};

const Person = ({ name, results }: { name: string; results: number[] }) => (
  <PersonContainer>
    <div className="name">{name}</div>
    {results.map((result, i) => (
      <Item delay={i * 3000} result={result} />
    ))}
  </PersonContainer>
);

const Item = ({ delay, result }: { delay: number; result: number }) => {
  const [randomNumber, setRandomNumber] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setRandomNumber(result);
    }, delay);
  }, [delay]);

  return randomNumber ? (
    <div>
      <DiceResultImg alt="" src={dices[randomNumber - 1]} />
    </div>
  ) : (
    <div />
  );
};

function generateRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function getMax(results: number[]) {
  const firstMax = Math.max(...results);
  const secondMax = Math.max(...results.filter((num) => num !== firstMax));

  return {
    first: firstMax,
    second: secondMax,
  };
}

function generateAllRandom({
  armyCount,
  enemyCount,
}: {
  armyCount: number;
  enemyCount: number;
}): Record<Team, Record<string, number[]>> {
  return {
    [Team.ARMY]: Array.from({
      length: armyCount,
    }).reduce<Record<number, number[]>>((a, _, i) => {
      return {
        ...a,
        [`army-${i + 1}`]: [
          generateRandomNumber(),
          generateRandomNumber(),
          generateRandomNumber(),
        ],
      };
    }, {}),
    [Team.ENEMY]: Array.from({
      length: enemyCount,
    }).reduce<Record<number, number[]>>((a, _, i) => {
      return {
        ...a,
        [`enemy-${i + 1}`]: [
          generateRandomNumber(),
          generateRandomNumber(),
          generateRandomNumber(),
        ],
      };
    }, {}),
  };
}

const dices = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix];
