import React, { useState, useEffect } from 'react';
import { usePaperStore } from '../store/usePaperStore';
import { Download, Search, Filter, FileText, Calendar, BookOpen, GraduationCap, Star, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Papers = () => {
  const { papers, getAllPapers, searchPapers, downloadPaper, uploadPaper, ratePaper, isLoading, isUploading, uploadProgress } = usePaperStore();
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [filters, setFilters] = useState({
    branch: '',
    semester: '',
    year: '',
    subject: '',
    search: ''
  });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    subject: '',
    branch: '',
    semester: '',
    year: '',
    examType: 'end-term',
    file: null
  });
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const branches = [
    'Computer Science', 'Electronics', 'Electrical', 'Mechanical', 'Civil', 'Chemical',
    'Biotechnology', 'Materials and Metallurgy', 'Mathematics', 'Physics', 'Chemistry',
    'M.Tech CSE', 'M.Tech Electrical', 'M.Tech Civil'
  ];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];
  const examTypes = ['end-term', 'mid-term', 'quiz', 'assignment'];

  useEffect(() => {
    getAllPapers();
  }, [getAllPapers]);

  useEffect(() => {
    let filtered = papers;

    if (filters.branch) {
      filtered = filtered.filter(paper => paper.branch === filters.branch);
    }
    if (filters.semester) {
      filtered = filtered.filter(paper => paper.semester === filters.semester);
    }
    if (filters.year) {
      filtered = filtered.filter(paper => paper.year === filters.year);
    }
    if (filters.subject) {
      filtered = filtered.filter(paper => 
        paper.subject.toLowerCase().includes(filters.subject.toLowerCase())
      );
    }
    if (filters.search) {
      filtered = filtered.filter(paper =>
        paper.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
        paper.branch.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredPapers(filtered);
  }, [papers, filters]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      branch: '',
      semester: '',
      year: '',
      subject: '',
      search: ''
    });
  };

  const handleDownload = (paper) => {
    downloadPaper(paper.id);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadData.file) {
      toast.error('Please select a file');
      return;
    }
    
    await uploadPaper(uploadData);
    setShowUploadModal(false);
    setUploadData({
      subject: '',
      branch: '',
      semester: '',
      year: '',
      examType: 'end-term',
      file: null
    });
  };

  const handleRating = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    await ratePaper(selectedPaper.id, rating, review);
    setShowRatingModal(false);
    setSelectedPaper(null);
    setRating(0);
    setReview('');
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading papers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9">
        {/* Header */}
        <div className="mt-10 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Question Papers</h1>
            <p className="text-gray-600">Browse and download previous year question papers</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Paper
          </button>
        </div>


        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search papers by subject or branch..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.branch}
                onChange={(e) => handleFilterChange('branch', e.target.value)}
              >
                <option value="">All Branches</option>
                {branches.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.semester}
                onChange={(e) => handleFilterChange('semester', e.target.value)}
                disabled={
                  filters.branch.includes("M.Tech") ||
                  ["Mathematics", "Physics", "Chemistry"].includes(filters.branch)
                }
              >
                <option value="">All Semesters</option>
                {semesters.map(semester => (
                  <option key={semester} value={semester}>Semester {semester}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                placeholder="Enter subject name"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.subject}
                onChange={(e) => handleFilterChange('subject', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredPapers.length} of {papers.length} papers
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Papers Grid */}
        {filteredPapers.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No papers found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPapers.map((paper) => (
              <div key={paper.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{paper.subject}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center text-gray-600 text-sm">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {paper.branch}
                        </div>
                        {paper.semester !== 'N/A' && (
                          <div className="flex items-center text-gray-600 text-sm">
                            <BookOpen className="w-4 h-4 mr-2" />
                            Semester {paper.semester}
                          </div>
                        )}
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {paper.year}
                        </div>
                      </div>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      PDF
                    </span>
                  </div>

                  {/* Rating */}
                  {paper.rating && (
                    <div className="flex items-center mb-3">
                      <div className="flex items-center mr-2">
                        {renderStars(Math.round(paper.rating))}
                      </div>
                      <span className="text-sm text-gray-600">({paper.rating.toFixed(1)})</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      {paper.downloads || 0} downloads
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedPaper(paper);
                          setShowRatingModal(true);
                        }}
                        className="flex items-center px-3 py-1 text-yellow-600 text-sm font-medium rounded-lg hover:bg-yellow-50 transition-colors"
                      >
                        <Star className="w-4 h-4 mr-1" />
                        Rate
                      </button>
                      <button
                        onClick={() => handleDownload(paper)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upload Question Paper</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={uploadData.subject}
                    onChange={(e) => setUploadData({...uploadData, subject: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <select
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={uploadData.branch}
                    onChange={(e) => setUploadData({...uploadData, branch: e.target.value})}
                  >
                    <option value="">Select Branch</option>
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                    <select
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={uploadData.semester}
                      onChange={(e) => setUploadData({...uploadData, semester: e.target.value})}
                    >
                      <option value="">Select</option>
                      {semesters.map(semester => (
                        <option key={semester} value={semester}>{semester}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <select
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={uploadData.year}
                      onChange={(e) => setUploadData({...uploadData, year: e.target.value})}
                    >
                      <option value="">Select</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={uploadData.examType}
                    onChange={(e) => setUploadData({...uploadData, examType: e.target.value})}
                  >
                    {examTypes.map(type => (
                      <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => setUploadData({...uploadData, file: e.target.files[0]})}
                  />
                </div>

                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {isUploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Rating Modal */}
        {showRatingModal && selectedPaper && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Rate Paper</h2>
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-gray-800">{selectedPaper.subject}</h3>
                <p className="text-sm text-gray-600">{selectedPaper.branch} • {selectedPaper.year}</p>
              </div>

              <form onSubmit={handleRating} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review (Optional)</label>
                  <textarea
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Share your thoughts about this paper..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowRatingModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Rating
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Papers;