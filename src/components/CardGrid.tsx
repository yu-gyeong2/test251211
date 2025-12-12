import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import { Card } from "../game/types";
import { CardItem } from "./CardItem";

type CategoryFilter = "all" | Card["category"];

const categoryLabels: Record<CategoryFilter, string> = {
  all: "전체",
  energy: "에너지",
  transport: "수송",
  communication: "통신",
  production: "생산",
  future: "미래",
};

export function CardGrid() {
  const { allCards, getCardStatus } = useGame();
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filteredCards =
    filter === "all"
      ? allCards
      : allCards.filter((card) => card.category === filter);

  const sortedCards = [...filteredCards].sort((a, b) => {
    const statusA = getCardStatus(a);
    const statusB = getCardStatus(b);
    
    const statusOrder = { unlocked: 0, unlockable: 1, locked: 2 };
    return statusOrder[statusA] - statusOrder[statusB];
  });

  return (
    <div className="flex-1">
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key as CategoryFilter)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === key
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

