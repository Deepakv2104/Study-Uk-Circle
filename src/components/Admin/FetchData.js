// import React, { useEffect, useState } from 'react';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
// import { initializeApp } from 'firebase/app';
// import { firestore } from '../firebase';
// import * as XLSX from 'xlsx';
// import download from 'downloadjs';

// const DownloadExcel = () => {
//     const [formData, setFormData] = useState([]);

//     useEffect(() => {
//       const fetchData = async () => {
//         const querySnapshot = await getDocs(collection(firestore, "form"));
//         const data = querySnapshot.docs.map(doc => doc.data());
//         setFormData(data);
//       };
//       fetchData();
//     }, []);
  
//     const exportToJson = () => {
//       const jsonString = JSON.stringify(formData, null, 2); // Pretty print JSON with 2-space indentation
//       const blob = new Blob([jsonString], { type: 'application/json' });
//       download(blob, 'FormData.json', 'application/json');
//     };
  
//     return (
//       <div>
//         <button onClick={exportToJson}>Download JSON</button>
//       </div>
//     );
//   };



// export default DownloadExcel;
