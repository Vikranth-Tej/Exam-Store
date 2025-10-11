import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

// Enhanced mock papers data with more comprehensive coverage
const mockPapers = [
  // Computer Science Engineering
  { id: 1, subject: "Data Structures and Algorithms", branch: "Computer Science", semester: "3", year: "2023", downloads: 245, fileUrl: "/papers/cse-dsa-2023.pdf", examType: "end-term", rating: 4.5 },
  { id: 2, subject: "Operating Systems", branch: "Computer Science", semester: "4", year: "2023", downloads: 189, fileUrl: "/papers/cse-os-2023.pdf", examType: "end-term", rating: 4.3 },
  { id: 3, subject: "Database Management Systems", branch: "Computer Science", semester: "5", year: "2022", downloads: 156, fileUrl: "/papers/cse-dbms-2022.pdf", examType: "end-term", rating: 4.2 },
  { id: 4, subject: "Computer Networks", branch: "Computer Science", semester: "6", year: "2023", downloads: 203, fileUrl: "/papers/cse-cn-2023.pdf", examType: "end-term", rating: 4.4 },
  { id: 5, subject: "Machine Learning", branch: "Computer Science", semester: "7", year: "2023", downloads: 298, fileUrl: "/papers/cse-ml-2023.pdf", examType: "end-term", rating: 4.7 },
  { id: 6, subject: "Software Engineering", branch: "Computer Science", semester: "6", year: "2022", downloads: 213, fileUrl: "/papers/cse-se-2022.pdf", examType: "end-term", rating: 4.1 },
  { id: 7, subject: "Compiler Design", branch: "Computer Science", semester: "7", year: "2021", downloads: 167, fileUrl: "/papers/cse-compiler-2021.pdf", examType: "end-term", rating: 4.0 },

  // Electronics and Communication Engineering
  { id: 8, subject: "Signals and Systems", branch: "Electronics", semester: "3", year: "2023", downloads: 167, fileUrl: "/papers/ece-signals-2023.pdf", examType: "end-term", rating: 4.2 },
  { id: 9, subject: "Digital Electronics", branch: "Electronics", semester: "4", year: "2022", downloads: 134, fileUrl: "/papers/ece-digital-2022.pdf", examType: "end-term", rating: 4.1 },
  { id: 10, subject: "VLSI Design", branch: "Electronics", semester: "6", year: "2023", downloads: 198, fileUrl: "/papers/ece-vlsi-2023.pdf", examType: "end-term", rating: 4.3 },
  { id: 11, subject: "Communication Systems", branch: "Electronics", semester: "5", year: "2023", downloads: 176, fileUrl: "/papers/ece-comm-2023.pdf", examType: "end-term", rating: 4.2 },
  { id: 12, subject: "Microprocessors", branch: "Electronics", semester: "4", year: "2023", downloads: 145, fileUrl: "/papers/ece-micro-2023.pdf", examType: "end-term", rating: 4.0 },

  // Electrical Engineering
  { id: 13, subject: "Circuit Analysis", branch: "Electrical", semester: "2", year: "2023", downloads: 278, fileUrl: "/papers/eee-circuits-2023.pdf", examType: "end-term", rating: 4.4 },
  { id: 14, subject: "Power Systems", branch: "Electrical", semester: "5", year: "2023", downloads: 156, fileUrl: "/papers/eee-power-2023.pdf", examType: "end-term", rating: 4.3 },
  { id: 15, subject: "Electrical Machines", branch: "Electrical", semester: "4", year: "2022", downloads: 189, fileUrl: "/papers/eee-machines-2022.pdf", examType: "end-term", rating: 4.2 },
  { id: 16, subject: "Control Systems", branch: "Electrical", semester: "6", year: "2023", downloads: 167, fileUrl: "/papers/eee-control-2023.pdf", examType: "end-term", rating: 4.1 },

  // Mechanical Engineering
  { id: 17, subject: "Thermodynamics", branch: "Mechanical", semester: "3", year: "2023", downloads: 167, fileUrl: "/papers/mech-thermo-2023.pdf", examType: "end-term", rating: 4.2 },
  { id: 18, subject: "Fluid Mechanics", branch: "Mechanical", semester: "4", year: "2022", downloads: 134, fileUrl: "/papers/mech-fluid-2022.pdf", examType: "end-term", rating: 4.0 },
  { id: 19, subject: "Machine Design", branch: "Mechanical", semester: "6", year: "2023", downloads: 198, fileUrl: "/papers/mech-design-2023.pdf", examType: "end-term", rating: 4.3 },
  { id: 20, subject: "Heat Transfer", branch: "Mechanical", semester: "5", year: "2023", downloads: 145, fileUrl: "/papers/mech-heat-2023.pdf", examType: "end-term", rating: 4.1 },

  // Civil Engineering
  { id: 21, subject: "Structural Engineering", branch: "Civil", semester: "5", year: "2022", downloads: 145, fileUrl: "/papers/civil-structural-2022.pdf", examType: "end-term", rating: 4.2 },
  { id: 22, subject: "Surveying", branch: "Civil", semester: "3", year: "2023", downloads: 165, fileUrl: "/papers/civil-survey-2023.pdf", examType: "end-term", rating: 4.0 },
  { id: 23, subject: "Concrete Technology", branch: "Civil", semester: "4", year: "2023", downloads: 123, fileUrl: "/papers/civil-concrete-2023.pdf", examType: "end-term", rating: 4.1 },
  { id: 24, subject: "Transportation Engineering", branch: "Civil", semester: "6", year: "2022", downloads: 134, fileUrl: "/papers/civil-transport-2022.pdf", examType: "end-term", rating: 3.9 },

  // Chemical Engineering
  { id: 25, subject: "Process Calculations", branch: "Chemical", semester: "2", year: "2023", downloads: 121, fileUrl: "/papers/chem-process-2023.pdf", examType: "end-term", rating: 4.0 },
  { id: 26, subject: "Chemical Reaction Engineering", branch: "Chemical", semester: "5", year: "2022", downloads: 111, fileUrl: "/papers/chem-reaction-2022.pdf", examType: "end-term", rating: 4.2 },
  { id: 27, subject: "Mass Transfer", branch: "Chemical", semester: "4", year: "2023", downloads: 98, fileUrl: "/papers/chem-mass-2023.pdf", examType: "end-term", rating: 4.1 },

  // Biotechnology
  { id: 28, subject: "Molecular Biology", branch: "Biotechnology", semester: "3", year: "2023", downloads: 156, fileUrl: "/papers/bt-molecular-2023.pdf", examType: "end-term", rating: 4.3 },
  { id: 29, subject: "Bioprocess Engineering", branch: "Biotechnology", semester: "5", year: "2022", downloads: 123, fileUrl: "/papers/bt-bioprocess-2022.pdf", examType: "end-term", rating: 4.2 },
  { id: 30, subject: "Biochemistry", branch: "Biotechnology", semester: "2", year: "2023", downloads: 134, fileUrl: "/papers/bt-biochem-2023.pdf", examType: "end-term", rating: 4.1 },

  // Materials and Metallurgy
  { id: 31, subject: "Physical Metallurgy", branch: "Materials and Metallurgy", semester: "3", year: "2023", downloads: 98, fileUrl: "/papers/meta-physical-2023.pdf", examType: "end-term", rating: 4.0 },
  { id: 32, subject: "Extractive Metallurgy", branch: "Materials and Metallurgy", semester: "6", year: "2022", downloads: 87, fileUrl: "/papers/meta-extractive-2022.pdf", examType: "end-term", rating: 3.9 },

  // Integrated MSc Programs
  { id: 33, subject: "Abstract Algebra", branch: "Mathematics", semester: "N/A", year: "2023", downloads: 143, fileUrl: "/papers/msc-maths-algebra-2023.pdf", examType: "end-term", rating: 4.4 },
  { id: 34, subject: "Quantum Mechanics", branch: "Physics", semester: "N/A", year: "2022", downloads: 154, fileUrl: "/papers/msc-physics-quantum-2022.pdf", examType: "end-term", rating: 4.5 },
  { id: 35, subject: "Organic Chemistry", branch: "Chemistry", semester: "N/A", year: "2023", downloads: 132, fileUrl: "/papers/msc-chemistry-organic-2023.pdf", examType: "end-term", rating: 4.3 },

  // M.Tech Programs
  { id: 36, subject: "Advanced Algorithms", branch: "M.Tech CSE", semester: "N/A", year: "2023", downloads: 101, fileUrl: "/papers/mtech-cse-algo-2023.pdf", examType: "end-term", rating: 4.6 },
  { id: 37, subject: "Advanced Power Systems", branch: "M.Tech Electrical", semester: "N/A", year: "2023", downloads: 99, fileUrl: "/papers/mtech-eee-power-2023.pdf", examType: "end-term", rating: 4.5 },
  { id: 38, subject: "Advanced Structural Engineering", branch: "M.Tech Civil", semester: "N/A", year: "2022", downloads: 87, fileUrl: "/papers/mtech-civil-structural-2022.pdf", examType: "end-term", rating: 4.4 }
];

