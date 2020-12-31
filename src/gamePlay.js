const Role = {
  O: 1,
  X: -1
};

class TacToe16 {
  constructor() {
    this.filds = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.winner = 0;
  }
  claim({ x, y }, playerRole) {
    if (this.filds[x][y] == 0) {
      this.filds[x][y] = playerRole;
      if (this.lookForWin({ x, y }, playerRole)) {
        this.winner = playerRole;
      }
      return true;
    }
    return false;
  }
  unclaim({ x, y }) {
    if (this.filds[x][y] != 0) {
      this.filds[x][y] = 0;
    }
  }
  lookForWin() {
    let sumdg1 =
      this.filds[0][0] + this.filds[1][1] + this.filds[2][2] + this.filds[3][3];
    if (sumdg1 == -4) {
      this.winner = -1;
      return true;
    } else if (sumdg1 == 4) {
      this.winner = 1;
      return true;
    }
    let sumdg2 =
      this.filds[0][3] + this.filds[1][2] + this.filds[2][1] + this.filds[3][0];
    if (sumdg2 == -4) {
      this.winner = -1;
      return true;
    } else if (sumdg2 == 4) {
      this.winner = 1;
      return true;
    }
    let sumrow = 0;
    let sumcol = 0;
    for (let i = 0; i < 4; i++) {
      sumrow =
        this.filds[i][0] +
        this.filds[i][1] +
        this.filds[i][2] +
        this.filds[i][3];
      if (sumrow == -4) {
        this.winner = -1;
        return true;
      } else if (sumrow == 4) {
        this.winner = 1;
        return true;
      }
      sumcol =
        this.filds[0][i] +
        this.filds[1][i] +
        this.filds[2][i] +
        this.filds[3][i];
      if (sumcol == -4) {
        this.winner = -1;
        return true;
      } else if (sumcol == 4) {
        this.winner = 1;
        return true;
      }
    }
    return false;
  }
  unclaimedFields() {
    let res = [];
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        if (this.filds[x][y] == 0) {
          res.push({ x, y });
        }
      }
    }
    return res;
  }
}
export { TacToe16, Role };
