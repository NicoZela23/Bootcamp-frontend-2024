import { useState } from "react"
import availableSeat from '../assets/seat.png'
import reservedSeat from '../assets/seatReserved.png'
import './cinema.css'

type Seat = {
    id: number;
    asignedSeat: string;
    isReserved: boolean;
    seatStatusImage: string;
};

type SeatQuantity = {
    columns: number;
    rows: number;
};

function Cinema() {
    const [cinemaSeats, setCinemaSeats] = useState<Seat[]>([]);
    const [seatQuantity, setSeatQuantity] = useState<SeatQuantity>({ columns: 0, rows: 0 });

    const reserveSeat = (id: number) => {
        setCinemaSeats(
            cinemaSeats.map((seat) => {
                if (seat.id === id) {
                    return {
                        ...seat,
                        isReserved: true,
                        seatStatusImage: reservedSeat
                    };
                }
                return seat;
            })
        );
    };

    const generateSeats = () => {
        const newSeats = [];
        for (let row = 0; row < seatQuantity.rows; row++) {
            for (let col = 0; col < seatQuantity.columns; col++) {
                newSeats.push({
                    id: cinemaSeats.length + newSeats.length + 1,
                    asignedSeat: `${String.fromCharCode(65 + row)}${col}`,
                    isReserved: false,
                    seatStatusImage: availableSeat
                });
            }
        }
        setCinemaSeats([...cinemaSeats, ...newSeats]);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSeatQuantity({
            ...seatQuantity,
            [name]: parseInt(value, 10)
        });
    };

    return (
        <>
            <div>
                <label>
                    Columns:
                    <input type="number" name="columns" value={seatQuantity.columns} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Rows:
                    <input type="number" name="rows" value={seatQuantity.rows} onChange={handleInputChange} />
                </label>
                <br />
                <button onClick={generateSeats}>Generate Seats</button>
            </div>
            <div className="Cinema-container">
                {cinemaSeats.map((seat) => (
                    <div key={seat.id} className="seat" onClick={() => reserveSeat(seat.id)}>
                        <p>{seat.asignedSeat}</p>
                        <img src={seat.seatStatusImage} alt="chair image" />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Cinema;