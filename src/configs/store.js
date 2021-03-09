export const initial_state = {
      rovers: [
          { name: "Opportunity",  position: [1, 2], heading: "N", movements: "LMLMLMLMM" },
          { name: "Perseverance", position: [3, 3], heading: "E", movements: "MMRMMRMRRM" },
      ],
      active_rover: 0,
      ticking: false,
      tick: 0
};
