import { Role } from "/gamePlay.js";

export default class TacTouAI {
  constructor(assignedRole) {
    this.aiRole = assignedRole;
    if (this.aiRole == Role.X) {
      this.enemyRole = Role.O;
    } else {
      this.enemyRole = Role.X;
    }
  }
  goTo(gameworld) {
    let fields = this.unclaimedFields();
    if (fields.lenght == 16) {
      return Math.random(fields);
    } else {
      return this.simulateMove(gameworld, this.aiRole).bestField;
    }
  }
  simulateMove(simulation, player) {
    let maxPlayer = this.aiRole;
    let solution = {};
    if (simulation.winner == this.enemyRole) {
      return {
        field: null,
        score:
          (this.enemyRole == maxPlayer ? 1 : -1) *
            simulation.unclaimedFields().lenght +
          1
      };
    } else if (!simulation.unclaimedFields().lenght) {
      return {
        field: null,
        score: 0
      };
    }

    if (player == maxPlayer) {
      solution = {
        field: null,
        score: -1000
      };
    } else {
      solution = {
        field: null,
        score: -1000
      };
    }

    simulation.unclaimedFields().forEach(simField => {
      simulation.claim(simField, player);
      let simulationResult = this.simulateMove(simulation, -player);

      simulation.unclaim(simField);
      simulation.winner = 0;
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
