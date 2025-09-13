const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [2, 'Subject must be at least 2 characters long']
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    enum: ['Computer Science', 'Mechanical', 'Electrical', 'Electronics', 'Civil', 'Chemical']
  },
  semester: {
    type: String,
    required: [true, 'Semester is required'],
    enum: ['1', '2', '3', '4', '5', '6', '7', '8']
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    match: [/^\d{4}$/, 'Year must be a 4-digit number']
  },
  examType: {
    type: String,
    enum: ['mid-term', 'end-term', 'quiz', 'assignment'],
    default: 'end-term'
  },
  fileUrl: {
    type: String,
    required: [true, 'File URL is required']
  },
  fileName: {
    type: String,
    required: [true, 'File name is required']
  },
  fileSize: {
    type: Number, // in bytes
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  downloads: {
    type: Number,
    default: 0
  },
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    review: {
      type: String,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  description: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Index for efficient searching
paperSchema.index({ subject: 'text', branch: 1, semester: 1, year: 1 });
paperSchema.index({ branch: 1, semester: 1, year: -1 });
paperSchema.index({ downloads: -1 });
paperSchema.index({ averageRating: -1 });

// Calculate average rating before saving
paperSchema.pre('save', function(next) {
  if (this.ratings && this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    this.averageRating = sum / this.ratings.length;
  }
  next();
});

// Method to increment downloads
paperSchema.methods.incrementDownloads = function() {
  this.downloads += 1;
  return this.save();
};

module.exports = mongoose.model('Paper', paperSchema);