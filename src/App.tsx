import React, { useState } from "react";
import { Result } from "./Risk/Result";
import { Input } from "./Risk/Input";
import { Display } from "./Risk/const";

function App() {
  const [display, setDisplay] = useState<Display>(Display.INPUT);
  const [armyCount, setArmyCount] = useState<number>(0);
  const [enemyCount, setEnemyCount] = useState<number>(0);

  return display === Display.INPUT ? (
    <Input
      armyCount={armyCount}
      setArmyCount={setArmyCount}
      enemyCount={enemyCount}
      setEnemyCount={setEnemyCount}
      setDisplay={setDisplay}
    />
  ) : (
    <Result
      armyCount={armyCount}
      enemyCount={enemyCount}
      setDisplay={setDisplay}
    />
  );
}

export default App;
