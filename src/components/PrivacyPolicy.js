import React from 'react';
import NewNav from './NewNav';
import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <div>
        <NewNav/>
  <div className="bg-gray-900 text-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4"><strong>Effective Date:</strong> [Insert Date]</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
          <p>Welcome to WorldLynk! We value your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://worldlynk.co.uk" className="text-blue-400">https://worldlynk.co.uk</a> and use our services. By using our services, you agree to the collection and use of information in accordance with this policy.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
          <h3 className="text-xl font-semibold mb-1">Personal Data</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Contact Information: Name, email address, phone number</li>
            <li>Identification Information: Passport number, visa details</li>
            <li>Academic Information: University details, course information</li>
            <li>Employment Information: Part-time job details, employer information</li>
            <li>Usage Data: Login details, browsing history, preferences</li>
            <li>Location Data: Geolocation information for accommodation and event guidance</li>
          </ul>
          <h3 className="text-xl font-semibold mb-1">Non-Personal Data</h3>
          <ul className="list-disc list-inside">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Referring website</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
          <ul className="list-disc list-inside">
            <li><strong>To Provide Services:</strong> Personalize university insights, accommodation solutions, part-time job opportunities, and event guidance.</li>
            <li><strong>To Improve Our Services:</strong> Analyze usage to enhance user experience.</li>
            <li><strong>To Communicate with You:</strong> Send updates, newsletters, and promotional materials.</li>
            <li><strong>To Comply with Legal Obligations:</strong> Verify your identity, process transactions, and ensure compliance with applicable laws.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Sharing Your Information</h2>
          <ul className="list-disc list-inside">
            <li><strong>With Service Providers:</strong> Third-party vendors who perform services on our behalf.</li>
            <li><strong>For Legal Reasons:</strong> If required by law, or to protect our rights and safety.</li>
            <li><strong>With Your Consent:</strong> When you explicitly agree to share your information.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the following rights regarding your personal data:</p>
          <ul className="list-disc list-inside">
            <li><strong>Access:</strong> Request a copy of your personal data.</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong>Deletion:</strong> Request deletion of your personal data.</li>
            <li><strong>Objection:</strong> Object to the processing of your personal data.</li>
            <li><strong>Portability:</strong> Request transfer of your personal data to another entity.</li>
            <li><strong>Withdrawal of Consent:</strong> Withdraw consent at any time where we rely on your consent to process your data.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. Please review their privacy policies before providing any personal data.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Children's Privacy</h2>
          <p>Our services are not intended for individuals under the age of 13. We do not knowingly collect personal data from children under 13. If we become aware that we have collected personal data from a child under 13, we will take steps to delete such information.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
          <p>We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this privacy policy periodically for any changes.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p>If you have any questions about this privacy policy, please contact us at:</p>
          <address className="not-italic">
            <strong>WorldLynk</strong><br />
            Email: <a href="mailto:worldlynk76@gmail.com" className="text-blue-400">worldlynk76@gmail.com</a><br />
            Address: [Insert Company Address]
          </address>
        </section>
      </div>
    </div>
    <Footer/>
    </div>
  
  );
};

export default PrivacyPolicy;
