import mongoose from 'mongoose';

const questionPaperSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  subjectCode: {
    type: String,
    required: true
  },
  semester: {
    type: String, // e.g., "1", "2", ..., "8"
    required: false
  },
  downloads: {
    type: Number,
    default: 0
  },
  fileUrl: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('QuestionPaper', questionPaperSchema);
