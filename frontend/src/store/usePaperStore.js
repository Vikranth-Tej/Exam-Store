import { create } from "zustand";
import toast from "react-hot-toast";

// Mock papers data
const mockPapers = [
  {
    id: 1,
    subject: "Data Structures and Algorithms",
    branch: "Computer Science",
    semester: "3",
    year: "2023",
    downloads: 245,
    fileUrl: "/papers/dsa-2023.pdf"
  },
  {
    id: 2,
    subject: "Operating Systems",
    branch: "Computer Science",
    semester: "4",
    year: "2023",
    downloads: 189,
    fileUrl: "/papers/os-2023.pdf"
  },
  {
    id: 3,
    subject: "Database Management Systems",
    branch: "Computer Science",
    semester: "5",
    year: "2022",
    downloads: 156,
    fileUrl: "/papers/dbms-2022.pdf"
  },
  {
    id: 4,
    subject: "Computer Networks",
    branch: "Computer Science",
    semester: "6",
    year: "2023",
    downloads: 203,
    fileUrl: "/papers/cn-2023.pdf"
  },
  {
    id: 5,
    subject: "Machine Learning",
    branch: "Computer Science",
    semester: "7",
    year: "2023",
    downloads: 298,
    fileUrl: "/papers/ml-2023.pdf"
  },
  {
    id: 6,
    subject: "Thermodynamics",
    branch: "Mechanical",
    semester: "3",
    year: "2023",
    downloads: 167,
    fileUrl: "/papers/thermo-2023.pdf"
  },
  {
    id: 7,
    subject: "Fluid Mechanics",
    branch: "Mechanical",
    semester: "4",
    year: "2022",
    downloads: 134,
    fileUrl: "/papers/fluid-2022.pdf"
  },
  {
    id: 8,
    subject: "Circuit Analysis",
    branch: "Electrical",
    semester: "2",
    year: "2023",
    downloads: 278,
    fileUrl: "/papers/circuits-2023.pdf"
  },
  {
    id: 9,
    subject: "Digital Electronics",
    branch: "Electronics",
    semester: "3",
    year: "2023",
    downloads: 198,
    fileUrl: "/papers/digital-2023.pdf"
  },
  {
    id: 10,
    subject: "Structural Engineering",
    branch: "Civil",
    semester: "5",
    year: "2022",
    downloads: 145,
    fileUrl: "/papers/structural-2022.pdf"
  },
  {
    id: 11,
    subject: "Software Engineering",
    branch: "Computer Science",
    semester: "6",
    year: "2022",
    downloads: 213,
    fileUrl: "/papers/se-2022.pdf"
  },
  {
    id: 12,
    subject: "Compiler Design",
    branch: "Computer Science",
    semester: "7",
    year: "2021",
    downloads: 167,
    fileUrl: "/papers/compiler-2021.pdf"
  }
];

export const usePaperStore = create((set, get) => ({
  papers: [],
  isLoading: false,

  getAllPapers: async () => {
    set({ isLoading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ papers: mockPapers, isLoading: false });
    } catch (error) {
      toast.error("Error loading papers");
      set({ isLoading: false });
    }
  },

  getRecentPapers: async () => {
    try {
      // Get recent papers (last 10)
      const recentPapers = mockPapers.slice(-10);
      set({ papers: recentPapers });
    } catch (error) {
      toast.error("Error loading recent papers");
    }
  },

  searchPapers: async (filters) => {
    set({ isLoading: true });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredPapers = mockPapers;
      
      if (filters.branch) {
        filteredPapers = filteredPapers.filter(paper => paper.branch === filters.branch);
      }
      if (filters.semester) {
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
      
      set({ papers: filteredPapers, isLoading: false });
    } catch (error) {
      toast.error("Error searching papers");
      set({ isLoading: false });
    }
  },

  downloadPaper: async (paperId) => {
    try {
      const papers = get().papers;
      const paperIndex = papers.findIndex(p => p.id === paperId);
      
      if (paperIndex !== -1) {
        // Increment download count
        const updatedPapers = [...papers];
        updatedPapers[paperIndex].downloads += 1;
        set({ papers: updatedPapers });
        
        toast.success("Download started!");
        // In real app, trigger actual download
      }
    } catch (error) {
      toast.error("Error downloading paper");
    }
  },
}));