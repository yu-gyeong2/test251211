import React from "react";
import { useGame } from "../context/GameContext";

export function VictoryModal() {
  const { victory, setVictory } = useGame();

  if (!victory) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-purple-600 mb-4">
            우주여행 시대 도래!
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            축하합니다! 인류의 우주 진출을 완성했습니다.
          </p>
          <button
            onClick={() => setVictory(false)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

