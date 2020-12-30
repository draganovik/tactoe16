const Role = {
  O: 1,
  X: -1
};

class TacTou16 {
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
    let sumdg1 = Math.abs(
      this.filds[0][0] + this.filds[1][1] + this.filds[2][2] + this.filds[3][3]
    );
    let sumdg2 = Math.abs(
      this.filds[0][3] + this.filds[1][2] + this.filds[2][1] + this.filds[3][0]
    );
    let sumrow = 0;
    let sumcol = 0;
    for (let i = 0; i < 4; i++) {
      sumrow = Math.abs(
        this.filds[i][0] +
          this.filds[i][1] +
          this.filds[i][2] +
          this.filds[i][3]
      );
      sumcol = Math.abs(
        this.filds[0][i] +
          this.filds[1][i] +
          this.filds[2][i] +
          this.filds[3][i]
      );
      if (sumrow == 4 || sumcol == 4 || sumdg1 == 4 || sumdg2 == 4) {
        return true;
      }
    }
    return false;
  }
  unclaimedFields() {
    let res = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.filds[i][j] == 0) {
          res.push(this.filds[i][j]);
        }
      }
    }
    return res;
  }
}
export { TacTou16, Role };
