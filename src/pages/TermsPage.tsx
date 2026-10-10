import React from "react";

export const TermsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-20 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B132B]">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: October 2026 • RR Academia & Industry Connect
        </p>

        <div className="space-y-6 text-sm text-slate-700 leading-relaxed pt-4 border-t border-slate-200">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B132B]">1. Institutional Agreement</h2>
            <p>
              By accessing the RR Academia & Industry Connect website or submitting an institutional request, you agree to these Terms of Service and any formal Memorandum of Understanding (MoU) executed between your institution and RR Academia.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B132B]">2. Scope of Advisory Services</h2>
            <p>
              RR Academia & Industry Connect delivers strategic educational consulting, curriculum modernization frameworks, faculty development, and placement drives. All outcomes are governed by collaborative mutual engagement and institution-specific roadmaps.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B132B]">3. Intellectual Property</h2>
            <p>
              All logos, curriculum frameworks, proprietary assessment blueprints, and website media assets remain the intellectual property of RR Academia & Industry Connect and their respective corporate/academic partners.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-[#0B132B]">4. Inquiries & Governance</h2>
            <p>
              Direct all official legal or partnership inquiries to <strong className="text-[#0B132B]">contact@rracademiaindustry.com</strong>, Hyderabad, Telangana, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
