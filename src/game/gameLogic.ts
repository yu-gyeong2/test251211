import { Card, GameState, ResourceType } from "./types";
import { cards } from "./cards";

export function getInitialState(): GameState {
  return {
    techScore: 0,
    scienceScore: 0,
    resources: {
      iron: 1,
      coal: 1,
      copper: 0,
      wood: 0,
      uranium: 0,
      carbon_nanotube: 0,
    },
    round: 1,
    unlockedCards: [],
  };
}

export function grantRandomResources(resources: Record<ResourceType, number>): Record<ResourceType, number> {
  const resourceTypes: ResourceType[] = [
    "iron",
    "coal",
    "copper",
    "wood",
    "uranium",
    "carbon_nanotube",
  ];
  
  const newResources = { ...resources };
  
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * resourceTypes.length);
    const resourceType = resourceTypes[randomIndex];
    newResources[resourceType] = (newResources[resourceType] || 0) + 1;
  }
  
  return newResources;
}

export function canUnlockCard(
  card: Card,
  state: GameState
): boolean {
  const { requirements, cost } = card;
  
  if (requirements.minTech !== undefined && state.techScore < requirements.minTech) {
    return false;
  }
  
  if (requirements.minScience !== undefined && state.scienceScore < requirements.minScience) {
    return false;
  }
  
  if (requirements.prerequisiteCards) {
    const hasAllPrerequisites = requirements.prerequisiteCards.every(
      (prereqId) => state.unlockedCards.includes(prereqId)
    );
    if (!hasAllPrerequisites) {
      return false;
    }
  }
  
  for (const [resourceType, amount] of Object.entries(cost)) {
    if (state.resources[resourceType as ResourceType] < (amount || 0)) {
      return false;
    }
  }
  
  return true;
}

export function unlockCard(
  card: Card,
  state: GameState
): GameState {
  if (!canUnlockCard(card, state)) {
    return state;
  }
  
  const newResources = { ...state.resources };
  for (const [resourceType, amount] of Object.entries(card.cost)) {
    newResources[resourceType as ResourceType] -= amount || 0;
  }
  
  const newState: GameState = {
    ...state,
    resources: newResources,
    techScore: state.techScore + (card.effect.techDelta || 0),
    scienceScore: state.scienceScore + (card.effect.scienceDelta || 0),
    unlockedCards: [...state.unlockedCards, card.id],
  };
  
  return newState;
}

export function getCardStatus(
  card: Card,
  state: GameState
): "locked" | "unlockable" | "unlocked" {
  if (state.unlockedCards.includes(card.id)) {
    return "unlocked";
  }
  
  if (canUnlockCard(card, state)) {
    return "unlockable";
  }
  
  return "locked";
}

export function getCardById(id: string): Card | undefined {
  return cards.find((card) => card.id === id);
}

