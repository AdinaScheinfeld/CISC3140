import { Link } from "react-router-dom"

export default function CarsPage() {

  return (

    <div>
      <h1>Cars Page</h1>
      <nav>
        <Link to="/cars">Cars</Link> | {" "}
        <Link to="/owners">Owners</Link>
      </nav>
    </div>
  )
}