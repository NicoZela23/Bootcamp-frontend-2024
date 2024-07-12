class Seat {
  #isAvailable;
  constructor() {
    this.#isAvailable = true;
  }

  reserve() {
    if (this.#isAvailable) {
      this.#isAvailable = false;
      return true;
    } else {
      return false;
    }
  }

  getStatus() {
    return this.#isAvailable ? "0" : "X";
  }
}

class Cinema {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.seats = [];

    this.generateCinema(columns, rows);
  }

  generateCinema(totalColumns, totalRows) {
    for (let row = 0; row < totalRows; row++) {
      this.seats[row] = [];
      for (let column = 0; column < totalColumns; column++) {
        this.seats[row][column] = new Seat();
      }
    }
  }

  reserveSeat(row, column) {
    if (this.isValidSeat(row, column)) {
      if (this.seats[row][column].reserve()) {
        console.log(
          `Seat ${String.fromCharCode(
            65 + row
          )}${column} reserved successfully.`
        );
      } else {
        console.log(
          `Seat ${String.fromCharCode(65 + row)}${column} is already reserved.`
        );
      }
    } else {
      console.log(
        `Seat ${String.fromCharCode(65 + row)}${column} does not exist.`
      );
    }
  }

  isValidSeat(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
  }

  showSeatStatus() {
    for (let row = 0; row < this.rows; row++) {
      let rowStatus = `${String.fromCharCode(65 + row)}: `;
      for (let column = 0; column < this.columns; column++) {
        const seatLabel = `${String.fromCharCode(65 + row)}${column}`;
        const seatStatus = this.seats[row][column].getStatus();
        rowStatus += `${seatLabel}: ${seatStatus}`;
        if (column < this.columns - 1) {
          rowStatus += " || ";
        }
      }
      console.log(rowStatus);
    }
  }
}

const cinema = new Cinema(3, 3);
cinema.reserveSeat(0, 1);
cinema.reserveSeat(1, 2);
cinema.reserveSeat(1, 2);
cinema.showSeatStatus();
