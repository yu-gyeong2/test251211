import React from "react";
import { GameProvider } from "./context/GameContext";
import { Header } from "./components/Header";
import { SidebarStatus } from "./components/SidebarStatus";
import { CardGrid } from "./components/CardGrid";
import { Controls } from "./components/Controls";
import { VictoryModal } from "./components/VictoryModal";

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <Header />
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 flex-shrink-0">
              <SidebarStatus />
            </aside>
            <main className="flex-1">
              <CardGrid />
            </main>
          </div>
          <div className="mt-6">
            <Controls />
          </div>
        </div>
        <VictoryModal />
      </div>
    </GameProvider>
  );
}

export default App;

