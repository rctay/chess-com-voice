'use strict';

class Game {
  constructor(id, whiteUsername, blackUsername) {
    this._id = id;
    this._whiteUsername = whiteUsername;
    this._blackUsername = blackUsername;
    this._ended = false;
    this._moves = [];
    this._openings = new Set();
    this._markUpdated();
  }

  get whiteUsername() {
    return this._whiteUsername;
  }

  get whiteUsername() {
    return this._blackUsername;
  }

  get currentPlayerUsername() {
    return [this._whiteUsername, this._blackUsername][this._moves.length % 2];
  }

  get currentPlayerColor() {
    return ['white', 'black'][this._moves.length % 2];
  }

  get id() {
    return this._id;
  }

  get ended() {
    return this._ended;
  }

  get moves() {
    return this._moves;
  }

  get idle() {
    if (this.ended) {
      return 0;
    }
    const now = Date.now();
    return now - this._updateTimestamp;
  }


  colorOfUsername(username) {
    if (username === this._whiteUsername) {
      return 'white';
    } else if (username === this._blackUsername) {
      return 'black';
    }
  }

  hasOpening(openingName) {
    return this._openings.has(openingName);
  }

  _markUpdated() {
    this._updateTimestamp = Date.now();
  }

  addOpening(openingName) {
    this._openings.add(openingName);
    this._markUpdated();
  }

  end() {
    if (!this._ended) {
      this._ended = true;
      this._markUpdated();
    }
  }

  pushMove(san) {
    this._moves.push(san);
    this._markUpdated();
  }
};

export { Game };
