import React from 'react';

const CoursesAndFees = ({ coursesData }) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Course</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Total Courses</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">1st Year Tuition Fees</th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase">Duration & Eligibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {coursesData.coursesAndFees.map((course, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{course.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.totalCourses}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.tuitionFees}</td>
                <td className="px-6 py-4 whitespace-nowrap">{course.durationAndEligibility}<br />Exam Accepted: {course.examAccepted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesAndFees;
