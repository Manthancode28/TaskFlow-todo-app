
import "bootstrap/dist/css/bootstrap.min.css";
import "./TodoFeatures.css";

const TodoFeatures = () => {
  const features = [
    "Easy Task Management",
    "Add Tasks",
    "Delete Tasks",
    "Cross-Device Sync",
    "Minimal & Clean UI",
    "Task Simplification",
  ];
 

  return (
    <section className="feature-section container-fluid">

        <h1 className="fw-bold text-center feature-title">Enhance Your Productivity</h1>
         <p className="text-center feature-subtitle">
            My app helps you stay productive and organized with these amazing features.
         </p>

    <div className="container d-flex justify-content-center align-items-center vh-80">
      <div className="position-relative text-center feature-container">
        <div className="dotted-feature"><div className="feature-center">Todo Management App Features</div></div>
        
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
          <div className="line4"></div>
          <div className="line5"></div>
          <div className="line6"></div>
        
          {features.map((feature, index) => (
            
            <div key={index} className={`feature-circle feature-${index + 1}`}>
              {feature}
            </div>
        
          ))}
      
      </div>
    </div>
    </section>
  );
};

export default TodoFeatures;
