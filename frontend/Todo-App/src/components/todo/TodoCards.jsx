/* eslint-disable react/prop-types */
import "./Todo.css";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

export default function TodoCards({title, body,id,delid,display,dueDate}){
   const passDelId = () =>{
      delid(id);
   }
   const passUpdateId = () =>{
      display(id);
   }


   return(
      <>
         <div className="todo-cards p-3">
            <div>
               <h5>{title}</h5>
               <p>{body.split("",77)}...</p>
               {/* Display Due Date */}
               {dueDate && (
                    <p className="due-date">
                        Due: {new Date(dueDate).toLocaleString()}
                    </p>
                )}
            </div>
            <div className="d-flex justify-content-around card-icons-head">
               <div className="card-icon1 px-2 py-1" onClick={passUpdateId}>
               <GrDocumentUpdate className="card-icons"/>&nbsp;Update
               </div>
               <div className="card-icon1 px-2 py-1 text-black" onClick={passDelId}>
               <MdDelete className="card-icons del" />&nbsp;Delete
               </div>
            </div>
         </div>
      </>
   )
}