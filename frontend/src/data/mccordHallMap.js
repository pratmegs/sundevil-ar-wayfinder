// TODO: Replace this placeholder configuration after McCord Hall field visit.
// These nodes, labels, room numbers, and sign mappings are development examples
// only. They must not be treated as verified McCord Hall room data.

export const graph = {
  entrance: ["lobby"],
  lobby: ["entrance", "hallway_1"],
  hallway_1: ["lobby", "hallway_2", "room_101", "room_102"],
  hallway_2: ["hallway_1", "room_103", "target_classroom"],
  room_101: ["hallway_1"],
  room_102: ["hallway_1"],
  room_103: ["hallway_2"],
  target_classroom: ["hallway_2"],
};

export const displayNames = {
  entrance: "Entrance (placeholder)",
  lobby: "Lobby (placeholder)",
  hallway_1: "Hallway 1 (placeholder)",
  hallway_2: "Hallway 2 (placeholder)",
  room_101: "Room 101 (placeholder)",
  room_102: "Room 102 (placeholder)",
  room_103: "Room 103 (placeholder)",
  target_classroom: "Target Classroom (placeholder)",
};

// TODO: Replace these placeholder examples with real McCord Hall plaque and
// sign text collected during field testing. Do not add QR codes, fake plaques,
// or manual location fallbacks.
export const textToNodeMap = {
  "101": "room_101",
  "102": "room_102",
  "103": "room_103",
  MCCORD: "entrance",
  LOBBY: "lobby",
};

export const navigationInstructions = {
  "entrance->lobby": "Go straight toward the lobby",
  "lobby->entrance": "Head back toward the entrance",
  "lobby->hallway_1": "Continue into the main hallway",
  "hallway_1->lobby": "Return toward the lobby",
  "hallway_1->hallway_2": "Go straight down the hallway",
  "hallway_2->hallway_1": "Continue back toward the first hallway",
  "hallway_1->room_101": "Room 101 is nearby",
  "room_101->hallway_1": "Move back into the main hallway",
  "hallway_1->room_102": "Room 102 is nearby",
  "room_102->hallway_1": "Move back into the main hallway",
  "hallway_2->room_103": "Room 103 is nearby",
  "room_103->hallway_2": "Move back into the second hallway",
  "hallway_2->target_classroom": "Your classroom is ahead",
  "target_classroom->hallway_2": "Move back into the second hallway",
  target_classroom: "You have arrived",
};

export const destinationList = [
  { id: "room_101", label: "Room 101 (placeholder)" },
  { id: "room_102", label: "Room 102 (placeholder)" },
  { id: "room_103", label: "Room 103 (placeholder)" },
  { id: "target_classroom", label: "Target Classroom (placeholder)" },
];
