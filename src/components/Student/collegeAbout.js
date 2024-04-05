import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


// Define styles

const CollegeAbout = ({universityData}) => {
// Apply styles
console.log('inside about ',universityData)
  // Data array with key-value pairs
  const data = [
    { column1: 'Location', column2: 'Oxford, United Kingdom' },
    { column1: 'Established', column2: '1096' },
    { column1: 'Type', column2: 'Public' },
    { column1: 'Ranking', column2: '#3 in QS World University Rankings' },
    { column1: 'Total Students', column2: 'Over 24,000' },
  ];
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
           
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} >
              <strong>About Oxford University</strong><br />
              One of the most distinguished schools in the study abroad domain, the University of Oxford is a unique and historic institution that is documented as being the oldest English university in the world. The University of Oxford is located in the city of Oxford, which is at a short distance to the west of London. The city is known for being an important British and European center for arts, sciences, technology, and innovation. According to the QS World Rankings, Oxford University has a ranking of #3. The Oxford University fees in Indian Rupees for UG is INR 35.6 L and for a PG course, it is INR 31.4 L.
            </TableCell>
          </TableRow>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell >{row.column1}</TableCell>
              <TableCell >{row.column2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollegeAbout;
