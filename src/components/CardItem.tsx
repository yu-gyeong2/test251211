import React from "react";
import { Card } from "../game/types";
import { useGame } from "../context/GameContext";
import { ResourceType } from "../game/types";

const resourceLabels: Record<ResourceType, string> = {
  iron: "철",
  coal: "석탄",
  copper: "구리",
  wood: "나무",
  uranium: "우라늄",
  carbon_nanotube: "탄소나노튜브",
};

const categoryLabels: Record<Card["category"], string> = {
  energy: "에너지",
  transport: "수송",
  communication: "통신",
  production: "생산",
  future: "미래",
};

const categoryColors: Record<Card["category"], string> = {
  energy: "bg-yellow-100 border-yellow-300",
  transport: "bg-blue-100 border-blue-300",
  communication: "bg-green-100 border-green-300",
  production: "bg-orange-100 border-orange-300",
  future: "bg-purple-100 border-purple-300",
};

export function CardItem({ card }: { card: Card }) {
  const { getCardStatus, handleUnlockCard } = useGame();
  const status = getCardStatus(card);

  const handleClick = () => {
    if (status === "unlockable") {
      handleUnlockCard(card);
    }
  };

  const baseClasses = "p-4 rounded-lg border-2 transition-all cursor-pointer";
  
  let statusClasses = "";
  if (status === "locked") {
    statusClasses = "bg-gray-200 border-gray-400 opacity-60 cursor-not-allowed";
  } else if (status === "unlockable") {
    statusClasses = "bg-blue-200 border-blue-500 hover:bg-blue-300 hover:shadow-lg transform hover:scale-105";
  } else {
    statusClasses = "bg-green-200 border-green-500";
  }

  return (
    <div
      className={`${baseClasses} ${categoryColors[card.category]} ${statusClasses}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-gray-800">{card.name}</h3>
        <span className="text-xs px-2 py-1 bg-white rounded text-gray-600">
          {categoryLabels[card.category]}
        </span>
      </div>
      
      <p className="text-sm text-gray-700 mb-3">{card.description}</p>

      {status === "unlocked" && (
        <div className="text-center py-2 bg-green-500 text-white rounded font-semibold mb-2">
          획득함
        </div>
      )}

      {status === "unlockable" && (
        <div className="text-center py-2 bg-blue-500 text-white rounded font-semibold mb-2">
          해금 가능
        </div>
      )}

      <div className="space-y-1 text-sm">
        {card.requirements.minTech !== undefined && (
          <div className="text-gray-600">
            필요 기술점수: <span className="font-semibold">{card.requirements.minTech}</span>
          </div>
        )}
        {card.requirements.minScience !== undefined && (
          <div className="text-gray-600">
            필요 과학점수: <span className="font-semibold">{card.requirements.minScience}</span>
          </div>
        )}
        
        <div className="mt-2 pt-2 border-t border-gray-300">
          <div className="font-semibold text-gray-700 mb-1">필요 자원:</div>
          {Object.entries(card.cost).map(([resource, amount]) => (
            <div key={resource} className="text-gray-600">
              {resourceLabels[resource as ResourceType]}: {amount}
            </div>
          ))}
        </div>

        {(card.effect.techDelta || card.effect.scienceDelta) && (
          <div className="mt-2 pt-2 border-t border-gray-300">
            <div className="font-semibold text-gray-700 mb-1">효과:</div>
            {card.effect.techDelta && (
              <div className="text-blue-600">기술점수 +{card.effect.techDelta}</div>
            )}
            {card.effect.scienceDelta && (
              <div className="text-green-600">과학점수 +{card.effect.scienceDelta}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

