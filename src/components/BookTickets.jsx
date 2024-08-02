import { useDispatch, useSelector } from "react-redux"
import {
  toggleSeatSelection,
  cancelSeat,
} from "../redux/slices/bookTicketsSlice"

const BookTickets = () => {
  const dispatch = useDispatch()
  const { seatList, selectedSeats } = useSelector(
    (state) => state.bookTicketsSlice
  )

  // Tính tổng giá tiền của các ghế đã chọn
  const total = selectedSeats.reduce((sum, seat) => sum + seat.gia, 0)

  return (
    <div className="container mx-auto my-6">
      {/* Title */}
      <h1 className="text-yellow-500 font-bold text-6xl text-center my-6">
        BOOK MOVIE TICKETS
      </h1>

      {/* Main Screen */}
      <div className="flex justify-around">
        {/* Book Tickets Screen */}
        <div className="my-2">
          {/* Screen */}
          <div className="text-xl font-bold bg-white px-96 py-2 rounded-md">
            Screen
          </div>

          {/* Column numbers */}
          <div className="flex justify-center items-center">
            <div className="w-10 h-10 m-2"></div>{" "}
            {/* Placeholder for row letters */}
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="w-10 h-10 m-2 flex justify-center items-center text-white"
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Seats */}
          <div className="flex flex-col justify-center items-center">
            {seatList.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {/* Row letters */}
                <div className="w-10 h-10 m-2 flex justify-center items-center text-white">
                  {row.hang}
                </div>
                {/* Seat buttons */}
                {row.danhSachGhe.map((seat) => (
                  <button
                    key={seat.soGhe}
                    onClick={() =>
                      dispatch(
                        toggleSeatSelection({
                          soGhe: seat.soGhe,
                          hang: row.hang,
                        })
                      )
                    }
                    className={`w-10 h-10 m-2 font-bold rounded-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                      seat.isSelected
                        ? "bg-green-400"
                        : seat.daDat
                        ? "bg-orange-400"
                        : "bg-white border-yellow-500 border-2 text-black hover:bg-yellow-200"
                    }`}
                  >
                    {seat.soGhe}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* List of selected seats */}
        <div>
          <h3 className="text-white text-3xl font-bold text-center mb-4">
            SELECTED SEATS LIST
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="bg-orange-400 p-4 rounded-md"></div>
              <p className="text-white text-xl">Seats booked</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-green-400 p-4 rounded-md"></div>
              <p className="text-white text-xl">Seats selected</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-400 p-4 rounded-md"></div>
              <p className="text-white text-xl">Seats available</p>
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto overflow-y-auto max-h-96 relative shadow-md sm:rounded-lg my-4">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Seats
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Cancel
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedSeats.map((seat) => (
                  <tr className="bg-white border-b" key={seat.soGhe}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {seat.soGhe}
                    </th>
                    <td className="py-4 px-6">{seat.gia}</td>
                    <td className="py-4 px-6">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(cancelSeat({ soGhe: seat.soGhe }))
                        }
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
                {/* Total */}
                <tr className="bg-gray-100">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    Total
                  </th>
                  <td className="py-4 px-6 font-semibold">{total}</td>
                  <td className="py-4 px-6"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookTickets
