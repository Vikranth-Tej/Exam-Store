import QuestionPaper from '../models/QuestionPaper.model';

export const uploadPaper = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    const paper = new QuestionPaper({
      year: req.body.year,
      department: req.body.department,
      subjectName: req.body.subjectName,
      subjectCode: req.body.subjectCode,
      fileUrl: req.file.path
    });

    const savedPaper = await paper.save();
    res.status(201).json(savedPaper);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPapers = async (req, res) => {
  try {
    const { year, department, subjectName, subjectCode } = req.query;
    const query = {};

    if (year) query.year = year;
    if (department) query.department = { $regex: department, $options: 'i' };
    if (subjectName) query.subjectName = { $regex: subjectName, $options: 'i' };
    if (subjectCode) query.subjectCode = { $regex: subjectCode, $options: 'i' };

    const papers = await QuestionPaper.find(query).sort({ year: -1, subjectName: 1 });
    res.json(papers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePaper = async (req, res) => {
  try {
    const paper = await QuestionPaper.findByIdAndDelete(req.params.id);
    if (!paper) {
      return res.status(404).json({ message: 'Question paper not found' });
    }
    res.json({ message: 'Question paper deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
