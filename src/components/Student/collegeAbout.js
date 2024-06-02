import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

const CollegeAbout = () => {
  const {universityId }= useParams();
  const [collegeAboutData, setCollegeAboutData] = useState(null);
  console.log(universityId)
  useEffect(() => {
    const fetchCollegeAboutData = async () => {
      try {
        const universityDocRef = doc(firestore, 'universities', universityId);
        const universityDocSnapshot = await getDoc(universityDocRef);
        if (universityDocSnapshot.exists()) {
          setCollegeAboutData(universityDocSnapshot.data());
        } else {
          console.log('University document not found');
        }
      } catch (error) {
        console.error('Error fetching college about data:', error);
      }
    };

    fetchCollegeAboutData();
  }, [universityId]);

  if (!collegeAboutData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-4">
    <p className="font-semibold text-lg mb-4">About {collegeAboutData.collegeName}</p>
    <p className="mb-4">{collegeAboutData.description}</p>
    <table className="w-full">
        <tbody className="divide-y divide-gray-700">
            <tr>
                <td className="py-2">Established</td>
                <td className="py-2">{collegeAboutData.established}</td>
            </tr>
            <tr>
                <td className="py-2">Location</td>
                <td className="py-2">{collegeAboutData.location}</td>
            </tr>
            <tr>
                <td className="py-2">Exams Accepted</td>
                <td className="py-2">{collegeAboutData.examsAccepted}</td>
            </tr>
            <tr>
                <td className="py-2">Ranking</td>
                <td className="py-2">{collegeAboutData.ranking}</td>
            </tr>
            <tr>
                <td className="py-2">Total Students</td>
                <td className="py-2">{collegeAboutData.totalStudents}</td>
            </tr>
            <tr>
                <td className="py-2">Type</td>
                <td className="py-2">{collegeAboutData.scholarships}</td>
            </tr>
        </tbody>
    </table>
</div>

  );
};

export default CollegeAbout;
