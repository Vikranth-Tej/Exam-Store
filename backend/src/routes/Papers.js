const express = require('express');
const Paper = require('../models/Paper');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const { uploadPaper, approvePaper } = require('../controllers/questionPaper.controller');

const router = express.Router();

// @desc    Get all papers with filters
// @route   GET /api/papers
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { branch, semester, year, subject, search, page = 1, limit = 20 } = req.query;
    
    // Build filter object
    const filter = { isVerified: true };
    
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
});

// @desc    Get recent papers
// @route   GET /api/papers/recent
// @access  Private
router.get('/recent', protect, async (req, res) => {
  try {
    const papers = await Paper.find({ isVerified: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('uploadedBy', 'fullName email');
    
    res.json(papers);
  } catch (error) {
    console.error('Get recent papers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get popular papers
// @route   GET /api/papers/popular
// @access  Private
router.get('/popular', protect, async (req, res) => {
  try {
    const papers = await Paper.find({ isVerified: true })
      .sort({ downloads: -1 })
      .limit(10)
      .populate('uploadedBy', 'fullName email');
    
    res.json(papers);
  } catch (error) {
    console.error('Get popular papers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get paper by ID
// @route   GET /api/papers/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id)
      .populate('uploadedBy', 'fullName email')
      .populate('ratings.user', 'fullName email');
    
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    
    res.json(paper);
  } catch (error) {
    console.error('Get paper error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Download paper
// @route   POST /api/papers/:id/download
// @access  Private
router.post('/:id/download', protect, async (req, res) => {
  try {
    const paper = await Paper.findById(req.params.id);
    
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    
    // Increment download count
    await paper.incrementDownloads();
    
    // Add to user's download history
    const user = await User.findById(req.user.id);
    user.downloads.push({
      paperId: paper._id,
      downloadedAt: new Date()
    });
    await user.save();
    
    res.json({
      message: 'Download tracked successfully',
      downloadUrl: paper.fileUrl
    });
  } catch (error) {
    console.error('Download paper error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Rate paper
// @route   POST /api/papers/:id/rate
// @access  Private
router.post('/:id/rate', protect, async (req, res) => {
  try {
    const { rating, review } = req.body;
    const paper = await Paper.findById(req.params.id);
    
    if (!paper) {
      return res.status(404).json({ message: 'Paper not found' });
    }
    
    // Check if user already rated this paper
    const existingRatingIndex = paper.ratings.findIndex(
      r => r.user.toString() === req.user.id
    );
    
    if (existingRatingIndex !== -1) {
      // Update existing rating
      paper.ratings[existingRatingIndex].rating = rating;
      paper.ratings[existingRatingIndex].review = review;
    } else {
      // Add new rating
      paper.ratings.push({
        user: req.user.id,
        rating,
        review
      });
    }
    
    await paper.save();
    
    res.json({ message: 'Rating submitted successfully' });
  } catch (error) {
    console.error('Rate paper error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user's download history
// @route   GET /api/papers/my/downloads
// @access  Private
router.get('/my/downloads', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'downloads.paperId',
        model: 'Paper',
        select: 'subject branch semester year'
      });
    
    const downloads = user.downloads
      .filter(d => d.paperId) // Filter out deleted papers
      .sort((a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt));
    
    res.json(downloads);
  } catch (error) {
    console.error('Get downloads error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Upload new paper
// @route   POST /api/papers/upload
// @access  Private
router.post('/upload', protect, upload.single('file'), uploadPaper);

// @desc    Approve paper (admin only)
// @route   PUT /api/papers/:id/approve
// @access  Private (Admin)
router.put('/:id/approve', protect, approvePaper);
module.exports = router;