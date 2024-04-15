import React from "react";
import { Display } from "./const";

interface Props {
  armyCount: number;
  setArmyCount: (count: number) => void;
  enemyCount: number;
  setEnemyCount: (count: number) => void;
  setDisplay: (display: Display) => void;
}

export const Input = ({
  armyCount,
  setArmyCount,
  enemyCount,
  setEnemyCount,
  setDisplay,
}: Props) => (
  <div>
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
  </div>
);
