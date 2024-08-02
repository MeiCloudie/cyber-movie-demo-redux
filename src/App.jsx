import BookTickets from "./components/BookTickets"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="relative flex flex-col h-screen justify-between bg-[url('../public/bgmovie.jpg')] bg-no-repeat bg-cover">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-80"></div>

      {/* Content */}
      <BookTickets />
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}

export default App
