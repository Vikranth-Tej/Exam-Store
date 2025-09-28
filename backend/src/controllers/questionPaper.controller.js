const Paper = require('../models/Paper');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// Upload a new question paper
const uploadPaper = async (req, res) => {
  try {
    const { subject, branch, semester, year, examType, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const paper = new Paper({
      subject,
      branch,
      semester,
      year,
      examType: examType || 'end-term',
      description,
      fileName: req.file.originalname,
      fileUrl: `/uploads/papers/${req.file.filename}`,
      fileSize: req.file.size,
      uploadedBy: req.user.id,
      isVerified: false // Requires admin approval
    });

    await paper.save();

    res.status(201).json({
      message: 'Paper uploaded successfully',
      paper: paper
    });
  } catch (error) {
    console.error('Upload paper error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get question papers with optional filters
const getPapers = async (req, res) => {
  try {
    const { branch, semester, year, subject, search, page = 1, limit = 20, status } = req.query;
    
    // Build filter object
    const filter = {};
    
    // Only show verified papers to regular users
    if (req.user.role !== 'admin') {
      filter.isVerified = true;
    } else if (status) {
      filter.isVerified = status === 'approved';
    }
    
    if (branch) filter.branch = branch;
    if (semester) filter.semester = semester;
    if (year) filter.year = year;
    if (subject) filter.subject = new RegExp(subject, 'i');
    
    // Build search query
    let query = Paper.find(filter);
    
    if (search) {
      query = query.find({
        $or: [
          { subject: new RegExp(search, 'i') },
          { branch: new RegExp(search, 'i') },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ]
      });
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    query = query.skip(skip).limit(parseInt(limit));
    
    // Sort by downloads and creation date
    query = query.sort({ downloads: -1, createdAt: -1 });
    
    // Populate uploadedBy field
    query = query.populate('uploadedBy', 'fullName email');
    
    const papers = await query;
    const total = await Paper.countDocuments(filter);
    
    res.json({
      papers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        hasNext: skip + papers.length < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Get papers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a question paper (admin only)
const deletePaper = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const paper = await Paper.findById(req.params.id);
    
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', paper.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Paper.findByIdAndDelete(req.params.id);

    res.json({ message: 'Paper deleted successfully' });
  } catch (error) {
    console.error('Delete paper error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve paper (admin only)
const approvePaper = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const paper = await Paper.findById(req.params.id);
    
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }

    paper.isVerified = true;
    paper.verifiedBy = req.user.id;
    await paper.save();

    res.json({ message: 'Paper approved successfully', paper });
  } catch (error) {
    console.error('Approve paper error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  uploadPaper,
  getPapers,
  deletePaper,
  approvePaper
};

export { uploadPaper, getPapers, deletePaper }