import Home from "./Home";
import Navbar from "./Navbar";
import Create from "./Create";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />} />
            {/* not found psl visada turi būti paskutinis kaip variantas, kitaip visad bus 404 */}
            {/* bet veikia ir jei kitoj vietoj yra padėtas.. */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
