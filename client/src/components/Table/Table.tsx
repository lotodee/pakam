import React, {useState ,useEffect} from 'react'
import './Table.scss'
import {Link} from "react-router-dom"
import { deleteAssessment, getAssessment } from '../../hooks/assesment'
import { useAuthContext } from '../../hooks/useAuthContext'
const Table:React.FC = () => {
  const { user } = useAuthContext();
  const [assessments, setAssessments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState(null);
  const [showDeleteImage, setShowDeleteImage] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAssessment(user);
        
      setAssessments(res.assessments);
      console.log(assessments)
      } catch (error) {
        console.error('Error fetching assessment data:', error);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []); // Include user in the dependency array if it's used inside the effect

  const handleRefresh = async () => {
    try {
      const res = await getAssessment(user);
      
      setAssessments(res.assessments);
      console.log(assessments)
    } catch (error) {
      console.error('Error fetching assessment data:', error);
    }
  };


  const handleDeleteClick = (assessmentId) => {
    setShowDeleteModal(true);
    setSelectedAssessmentId(assessmentId);
  };

  const handleDeleteConfirmation = async () => {
    try {
      // Implement the logic to delete the assessment based on selectedAssessmentId
      console.log('Deleting assessment with id:', selectedAssessmentId);
      await deleteAssessment(user, selectedAssessmentId);

      // Show the delete image for a second
      setShowDeleteImage(true);
      setTimeout(() => {
        setShowDeleteImage(false);
        setShowDeleteModal(false);
        setSelectedAssessmentId(null);
        handleRefresh();
      }, 1000);
    } catch (error) {
      console.error('Error deleting assessment:', error);
      // Handle the error as needed
      setShowDeleteImage(false);
      setShowDeleteModal(false);
      setSelectedAssessmentId(null);
    }
  };
  const handleDeleteCancel = () => {
    // Close the modal without deleting
    setShowDeleteModal(false);
    setSelectedAssessmentId(null);
  };


  return (
    <div className="table-container">
   <div className="refresh-pag-container">
    <div className="left-ref">
        <img src="/Refresh btn.svg" alt="" className="ref-img"  onClick={handleRefresh}/>
        <div className="ref-text">
      Refresh
        </div>
    </div>
    <div className="right-ref">
<div className="pagintion-controller-counter">1  of  1</div>
<div className="pagintion-controller">

    <div className="left-caret">
    <img src="/caret-left.svg" alt="" />
    </div>
   
<div className="right-caret">
<img src="/caret-right.svg" alt="" />
</div>

  
</div>

    </div>
   </div>

   {/**table header */}
 <div className="table-header">
    <div className="box-name-header">
      <input type="checkbox" />
        <div>Name</div>
    </div>
    <div className="description-header">
        Description
    </div>
    <div className="quantity-header">
        Quantity
    </div>
    <div className="action-header">
        Action
      
    </div>
 </div>

   {/**table contents */}
   {assessments.map((assessment) => (
        <div className="table-content" key={assessment._id}>
          <div className="box-name-content">
            <input type="checkbox" />
            <div className="name">{assessment.name}</div>
          </div>
          <div className="description-content">{assessment.description}</div>
          <div className="quantity-content">{assessment.quantity}</div>
          <div className="action-content">
            <Link to={`/update/${assessment._id}`} className="link">
              <div className="update">Update</div>
            </Link>
            <div
              className="delete"
              onClick={() => handleDeleteClick(assessment._id)}
            >
              Delete
            </div>
          </div>
        </div>
      ))}
       {/* Modal */}
       {showDeleteModal && (
        <div className="modal">

{showDeleteImage && <img src="/delete.svg" alt="" />}

          <div className="modal-content">
           <div className="delete-text">Delete Waste Category</div>
<div className="delete-q">Are you sure you want to delete <span> this waste category?</span></div>
            <div className="delete-controller">
           
            <div className="delete-cancel" onClick={handleDeleteCancel}>Cancel</div>
            <div className="delete-delete" onClick={handleDeleteConfirmation}>Delete</div>
            </div>
         
          </div>
        </div>
      )}
    </div>
  )
}

export default Table