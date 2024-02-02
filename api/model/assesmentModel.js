const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
}, {
  timestamps: true,
});

const Assessment = mongoose.model('Assessment', assessmentSchema);

module.exports = { Assessment };
