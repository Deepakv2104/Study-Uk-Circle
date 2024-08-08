import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firestore } from '../../firebase';
import * as XLSX from 'xlsx';
import download from 'downloadjs';

const DownloadExcel = () => {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(firestore, "mentorshipForm"));
            const seenEmails = new Set();
            const uniqueData = [];

            querySnapshot.docs.forEach(doc => {
                const docData = doc.data();
                if (docData.email && !seenEmails.has(docData.email)) {
                    seenEmails.add(docData.email);

                    // Format the timestamp to ISO 8601 string if available
                    if (docData.timestamp) {
                        docData.timestamp = new Date(docData.timestamp.seconds * 1000).toISOString();
                    }

                    uniqueData.push(docData);
                }
            });

            setFormData(uniqueData);
        };
        fetchData();
    }, []);

    const exportToJson = () => {
        const jsonString = JSON.stringify(formData, null, 2); // Pretty print JSON with 2-space indentation
        const blob = new Blob([jsonString], { type: 'application/json' });
        download(blob, 'FormData.json', 'application/json');
    };

    return (
        <div>
            <button onClick={exportToJson}>Download JSON</button>
        </div>
    );
};

export default DownloadExcel;
