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
    <TableContainer component={Paper}>
      <Table aria-label="college-about-table">
        <TableBody>
        <TableRow>
            <TableCell colSpan={2} >
              <strong>About {collegeAboutData.collegeName}</strong><br />
             {collegeAboutData.description}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Established</TableCell>
            <TableCell>{collegeAboutData.established}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>{collegeAboutData.location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Exams Accepted</TableCell>
            <TableCell>{collegeAboutData.examsAccepted}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ranking</TableCell>
            <TableCell>{collegeAboutData.ranking}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Students</TableCell>
            <TableCell>{collegeAboutData.totalStudents}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>{collegeAboutData.scholarships}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollegeAbout;
