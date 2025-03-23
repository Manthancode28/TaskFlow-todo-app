// import "./Home.css";
// export default function Home(){
//    return (
//       <>
//          <div className="home">
//             <div className="container home-content">
//               <h1>Oraginze your <br /> work and daily life</h1>
//               <p>Become focused, oraginze and calm with todo app.</p>
//               <button type="button" className="btn btn-outline todo-btn">Make Todo List</button>
//             </div>     
//          </div>
//       </>
//    )
// }

import "./Home.css";
import checklistImg from "../../assets/TodoHome.png"; // Ensure the image is placed in the public folder or src
import Feature from "./Feature";
import Footer from "../footer/Footer"
import TodoFeatures from "./TodoFeatures";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleMakeTodoList = () => {
    navigate("/todo"); // Navigate to the Todo page
  };

  return (
    <>
    <div className="container-fluid home-section d-flex align-items-center justify-content-center flex-column">
      <div className="row">
        {/* Left Section - Text Content */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-start text-left home-text">
          <h1 className="fw-bold">
            Organize your <br /> work and daily life
          </h1>
          <p className="lead">
            Become focused, organized, and calm with the To-Do App.Boost your productivity and stay on top of your tasks with our simple and intuitive To-Do App.
          </p>
          <button className="btn todo-btn btn-success px-4 py-2 fw-bold" onClick={handleMakeTodoList}>
            Make To-Do List
          </button>
        </div>

        {/* Right Section - Image */}
        <div className="col-md-6 text-center">
          <img src={checklistImg} alt="To-Do Checklist" className="img-fluid checklist-img" />
        </div>
      </div>

    </div>
    {/* Feature */}
    <div className="row mt-5">
        <div className="col-md-12 text-center">
          <Feature/>
        </div>
    </div>
    
    <div className="row mt-5">
        <div className="col-md-12 text-center">
          <TodoFeatures/>
        </div>
    </div>

      <Footer></Footer>
    </>
  );
}
