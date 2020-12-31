class GameAI {
  constructor(assignedRole) {
    this.aiRole = assignedRole;
    this.enemyRole = -assignedRole;
  }
  goTo(gameworld) {
    let fields = gameworld.unclaimedFields();
    if (fields.length != 0) {
      return fields[Math.floor(Math.random() * fields.length)];
    } else {
      let r = this.simulateMove(gameworld, this.aiRole);
      return r.field;
    }
  }
  simulateMove(simulation, player) {
    let maxPlayer = this.aiRole;
    let solution = {};

    simulation.lookForWin();
    if (simulation.winner == -player) {
      return {
        field: 0,
        score:
          (-player == maxPlayer ? 1 : -1) *
          (simulation.unclaimedFields().length + 1)
      };
    } else if (!simulation.unclaimedFields().length) {
      return {
        field: 0,
        score: 0
      };
    }

    if (player == maxPlayer) {
      solution = {
        field: 0,
        score: -10000
      };
    } else {
      solution = {
        field: 0,
        score: 10000
      };
    }
    simulation.unclaimedFields().forEach(simField => {
      //console.log(simField);
      simulation.claim(simField, player);
      let simulationResult = this.simulateMove(simulation, -player);

      simulation.unclaim(simField);
      simulation.winner = 0;
      simulation.lookForWin();
      simulationResult.field = simField;

      if (player == maxPlayer) {
        if (simulationResult.score > solution.score) {
          solution = simulationResult;
        }
        if (simulationResult.score < solution.score) {
          solution = simulationResult;
        }
      }
    });
    return solution;
  }
}
export { GameAI };
