import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase'; // Import your Firebase instance

const Form = () => {
  const [collegeAboutData, setCollegeAboutData] = useState([{
    description: '',
    location: '',
    established: '',
    type: '',
    ranking: '',
    totalStudents: ''
  }]);

  const [coursesAndFeesData, setCoursesAndFeesData] = useState([
    { course: '', totalCourses: '', tuitionFees: '', durationAndEligibility: '' }
  ]);

  const handleCollegeAboutChange = (e) => {
    const { name, value } = e.target;
    setCollegeAboutData({ ...collegeAboutData, [name]: value });
  };

  const handleCoursesAndFeesChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...coursesAndFeesData];
    newData[index][name] = value;
    setCoursesAndFeesData(newData);
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setCollegeAboutData({ ...collegeAboutData, description: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToUpload = {
        collegeAbout: collegeAboutData,
        coursesAndFees: coursesAndFeesData
      };

      // Upload combined data
      const docRef = await addDoc(collection(firestore, 'universities'), dataToUpload);

      console.log('Data uploaded successfully!');
    } catch (error) {
      console.error('Error uploading data: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>College About</legend>
        <label>
          Description:
          <input type="text" name="description" value={collegeAboutData.description} onChange={handleDescriptionChange} />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={collegeAboutData.location} onChange={handleCollegeAboutChange} />
        </label>
        <label>
          Established:
          <input type="text" name="established" value={collegeAboutData.established} onChange={handleCollegeAboutChange} />
        </label>
        <label>
          Type:
          <input type="text" name="type" value={collegeAboutData.type} onChange={handleCollegeAboutChange} />
        </label>
        <label>
          Ranking:
          <input type="text" name="ranking" value={collegeAboutData.ranking} onChange={handleCollegeAboutChange} />
        </label>
        <label>
          Total Students:
          <input type="text" name="totalStudents" value={collegeAboutData.totalStudents} onChange={handleCollegeAboutChange} />
        </label>
      </fieldset>

      <hr />

      <fieldset>
        <legend>Courses and Fees</legend>
        {coursesAndFeesData.map((course, index) => (
          <div key={index}>
            <label>
              Course:
              <input type="text" name="course" value={course.course} onChange={(e) => handleCoursesAndFeesChange(e, index)} />
            </label>
            <label>
              Total Courses:
              <input type="text" name="totalCourses" value={course.totalCourses} onChange={(e) => handleCoursesAndFeesChange(e, index)} />
            </label>
            <label>
              1st Year Tuition Fees:
              <input type="text" name="tuitionFees" value={course.tuitionFees} onChange={(e) => handleCoursesAndFeesChange(e, index)} />
            </label>
            <label>
              Duration & Eligibility:
              <input type="text" name="durationAndEligibility" value={course.durationAndEligibility} onChange={(e) => handleCoursesAndFeesChange(e, index)} />
            </label>
          </div>
        ))}
        <button type="button" onClick={() => setCoursesAndFeesData([...coursesAndFeesData, { course: '', totalCourses: '', tuitionFees: '', durationAndEligibility: '' }])}>
          Add Course
        </button>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
