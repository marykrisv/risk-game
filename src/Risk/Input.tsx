import React from "react";
import { Display } from "./const";
import styled from "@emotion/styled";

interface Props {
  armyCount: number;
  setArmyCount: (count: number) => void;
  enemyCount: number;
  setEnemyCount: (count: number) => void;
  setDisplay: (display: Display) => void;
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;
  background: #81ecec;

  input {
    height: 45px;
    width: 250px;
    font-size: 20px;
    text-align: center;
  }

  button {
    height: 45px;
    width: 250px;
    background: #0984e3;
    font-size: 20px;
    color: white;

    &:disabled {
      background: gray;
    }
  }
`;

export const Input = ({
  armyCount,
  setArmyCount,
  enemyCount,
  setEnemyCount,
  setDisplay,
}: Props) => (
  <Container>
    <input
      placeholder="Army count"
      type="number"
      min={0}
      onChange={(e) => setArmyCount(Number(e.target.value))}
    />
    <input
      placeholder="Enemy count"
      type="number"
      min={0}
      onChange={(e) => setEnemyCount(Number(e.target.value))}
    />
    <button
      disabled={!armyCount || !enemyCount}
      onClick={() => setDisplay(Display.RESULT)}
    >
      GO
    </button>
  </Container>
);
