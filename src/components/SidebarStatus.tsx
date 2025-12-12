import React from "react";
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

export function SidebarStatus() {
  const { state } = useGame();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
      <div>
        <h2 className="text-lg font-bold mb-3 text-gray-800">현재 상태</h2>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">기술점수</span>
            <span className="font-bold text-blue-600">{state.techScore}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">과학점수</span>
            <span className="font-bold text-green-600">{state.scienceScore}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">라운드</span>
            <span className="font-bold text-purple-600">{state.round}</span>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-md font-semibold mb-2 text-gray-800">자원</h3>
          <div className="space-y-2">
            {(Object.keys(state.resources) as ResourceType[]).map((resource) => (
              <div key={resource} className="flex justify-between items-center">
                <span className="text-gray-600">{resourceLabels[resource]}</span>
                <span className="font-semibold text-gray-800">
                  {state.resources[resource]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

