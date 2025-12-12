import React, { createContext, useContext, useState, ReactNode } from "react";
import { GameState, Card } from "../game/types";
import {
  getInitialState,
  grantRandomResources,
  unlockCard,
  getCardStatus,
  cards,
} from "../game/gameLogic";

interface GameContextType {
  state: GameState;
  nextRound: () => void;
  handleUnlockCard: (card: Card) => void;
  resetGame: () => void;
  getCardStatus: (card: Card) => "locked" | "unlockable" | "unlocked";
  allCards: Card[];
  victory: boolean;
  setVictory: (value: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(getInitialState());
  const [victory, setVictory] = useState(false);

  const nextRound = () => {
    setState((prev) => ({
      ...prev,
      round: prev.round + 1,
      resources: grantRandomResources(prev.resources),
    }));
  };

  const handleUnlockCard = (card: Card) => {
    setState((prev) => {
      const newState = unlockCard(card, prev);
      
      if (card.effect.special === "instant_win") {
        setVictory(true);
      }
      
      return newState;
    });
  };

  const resetGame = () => {
    setState(getInitialState());
    setVictory(false);
  };

  const getCardStatusWrapper = (card: Card): "locked" | "unlockable" | "unlocked" => {
    return getCardStatus(card, state);
  };

  return (
    <GameContext.Provider
      value={{
        state,
        nextRound,
        handleUnlockCard,
        resetGame,
        getCardStatus: getCardStatusWrapper,
        allCards: cards,
        victory,
        setVictory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}

