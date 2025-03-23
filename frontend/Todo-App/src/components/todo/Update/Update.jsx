/* eslint-disable react/prop-types */

// export default function Update({display}){
//    const closeUpdate = () =>{
//       console.log("Yes")
//       display("none");
//       document.getElementById("main-content").classList.remove("change-main-content");
//       document.getElementById("update-content").style.display = "none";
//    }
//    return(
//       <>
//          <div className="update p-5">
//             <h2>Update Your Task</h2>
//             <input type="text" className="my-4 w-100 p-3 todo-update-inp"/>
//             <textarea name="" id="" className="w-100 p-3 todo-update-inp"></textarea>
//             <div>
//                <button className="btn btn-dark my-4">Update</button>
//                <button className="btn btn-danger my-4 mx-2" onClick={closeUpdate}>Close</button>
//             </div>
            
//          </div>
//       </>
//    )
// }
import  { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Update({ display, taskId }) {
   const [updatedTitle, setUpdatedTitle] = useState("");
   const [updatedBody, setUpdatedBody] = useState("");

   const closeUpdate = () => {
       display("none");
       document.getElementById("main-content").classList.remove("change-main-content");
       document.getElementById("update-content").style.display = "none";
   };

   const handleUpdate = async () => {
       if (!updatedTitle.trim() || !updatedBody.trim()) {
           toast.error("Please fill in all fields.");
           return;
       }

       try {
           const response = await axios.put(`http://localhost:3000/api/v2/updateTask/${taskId}`, {
               title: updatedTitle,
               body: updatedBody,
           });

           if (response.status === 200) {
               toast.success("Task updated successfully!");
                // Notify the parent component to refresh the task list
               closeUpdate(); // Close the update modal
           }
       } catch (error) {
           console.error("Error updating task:", error);
           toast.error("Failed to update task. Please try again.");
       }
   
   };

   return (
       <>
           <div className="update p-5">
               <h2>Update Your Task</h2>
               <input
                   type="text"
                   className="my-4 w-100 p-3 todo-update-inp"
                   placeholder="Update Title"
                   value={updatedTitle}
                   onChange={(e) => setUpdatedTitle(e.target.value)}
               />
               <textarea
                   className="w-100 p-3 todo-update-inp"
                   placeholder="Update Body"
                   value={updatedBody}
                   onChange={(e) => setUpdatedBody(e.target.value)}
               ></textarea>
               <div>
                   <button className="btn btn-dark my-4" onClick={handleUpdate}>
                       Update
                   </button>
                   <button className="btn btn-danger my-4 mx-2" onClick={closeUpdate}>
                       Close
                   </button>
               </div>
           </div>
       </>
   );
}