export const usePaperStore = create((set, get) => ({
  papers: [],
  isLoading: false,
  uploadProgress: 0,
  isUploading: false,

  getAllPapers: async () => {
    set({ isLoading: true });
    try {
      // Try real API first, fallback to mock
      try {
        const res = await axiosInstance.get("/papers");
        set({ papers: res.data.papers || res.data, isLoading: false });
        return;
      } catch (apiError) {
        console.log("API failed, using mock data:", apiError.message);
      }

      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ papers: mockPapers, isLoading: false });
    } catch (error) {
      toast.error("Error loading papers");
      set({ isLoading: false });
    }
  },

  getRecentPapers: async () => {
    try {
      // Try real API first, fallback to mock
      try {
        const res = await axiosInstance.get("/papers/recent");
        set({ papers: res.data });
        return;
      } catch (apiError) {
        console.log("API failed, using mock data:", apiError.message);
      }

      // Mock recent papers
      const recentPapers = mockPapers
        .sort((a, b) => new Date(b.year) - new Date(a.year))
        .slice(0, 10);
      set({ papers: recentPapers });
    } catch (error) {
      toast.error("Error loading recent papers");
    }
  },

  searchPapers: async (filters) => {
    set({ isLoading: true });
    try {
      // Try real API first, fallback to mock
      try {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value);
        });
        
        const res = await axiosInstance.get(`/papers?${params}`);
        set({ papers: res.data.papers || res.data, isLoading: false });
        return;
      } catch (apiError) {
        console.log("API failed, using mock search:", apiError.message);
      }

      // Mock search delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredPapers = mockPapers;
      
      if (filters.branch) {
        filteredPapers = filteredPapers.filter(paper => paper.branch === filters.branch);
      }
      if (filters.semester && filters.semester !== "N/A") {
        filteredPapers = filteredPapers.filter(paper => paper.semester === filters.semester);
      }
      if (filters.year) {
        filteredPapers = filteredPapers.filter(paper => paper.year === filters.year);
      }
      if (filters.subject) {
        filteredPapers = filteredPapers.filter(paper => 
          paper.subject.toLowerCase().includes(filters.subject.toLowerCase())
        );
      }
      if (filters.search) {
        filteredPapers = filteredPapers.filter(paper =>
          paper.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
          paper.branch.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      set({ papers: filteredPapers, isLoading: false });
    } catch (error) {
      toast.error("Error searching papers");
      set({ isLoading: false });
    }
  },

  downloadPaper: async (paperId) => {
    try {
      // Try real API first, fallback to mock
      try {
        const res = await axiosInstance.post(`/papers/${paperId}/download`);
        toast.success("Download started!");
        
        // Update local state
        const papers = get().papers;
        const paperIndex = papers.findIndex(p => p.id === paperId);
        if (paperIndex !== -1) {
          const updatedPapers = [...papers];
          updatedPapers[paperIndex].downloads += 1;
          set({ papers: updatedPapers });
        }
        return;
      } catch (apiError) {
        console.log("API failed, using mock download:", apiError.message);
      }

      // Mock download
      const papers = get().papers;
      const paperIndex = papers.findIndex(p => p.id === paperId);
      
      if (paperIndex !== -1) {
        const updatedPapers = [...papers];
        updatedPapers[paperIndex].downloads += 1;
        set({ papers: updatedPapers });
        
        toast.success("Download started!");
        // In real app, trigger actual download
        // window.open(updatedPapers[paperIndex].fileUrl, '_blank');
      }
    } catch (error) {
      toast.error("Error downloading paper");
    }
  },

  uploadPaper: async (paperData) => {
    set({ isUploading: true, uploadProgress: 0 });
    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        set(state => ({ 
          uploadProgress: Math.min(state.uploadProgress + 10, 90) 
        }));
      }, 200);

      // Try real API first, fallback to mock
      try {
        const formData = new FormData();
        Object.entries(paperData).forEach(([key, value]) => {
          formData.append(key, value);
        });

        const res = await axiosInstance.post("/papers/upload", formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            set({ uploadProgress: progress });
          }
        });

        clearInterval(progressInterval);
        set({ uploadProgress: 100, isUploading: false });
        toast.success("Paper uploaded successfully!");
        
        // Refresh papers list
        get().getAllPapers();
        return;
      } catch (apiError) {
        console.log("API failed, using mock upload:", apiError.message);
      }

      // Mock upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearInterval(progressInterval);
      
      const newPaper = {
        id: Date.now(),
        ...paperData,
        downloads: 0,
        rating: 0,
        fileUrl: `/papers/mock-${Date.now()}.pdf`
      };

      const papers = get().papers;
      set({ 
        papers: [newPaper, ...papers], 
        uploadProgress: 100, 
        isUploading: false 
      });
      
      toast.success("Paper uploaded successfully!");
    } catch (error) {
      set({ isUploading: false, uploadProgress: 0 });
      toast.error("Error uploading paper");
    }
  },

  ratePaper: async (paperId, rating, review) => {
    try {
      // Try real API first, fallback to mock
      try {
        await axiosInstance.post(`/papers/${paperId}/rate`, { rating, review });
        toast.success("Rating submitted successfully!");
        return;
      } catch (apiError) {
        console.log("API failed, using mock rating:", apiError.message);
      }

      // Mock rating
      const papers = get().papers;
      const paperIndex = papers.findIndex(p => p.id === paperId);
      
      if (paperIndex !== -1) {
        const updatedPapers = [...papers];
        // Simple rating update (in real app, this would be more complex)
        updatedPapers[paperIndex].rating = rating;
        set({ papers: updatedPapers });
        toast.success("Rating submitted successfully!");
      }
    } catch (error) {
      toast.error("Error submitting rating");
    }
  }
}));