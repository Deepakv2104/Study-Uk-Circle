import React from 'react';
import {useParams} from 'react-router-dom'
// import { firestore } from "../../firebase";
// import {
//   doc,
//   getDoc,
//   updateDoc,
//   collection,
//   query,
//   where,
//   getDocs,
//   onSnapshot,
// } from "firebase/firestore";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CoursesAndFees = ({coursesData}) => {
  // const [coursesData, setCoursesData] = useState([]);

  // Data array with course information
  // const courseData = [
  //   { course: 'MS', coursesCount: 44, tuitionFees: 'INR 26 L - 50 L', duration: '9 months-3 years', examAccepted: 'IELTS: 7 - 7.5' },
  //   { course: 'MBA/PGDM', coursesCount: 5, tuitionFees: 'INR 29 L - 83 L', duration: '9-12 months', examAccepted: 'IELTS: 7.5 & Above, GRE, GMAT' },
  //   { course: 'M.A.', coursesCount: 53, tuitionFees: 'INR 26 L - 31 L', duration: '9 months-2 years', examAccepted: 'IELTS: 7.5 & Above' },
  //   { course: 'M.Phil', coursesCount: 51, tuitionFees: 'INR 26 L - 33 L', duration: '21 months-2 years', examAccepted: 'IELTS: 7.5 & Above' },
  //   { course: 'B.Sc.', coursesCount: 22, tuitionFees: 'INR 29 L - 47 L', duration: '3-4 years', examAccepted: 'IELTS: 7 - 7.5, PTE: 76 & Above' },
  //   { course: 'B.A.', coursesCount: 30, tuitionFees: 'INR 29 L - 47 L', duration: '21 months-5 years', examAccepted: 'IELTS: 7.5 & Above, PTE: 76 & Above' },
  //   { course: 'Others PG', coursesCount: 21, tuitionFees: 'INR 26 L - 33 L', duration: '9-12 months', examAccepted: 'IELTS: 7.5 & Above' },
  //   { course: 'MIM', coursesCount: 4, tuitionFees: 'INR 29 L - 56 L', duration: '9-12 months', examAccepted: 'IELTS: 7.5 & Above, GRE, GMAT' },
  //   { course: 'B.E. / B.Tech', coursesCount: 5, tuitionFees: 'INR 38 L - 47 L', duration: '3-4 years', examAccepted: 'IELTS: 7 - 7.5, PTE: 66 - 76' },
  //   { course: 'LL.M.', coursesCount: 6, tuitionFees: 'INR 26 L - 48 L', duration: '9 months-1 year', examAccepted: 'IELTS: 7.5 & Above' },
  //   { course: 'LL.B.', coursesCount: 2, tuitionFees: 'INR 30 L - 37 L', duration: '3-4 years', examAccepted: 'IELTS: 7.5 & Above, PTE: 76 & Above' },
  //   { course: 'BBA', coursesCount: 1, tuitionFees: 'INR 39 L', duration: '3 years', examAccepted: 'IELTS: 7.5 & Above, PTE: 76 & Above' },
  //   { course: 'MBBS', coursesCount: 1, tuitionFees: 'INR 42 L', duration: '6 years', examAccepted: 'IELTS: 7.5 & Above, PTE: 76 & Above' },
  //   { course: 'PG Diploma', coursesCount: 5, tuitionFees: 'INR 14 L - 31 L', duration: '8 months-1 year', examAccepted: 'IELTS: 7 - 7.5' },
  //   { course: 'BFA', coursesCount: 1, tuitionFees: 'INR 37 L', duration: '3 years', examAccepted: 'IELTS: 7.5 & Above, PTE: 76 & Above' },
  //   { course: 'MFA', coursesCount: 1, tuitionFees: 'INR 33 L', duration: '9 months', examAccepted: 'IELTS: 7.5 & Above' },
  //   { course: 'Ph.D.', coursesCount: 1, tuitionFees: 'INR 19 L', duration: '3 years', examAccepted: 'IELTS: 7.5 & Above' },
  //   { course: 'PG Certificate', coursesCount: 1, tuitionFees: 'INR 31 L', duration: '12 months', examAccepted: 'IELTS' },
  // ];
  // const {universityId} = useParams();

  // useEffect(() => {
  //   const fetchCoursesData = async () => {
  //     try {
  //       const universityDocRef = doc(firestore, 'universities', universityId);
  //       const universityDocSnapshot = await getDoc(universityDocRef);
  //       if (universityDocSnapshot.exists()) {
  //         setCoursesData(universityDocSnapshot.data());
  //       } else {
  //         console.log('University document not found');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching college about data:', error);
  //     }
  //   };

  //   fetchCoursesData();
  //   console.log(coursesData)
  // }, [universityId]);

  return (
<div className="bg-gray-800 text-white rounded-lg shadow-md p-4">
    <table className="w-full">
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


  );
};

export default CoursesAndFees;
