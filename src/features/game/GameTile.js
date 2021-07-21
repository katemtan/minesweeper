export default class GameTile {
    constructor(bomb = false, revealed = false, flagged= false) {
        this.bomb = bomb;
        this.revealed = false;
        this.flagged = false;
    }
}