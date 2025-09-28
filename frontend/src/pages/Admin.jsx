import React, { useState, useEffect } from 'react';
import { usePaperStore } from '../store/usePaperStore';
import { useAuthStore } from '../store/useAuthStore';
import { FileText, Users, Download, Eye, Check, X, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const Admin = () => {
  const { papers, getAllPapers } = usePaperStore();
  const { authUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Admin stats
  const [adminStats, setAdminStats] = useState({
    totalPapers: 0,
    pendingApproval: 0,
    totalUsers: 1250,
    totalDownloads: 45000,
    recentUploads: []
  });

  const [pendingPapers, setPendingPapers] = useState([]);

  useEffect(() => {
    getAllPapers();
  }, [getAllPapers]);

  useEffect(() => {
    const pending = papers.filter(paper => !paper.isVerified);
    const totalDownloads = papers.reduce((sum, paper) => sum + (paper.downloads || 0), 0);

    setAdminStats({
      totalPapers: papers.length,
      pendingApproval: pending.length,
      totalUsers: 1250,
      totalDownloads,
      recentUploads: papers.slice(-5).reverse()
    });

    setPendingPapers(pending);
  }, [papers]);

  const handleApprove = (paperId) => {
    toast.success('Paper approved successfully');
    setPendingPapers(prev => prev.filter(paper => paper.id !== paperId));
  };

  const handleReject = (paperId) => {
    toast.success('Paper rejected');
    setPendingPapers(prev => prev.filter(paper => paper.id !== paperId));
  };

  const filteredPapers = papers.filter(paper => {
    const matchesSearch =
      paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paper.branch.toLowerCase().includes(searchTerm.toLowerCase());

    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'approved') return matchesSearch && paper.isVerified;
    if (statusFilter === 'pending') return matchesSearch && !paper.isVerified;

    return matchesSearch;
  });

  const StatCard = ({ icon: Icon, title, value, color = 'blue' }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  // ✅ Access control: only specific emails
  const allowedAdmins = [
    'cj22btb0a53@student.nitw.ac.in', // jayanth
    'ps22btb0a44@student.nitw.ac.in'  // vikranth
  ];

  if (!authUser || !allowedAdmins.includes(authUser.email?.toLowerCase())) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage papers, users, and platform settings</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'papers', label: 'Manage Papers' },
              { id: 'pending', label: 'Pending Approval' },
              { id: 'users', label: 'Users' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.id === 'pending' && pendingPapers.length > 0 && (
                  <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {pendingPapers.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={FileText} title="Total Papers" value={adminStats.totalPapers.toLocaleString()} color="blue" />
              <StatCard icon={Eye} title="Pending Approval" value={adminStats.pendingApproval} color="yellow" />
              <StatCard icon={Users} title="Total Users" value={adminStats.totalUsers.toLocaleString()} color="green" />
              <StatCard icon={Download} title="Total Downloads" value={adminStats.totalDownloads.toLocaleString()} color="purple" />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Uploads</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {adminStats.recentUploads.map((paper, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div>
                        <h4 className="font-medium text-gray-900">{paper.subject}</h4>
                        <p className="text-sm text-gray-600">{paper.branch} • {paper.year}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          paper.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {paper.isVerified ? 'Approved' : 'Pending'}
                        </span>
                        <span className="text-sm text-gray-500">{paper.downloads || 0} downloads</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Papers Tab */}
        {activeTab === 'papers' && (
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search papers..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Papers</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Papers List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">All Papers ({filteredPapers.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPapers.map(paper => (
                      <tr key={paper.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{paper.subject}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paper.branch}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paper.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{paper.downloads || 0}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            paper.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>{paper.isVerified ? 'Approved' : 'Pending'}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Pending Tab */}
        {activeTab === 'pending' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Pending Approval ({pendingPapers.length})</h3>
              </div>
              <div className="p-6">
                {pendingPapers.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No papers pending approval</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingPapers.map(paper => (
                      <div key={paper.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium text-gray-900">{paper.subject}</h4>
                          <p className="text-sm text-gray-600">{paper.branch} • Semester {paper.semester} • {paper.year}</p>
                          <p className="text-xs text-gray-500 mt-1">Uploaded on {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(paper.id)}
                            className="flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Check className="w-4 h-4 mr-1" /> Approve
                          </button>
                          <button
                            onClick={() => handleReject(paper.id)}
                            className="flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <X className="w-4 h-4 mr-1" /> Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">User Management</h3>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">User management features coming soon</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
