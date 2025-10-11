import express from 'express';
import { upload } from '../middleware/upload.middleware';
import { uploadPaper, getPapers, deletePaper } from '../controllers/questionPaper.controller';

const router = express.Router();

// Upload a new question paper
router.post('/upload', upload.single('questionPaper'), uploadPaper);

// Get question papers with optional filters
router.get('/papers', getPapers);

// Delete a question paper
router.delete('/:id', deletePaper);

export default router;
