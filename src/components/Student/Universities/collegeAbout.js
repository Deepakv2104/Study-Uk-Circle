import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { doc, getDoc } from 'firebase/firestore';   
import { firestore } from '../../../firebase';

const CollegeAbout = () => {
  const { universityId } = useParams();
  const [collegeAboutData, setCollegeAboutData] = useState(null);
  const [dataSource, setDataSource] = useState(''); // New state variable for data source

  useEffect(() => {
    const fetchCollegeAboutData = async () => {
      try {
        if (universityId) {
          const storedData = localStorage.getItem(`university_${universityId}`);
          if (storedData) {
            setCollegeAboutData(JSON.parse(storedData));
            setDataSource('local storage'); // Update the data source state
            console.log("Data fetched from local storage");
          } else {
            const universityDocRef = doc(firestore, 'universities', universityId);
            const universityDocSnapshot = await getDoc(universityDocRef);
            if (universityDocSnapshot.exists()) {
              const data = universityDocSnapshot.data();
              setCollegeAboutData(data);
              localStorage.setItem(`university_${universityId}`, JSON.stringify(data));
              setDataSource('Firestore'); // Update the data source state
              console.log("Data fetched from Firestore");
            } else {
              console.log('University document not found');
            }
          }
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
