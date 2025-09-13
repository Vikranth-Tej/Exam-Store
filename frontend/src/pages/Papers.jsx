import React, { useState, useEffect } from 'react';
import { usePaperStore } from '../store/usePaperStore';
import { Download, Search, Filter, FileText, Calendar, BookOpen, GraduationCap } from 'lucide-react';
import toast from 'react-hot-toast';

const Papers = () => {
  const { papers, getAllPapers, isLoading } = usePaperStore();
  const [filteredPapers, setFilteredPapers] = useState([]);
  const [filters, setFilters] = useState({
    branch: '',
    semester: '',
    year: '',
    subject: '',
    search: ''
  });

  const branches = ['Computer Science', 'Mechanical', 'Electrical', 'Electronics', 'Civil', 'Chemical'];
  const semesters = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];

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
    // In real app, this would trigger actual file download
    toast.success(`Downloading ${paper.subject} paper`);
    console.log('Downloading paper:', paper);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Question Papers</h1>
          <p className="text-gray-600">Browse and download previous year question papers</p>
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
            {filteredPapers.map((paper, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{paper.subject}</h3>
                      <div className="space-y-1">
                        <div className="flex items-center text-gray-600 text-sm">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {paper.branch}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Semester {paper.semester}
                        </div>
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

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500">
                      {paper.downloads || Math.floor(Math.random() * 500) + 50} downloads
                    </div>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Papers;
