import Dashboard from "./Dashboard/Dashboard"
import Employee from "./Employee/Employee"


function Home() {
  return (
    <div className="p-10  items-center text-center bg-gray-300 ">
      <Employee/>
      <Dashboard/>
    </div>
  )
}

export default Home
