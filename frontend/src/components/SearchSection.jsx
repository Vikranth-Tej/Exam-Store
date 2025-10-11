import React from 'react'

const SearchSection = () => {
  return (
    <div className="search-section p-4 bg-gray-100 rounded-lg shadow-md">
      <h4 className="mb-3 text-lg font-semibold">Search for Papers</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
          <select id="year" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option selected>Select Year</option>
            <option value="1">First Year</option>
            <option value="2">Second Year</option>
            <option value="3">Third Year</option>
            <option value="4">Final Year</option>
          </select>
        </div>
        <div>
          <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
          <select id="branch" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option selected>Select Branch</option>
            <option value="bt">Biotechnology</option>
            <option value="ece">Electronics and Communication</option>
            <option value="me">Mechanical</option>
            <option value="ce">Civil</option>
            <option value="cse">Computer Science</option>
          </select>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <select id="subject" className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
            <option selected>Select Subject</option>
            <option value="maths">Microbiology</option>
            <option value="physics">Biochemistry</option>
            <option value="chemistry">Molecular Biology</option>
            <option value="biology">Bioinformatics</option>
          </select>
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Search</button>
        </div>
      </div>
    </div>
  )
}

export default SearchSection
