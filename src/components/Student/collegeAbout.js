import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase';

const CollegeAbout = () => {
  const universityId = "1Ck6BKqP67QGQWlPNQHh"
  const [collegeAboutData, setCollegeAboutData] = useState(null);

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
              <strong>About Oxford University</strong><br />
              One of the most distinguished schools in the study abroad domain, the University of Oxford is a unique and historic institution that is documented as being the oldest English university in the world. The University of Oxford is located in the city of Oxford, which is at a short distance to the west of London. The city is known for being an important British and European center for arts, sciences, technology, and innovation. According to the QS World Rankings, Oxford University has a ranking of #3. The Oxford University fees in Indian Rupees for UG is INR 35.6 L and for a PG course, it is INR 31.4 L.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Established</TableCell>
            <TableCell>{collegeAboutData.collegeAbout.established}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell>{collegeAboutData.collegeAbout.location}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>{collegeAboutData.collegeAbout.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ranking</TableCell>
            <TableCell>{collegeAboutData.collegeAbout.ranking}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Students</TableCell>
            <TableCell>{collegeAboutData.collegeAbout.totalStudents}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>{collegeAboutData.collegeAbout.type}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollegeAbout;
