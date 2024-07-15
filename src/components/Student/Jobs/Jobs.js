import React, { useState } from 'react';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Mid-level',
    domain: 'Software Development',
    description: 'We are looking for a skilled frontend developer to join our team. You will be working with the latest technologies to build innovative products.',
    datePosted: '2 days ago',
    responsibilities: 'Develop new user-facing features, Build reusable code and libraries for future use, Ensure the technical feasibility of UI/UX designs, Optimize application for maximum speed and scalability.',
    requirements: 'Proven work experience as a Frontend Developer, In-depth understanding of the entire web development process, Hands-on experience with markup languages, Experience with JavaScript, CSS, and React.js.'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'DevSolutions',
    location: 'New York, NY',
    type: 'Part-time',
    experience: 'Senior',
    domain: 'Software Development',
    description: 'Seeking an experienced backend developer to support our growing platform. You will be responsible for managing the interchange of data between the server and the users.',
    datePosted: '1 week ago',
    responsibilities: 'Integration of user-facing elements developed by front-end developers with server-side logic, Building reusable code and libraries for future use, Optimization of the application for maximum speed and scalability, Implementation of security and data protection.',
    requirements: 'Proven work experience as a Backend Developer, Hands-on experience with programming languages like Java, Ruby, PHP, and Python, Familiarity with front-end languages (e.g., HTML, JavaScript, and CSS).'
  },
  {
    id: 3,
    title: 'Graphic Designer',
    company: 'Creatives Inc.',
    location: 'San Francisco, CA',
    type: 'Contract',
    experience: 'Junior',
    domain: 'Design',
    description: 'We are looking for a creative Graphic Designer to join our team. You will be responsible for creating visual concepts that inspire, inform, and captivate consumers.',
    datePosted: '3 days ago',
    responsibilities: 'Create visual aspects of marketing materials, websites, and other media, Put together disparate elements of a design created by other professionals, Ensure consistent visual language across all communication channels.',
    requirements: 'Proven work experience as a Graphic Designer, Proficiency in design software such as Adobe Illustrator, Photoshop, and InDesign, A keen eye for aesthetics and details.'
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'DataPro',
    location: 'Boston, MA',
    type: 'Full-time',
    experience: 'Mid-level',
    domain: 'Data Science',
    description: 'We are looking for a Data Scientist to analyze large amounts of raw information to find patterns and insights that will help improve our company.',
    datePosted: '5 days ago',
    responsibilities: 'Identify valuable data sources and automate collection processes, Undertake preprocessing of structured and unstructured data, Analyze large amounts of information to discover trends and patterns.',
    requirements: 'Proven experience as a Data Scientist, Knowledge of R, SQL, and Python, Experience with data visualization tools such as Tableau or PowerBI.'
  },
  // Add more job listings here...
];

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All Locations');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [experienceFilter, setExperienceFilter] = useState('All Experience Levels');
  const [domainFilter, setDomainFilter] = useState('All Domains');

  const handleCardClick = (job) => {
    setSelectedJob(job);
  };

  const closeSidebar = () => {
    setSelectedJob(null);
  };

  const filteredJobs = jobs.filter(job => {
    return (
      (locationFilter === 'All Locations' || job.location === locationFilter) &&
      (typeFilter === 'All Types' || job.type === typeFilter) &&
      (experienceFilter === 'All Experience Levels' || job.experience === experienceFilter) &&
      (domainFilter === 'All Domains' || job.domain === domainFilter) &&
      (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       job.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
 
        <div className="min-h-screen bg-gray-900 mt-0 p-1 relative">
        <div className="max-w-7xl mx-auto py-4">
    {/* Search Bar */}
    <div className="bg-gray-800 shadow-md rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for jobs"
                className="p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Location Filter */}
            <select
                className="p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
            >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="New York, NY">New York, NY</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="Boston, MA">Boston, MA</option>
                {/* Add more locations here */}
            </select>

            {/* Type Filter */}
            <select
                className="p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
            >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                {/* Add more job types here */}
            </select>

            {/* Experience Filter */}
            <select
                className="p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
            >
                <option value="">All Experience Levels</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
            </select>
        </div>
    </div>

    {/* Job Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="bg-gray-800 shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition duration-300"
                  onClick={() => handleCardClick(job)}
                >
                  <h2 className="text-2xl font-semibold mb-2 text-white">{job.title}</h2>
                  <p className="text-gray-400 mb-1">{job.company}</p>
                  <p className="text-gray-500 mb-3">{job.location}</p>
                  <p className="text-gray-300 mb-4">{job.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{job.datePosted}</span>
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full">{job.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedJob && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
              <div className="w-1/3 bg-gray-800 h-full p-6 overflow-y-auto transition duration-300 ease-in-out transform translate-x-0">
                <button
                  className="text-white text-2xl font-bold mb-4 focus:outline-none"
                  onClick={closeSidebar}
                >
                  &times;
                </button>
                <h2 className="text-3xl font-bold mb-4 text-white">{selectedJob.title}</h2>
                <p className="text-gray-400 mb-2">{selectedJob.company}</p>
                <p className="text-gray-500 mb-4">{selectedJob.location}</p>
                <h3 className="text-xl font-semibold mb-2 text-white">Job Description</h3>
                <p className="text-gray-300 mb-4">{selectedJob.description}</p>
                <h3 className="text-xl font-semibold mb-2 text-white">Responsibilities</h3>
                <p className="text-gray-300 mb-4">{selectedJob.responsibilities}</p>
                <h3 className="text-xl font-semibold mb-2 text-white">Requirements</h3>
                <p className="text-gray-300 mb-4">{selectedJob.requirements}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{selectedJob.datePosted}</span>
                  <span className="px-3 py-1 bg-blue-500 text-white rounded-full">{selectedJob.type}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      );
      

};

export default Jobs;
