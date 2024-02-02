const {  Assessment } = require('../model/assesmentModel');

const createAssessment = async (req, res) => {
    try {

      const { id } = req.user;
     console.log(id)
      const { name, description, quantity } = req.body;
  console.log(req.body)
      const newAssessment = new Assessment({
        user_id: id,
        name,
        description,
        quantity,
      });
  
      const acct = await newAssessment.save();
      console.log(acct);
      return res
        .status(201)
        .json({ message: "Assessment created successfully", acct });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ Error: "Internal Server Error" });
    }
  };

 const getAssessments = async (req, res) => {
  try {
    const { id } = req.params;

console.log('yes')
    const assessments = await Assessment.find({ user_id: id });

    return res
      .status(200)
      .json({ message: "Assessment retrieved successfully", assessments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

const updateAssessments = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, quantity } = req.body;

    // Use findByIdAndUpdate to find the assessment by its MongoDB _id
    const assessment = await Assessment.findByIdAndUpdate(
      {_id:id},
      { name, description, quantity },
      { new: true } // This option returns the modified document instead of the original
    );

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    return res
      .status(200)
      .json({ message: "Assessment updated successfully", assessment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


 const deleteAssessments = async (req, res) => {
  try {
    console.log('delete')
    const { id } = req.params;
    const assessment = await Assessment.findOneAndDelete({
      
      _id:id,
    });

    return res
      .status(200)
      .json({ message: "Assessment deleted successfully", assessment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
};

module.exports = {createAssessment , getAssessments , updateAssessments,deleteAssessments };
