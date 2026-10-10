import React from "react";

export const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B132B]">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: October 2026 • RR Academia & Industry Connect
        </p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed pt-4 border-t border-slate-200">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B132B]">1. Commitment to Data Privacy</h2>
            <p>
              RR Academia & Industry Connect (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting the privacy of educational institutions, university administrators, faculty members, and student cohorts who interact with our services and platforms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B132B]">2. Information We Collect</h2>
            <p>
              We collect information provided directly by institutional representatives, such as official names, institutional email addresses, phone numbers, department affiliations, and student enrollment estimates submitted through consultation forms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B132B]">3. Use of Information</h2>
            <p>
              Collected data is utilized exclusively for:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Assessing institutional partnership readiness and proposing tailored training roadmaps</li>
              <li>Coordinating student internship interviews and placement recruitment drives</li>
              <li>Delivering accreditation and curriculum advisory documentation</li>
              <li>Responding to direct enquiries and administrative communications</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B132B]">4. Non-Disclosure & Security</h2>
            <p>
              We do not sell, rent, or trade institutional or student data to external advertising networks. Industry partners receive student resumes and profiles strictly with explicit placement consent.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B132B]">5. Contact Us</h2>
            <p>
              For any questions regarding this Privacy Policy, please contact us at: <br />
              <strong className="text-[#0B132B]">Email:</strong> contact@rracademiaindustry.com <br />
              <strong className="text-[#0B132B]">Location:</strong> Hyderabad, Telangana, India
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
