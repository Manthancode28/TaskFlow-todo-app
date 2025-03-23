
// import "./feature.css";

// export default function Feature(){
//    return(
//       <>
//          <div>
//             <h1 className="fw-bold">Feature</h1>
//             <p>Feature is a feature</p>
//             <div className="row">
//                <div className="col-md-6 d-flex w-100 align-items-center feature-content">
//                   <div className="col-md-6 text-center">
//                      <img src="https://png.pngtree.com/png-clipart/20240903/original/pngtree-efficient-task-management-the-checklist-approach-png-image_15918016.png" alt="To-Do Checklist" className="img-fluid checklist-img" />
//                   </div>
//                   <div>
//                      <ul>
//                         <li></li>
//                         <li></li>
//                         <li></li>
//                         <li></li>
//                         <li></li>
//                      </ul>
//                   </div>
//                </div>
//             </div>
            
//          </div>
//       </>
//    )
// }


import "./feature.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Feature() {
   return (
      <section className="feature-section container-fluid">
         <h1 className="fw-bold text-center feature-title">Let’s Walk Through the Steps</h1>
         <p className="text-center feature-subtitle">
            My app helps you stay productive and organized with these amazing features.
         </p>

         <div className="row align-items-center feature-row">
            {/* Left Side - Image */}
            <div className="col-md-6 text-center feature-img-container">
               <img src="https://png.pngtree.com/png-clipart/20240903/original/pngtree-efficient-task-management-the-checklist-approach-png-image_15918016.png"
                    alt="To-Do Checklist"
                    className="img-fluid feature-img" />
            </div>

            {/* Right Side - Features List */}
            <div className="col-md-6 feature-content ">
               <p> 
                  <CheckCircleIcon style={{ color: "#008D2C", fontSize: "30px" }}/>&nbsp;
                  Register or Log In – Create a new account or log in to access your tasks.
               </p>
               <p> 
                  <CheckCircleIcon style={{ color: "#008D2C", fontSize: "30px" }}/>&nbsp;
                  Create Your First Task – Click on “Add Task” and enter your task details.
               </p>
               <p> 
                  <CheckCircleIcon style={{ color: "#008D2C", fontSize: "30px" }}/>&nbsp;
                  Edit Tasks Anytime – Modify task details if there are any changes.
               </p>
               <p>
                  <CheckCircleIcon style={{ color: "#008D2C", fontSize: "30px" }}/>&nbsp;
                  Delete Unwanted Tasks – Remove completed or unnecessary tasks
               </p>
               <p>
                  <CheckCircleIcon style={{ color: "#008D2C", fontSize: "30px" }}/>&nbsp;   
                  Filter & Sort Tasks – Easily organize tasks by due date, priority, or category.
               </p>
            </div>
         </div>
      </section>
   );
}


