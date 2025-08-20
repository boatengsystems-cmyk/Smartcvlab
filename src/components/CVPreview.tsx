interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    nationality: string;
    dateOfBirth: string;
    linkedin: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    graduationDate: string;
    description?: string;
  }>;
  skills: string[];
  languages: Array<{
    id: string;
    language: string;
    proficiency: string;
  }>;
  customSections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

interface CVPreviewProps {
  data: CVData;
  templateId: string;
}

const CVPreview = ({ data, templateId }: CVPreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString + "-01");
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long" 
    });
  };

  const renderMultilineOrList = (text: string, templateId: string, baseClassName?: string) => {
    if (!text || !text.trim()) return null;
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const isList = lines.some(l => /^[-*•]\s+/.test(l) || /^\d+\.\s+/.test(l)) || lines.length > 1;
    
    if (isList) {
      const items = lines.map(l => l.replace(/^[-*•]\s?/, "").replace(/^\d+\.\s?/, ""));
      
      // Template-specific list styling configurations
      const listConfigurations = {
        "1": "list-disc ml-6 space-y-2 text-gray-700 marker:text-blue-500", // Modern Professional
        "2": "list-disc ml-5 space-y-1 text-gray-700 text-sm marker:text-gray-600", // Classic Executive
        "3": "list-disc ml-6 space-y-2 text-gray-700 marker:text-indigo-500", // Creative Modern
        "4": "list-disc ml-4 space-y-1 text-gray-700 text-sm marker:text-gray-400", // Minimalist
        "5": "list-disc ml-5 space-y-2 text-gray-700 marker:text-gray-800", // Corporate
        "6": "list-disc ml-6 space-y-2 text-gray-700 marker:text-purple-500", // Colorful
      };
      
      const listClassName = listConfigurations[templateId as keyof typeof listConfigurations] || "list-disc ml-5 space-y-1 text-gray-700";
      
      return (
        <ul className={baseClassName ? `${baseClassName} ${listClassName}` : listClassName}>
          {items.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      );
    }
    return <p className={baseClassName ? `${baseClassName} whitespace-pre-line` : "whitespace-pre-line"}>{text}</p>;
  };

  // Modern Professional Template
  if (templateId === "1") {
    return (
      <div className="bg-white text-black p-8 shadow-medium rounded-lg max-w-[8.5in] mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-gray-600 space-y-1">
            {data.personalInfo.email && (
              <p>✉ {data.personalInfo.email}</p>
            )}
            {data.personalInfo.phone && (
              <p>📞 {data.personalInfo.phone}</p>
            )}
            {data.personalInfo.location && (
              <p>📍 {data.personalInfo.location}</p>
            )}
            {data.personalInfo.nationality && (
              <p>🌍 {data.personalInfo.nationality}</p>
            )}
            {data.personalInfo.dateOfBirth && (
              <p>📅 {new Date(data.personalInfo.dateOfBirth).toLocaleDateString()}</p>
            )}
            {data.personalInfo.linkedin && (
              <p>🔗 {data.personalInfo.linkedin}</p>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-blue-500 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.summary}
            </p>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {edu.degree || "Degree"}
                      </h3>
                      <p className="text-gray-700 font-medium">
                        {edu.institution || "Institution"}
                        {edu.location && ` • ${edu.location}`}
                      </p>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {edu.startDate || edu.graduationDate ? (
                        <>
                          {edu.startDate ? formatDate(edu.startDate) : ""}
                          {edu.startDate ? " - " : ""}
                          {edu.graduationDate ? formatDate(edu.graduationDate) : "Present"}
                        </>
                      ) : null}
                    </div>
                  </div>
                  {edu.description && (
                    <div className="mt-2">
                      {renderMultilineOrList(edu.description, templateId, "leading-relaxed")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {exp.jobTitle || "Job Title"}
                      </h3>
                      <p className="text-gray-700 font-medium">
                        {exp.company || "Company Name"}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                    <div className="text-gray-600 text-sm text-right">
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </div>
                  </div>
                  {exp.description && (
                    renderMultilineOrList(exp.description, templateId, "leading-relaxed")
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
              Languages
            </h2>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">{lang.language}</span>
                  <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {data.customSections && data.customSections.length > 0 && (
          <>
            {data.customSections.map((section) => (
              <section key={section.id} className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b-2 border-blue-500 pb-1">
                  {section.title || "Additional Information"}
                </h2>
                {renderMultilineOrList(section.content, templateId, "text-gray-700 leading-relaxed")}
              </section>
            ))}
          </>
        )}
      </div>
    );
  }

  // Classic Executive Template  
  if (templateId === "2") {
    return (
      <div className="bg-white text-black p-8 shadow-medium rounded-lg max-w-[8.5in] mx-auto">
        {/* Header */}
        <header className="text-center mb-8 pb-6 border-b-2 border-gray-800">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-gray-600 text-sm space-x-4">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>• {data.personalInfo.phone}</span>}
            {data.personalInfo.location && <span>• {data.personalInfo.location}</span>}
            {data.personalInfo.nationality && <span>• {data.personalInfo.nationality}</span>}
            {data.personalInfo.dateOfBirth && <span>• {new Date(data.personalInfo.dateOfBirth).toLocaleDateString()}</span>}
          </div>
        </header>

        {/* Professional Summary */}
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-serif font-bold text-gray-900 mb-3 uppercase tracking-wide">
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {edu.degree || "Degree"}
                      </h3>
                      <p className="text-gray-700 italic">
                        {edu.institution || "Institution"}
                        {edu.location && `, ${edu.location}`}
                      </p>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {edu.startDate || edu.graduationDate ? (
                        <>
                          {edu.startDate ? formatDate(edu.startDate) : ""}
                          {edu.startDate ? " - " : ""}
                          {edu.graduationDate ? formatDate(edu.graduationDate) : "Present"}
                        </>
                      ) : null}
                    </div>
                  </div>
                  {edu.description && (
                    <div className="mt-2">
                      {renderMultilineOrList(edu.description, templateId, "leading-relaxed")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8 cv-section">
            <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase tracking-wide cv-section-header">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="cv-entry">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {exp.jobTitle || "Job Title"}
                      </h3>
                      <p className="text-gray-700 italic">
                        {exp.company || "Company Name"}
                        {exp.location && `, ${exp.location}`}
                      </p>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
                    </div>
                  </div>
                  {exp.description && (
                    renderMultilineOrList(exp.description, templateId, "leading-relaxed")
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Core Competencies
            </h2>
            <div className="text-gray-700 text-sm">
              {data.skills.join(' • ')}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Languages
            </h2>
            <div className="text-gray-700 text-sm space-y-1">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-gray-600">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {data.customSections && data.customSections.length > 0 && (
          <>
            {data.customSections.map((section) => (
              <section key={section.id} className="mb-8">
                <h2 className="text-lg font-serif font-bold text-gray-900 mb-4 uppercase tracking-wide">
                  {section.title || "Additional Information"}
                </h2>
                {renderMultilineOrList(section.content, templateId, "text-gray-700 leading-relaxed text-sm")}
              </section>
            ))}
          </>
        )}
      </div>
    );
  }

  // Creative Modern Template
  if (templateId === "3") {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 p-8 shadow-medium rounded-lg max-w-[8.5in] mx-auto">
        {/* Header */}
        <header className="text-center mb-8 pb-6 border-b-2 border-indigo-300">
          <h1 className="text-4xl font-bold text-indigo-900 mb-3">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-indigo-700 space-y-1">
            {data.personalInfo.email && <p>📧 {data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>📱 {data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p>📍 {data.personalInfo.location}</p>}
            {data.personalInfo.linkedin && <p>🔗 {data.personalInfo.linkedin}</p>}
          </div>
        </header>

        {/* Summary */}
        {data.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-indigo-900 mb-3 border-l-4 border-indigo-500 pl-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-indigo-900 mb-4 border-l-4 border-indigo-500 pl-3">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-indigo-800">{exp.jobTitle}</h3>
                  <span className="text-sm text-indigo-600">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
                </div>
                <p className="text-indigo-700 mb-2">{exp.company}</p>
                {exp.description && renderMultilineOrList(exp.description, templateId, "text-sm")}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-indigo-900 mb-4 border-l-4 border-indigo-500 pl-3">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3 bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-indigo-800">{edu.degree}</h3>
                    <p className="text-indigo-700">{edu.institution}</p>
                  </div>
                  <div className="text-sm text-indigo-600">
                    {edu.startDate || edu.graduationDate ? (
                      <>
                        {edu.startDate ? formatDate(edu.startDate) : ""}
                        {edu.startDate ? " - " : ""}
                        {edu.graduationDate ? formatDate(edu.graduationDate) : "Present"}
                      </>
                    ) : null}
                  </div>
                </div>
                {edu.description && (
                  <div className="mt-2">
                    {renderMultilineOrList(edu.description, templateId, "text-sm")}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-indigo-900 mb-3 border-l-4 border-indigo-500 pl-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-indigo-200 text-indigo-800 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-indigo-900 mb-3 border-l-4 border-indigo-500 pl-3">Languages</h2>
            <div className="grid grid-cols-2 gap-2">
              {data.languages.map((lang, index) => (
                <div key={index} className="bg-white p-2 rounded shadow-sm">
                  <span className="font-medium text-indigo-800">{lang.language}</span>
                  <span className="text-indigo-600 ml-2">({lang.proficiency})</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {data.customSections && data.customSections.length > 0 && (
          <>
            {data.customSections.map((section, index) => (
              <section key={index} className="mb-6">
                <h2 className="text-xl font-bold text-indigo-900 mb-3 border-l-4 border-indigo-500 pl-3">{section.title}</h2>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  {renderMultilineOrList(section.content, templateId, "text-gray-700")}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    );
  }

  // Minimalist Template
  if (templateId === "4") {
    return (
      <div className="bg-white text-black p-8 shadow-medium rounded-lg max-w-[8.5in] mx-auto border-l-8 border-gray-800">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-light text-gray-900 mb-4">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-gray-600 text-sm space-y-1 border-t border-gray-300 pt-4">
            {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
            {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
          </div>
        </header>

        {/* Summary */}
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Summary</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6 border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-900">{exp.jobTitle}</h3>
                  <span className="text-xs text-gray-500">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
                {exp.description && renderMultilineOrList(exp.description, templateId, "text-sm leading-relaxed")}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4 border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                  </div>
                  {(edu.startDate || edu.graduationDate) && <span className="text-xs text-gray-500">{edu.startDate ? `${formatDate(edu.startDate)} - ` : ""}{edu.graduationDate ? formatDate(edu.graduationDate) : "Present"}</span>}
                </div>
                {edu.description && (
                  <div className="mt-2">
                    {renderMultilineOrList(edu.description, templateId, "text-sm leading-relaxed")}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Skills</h2>
            <div className="text-sm text-gray-700">
              {data.skills.join(' • ')}
            </div>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">Languages</h2>
            <div className="text-sm text-gray-700">
              {data.languages.map((lang, index) => (
                <span key={index}>
                  {lang.language} ({lang.proficiency})
                  {index < data.languages.length - 1 && ' • '}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {data.customSections && data.customSections.length > 0 && (
          <>
            {data.customSections.map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wide">{section.title}</h2>
                {renderMultilineOrList(section.content, templateId, "text-gray-700 text-sm leading-relaxed")}
              </section>
            ))}
          </>
        )}
      </div>
    );
  }

  // Corporate Template
  if (templateId === "5") {
    return (
      <div className="bg-white text-black p-8 shadow-medium rounded-lg max-w-[8.5in] mx-auto">
        {/* Header */}
        <header className="bg-gray-900 text-white p-6 -m-8 mb-8 rounded-t-lg">
          <h1 className="text-3xl font-bold mb-3">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="text-gray-300 grid grid-cols-2 gap-4 text-sm">
            {data.personalInfo.email && <p>Email: {data.personalInfo.email}</p>}
            {data.personalInfo.phone && <p>Phone: {data.personalInfo.phone}</p>}
            {data.personalInfo.location && <p>Location: {data.personalInfo.location}</p>}
            {data.personalInfo.nationality && <p>Nationality: {data.personalInfo.nationality}</p>}
            {data.personalInfo.dateOfBirth && <p>Date of Birth: {new Date(data.personalInfo.dateOfBirth).toLocaleDateString()}</p>}
            {data.personalInfo.linkedin && <p>LinkedIn: {data.personalInfo.linkedin}</p>}
          </div>
        </header>

        {/* Summary */}
        {data.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900">Executive Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-6 cv-section">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-900 cv-section-header">Professional Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-5 cv-entry">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-600 font-medium">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
                </div>
                {exp.description && renderMultilineOrList(exp.description, templateId, "text-sm leading-relaxed")}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-6 cv-section">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-900 cv-section-header">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3 cv-entry">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                  </div>
                  {(edu.startDate || edu.graduationDate) && <span className="text-gray-600">{edu.startDate ? `${formatDate(edu.startDate)} - ` : ""}{edu.graduationDate ? formatDate(edu.graduationDate) : "Present"}</span>}
                </div>
                {edu.description && (
                  <div className="mt-2">
                    {renderMultilineOrList(edu.description, templateId, "leading-relaxed")}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900">Core Competencies</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {data.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900">Languages</h2>
              <ul className="text-gray-700 space-y-1">
                {data.languages.map((lang, index) => (
                  <li key={index}>{lang.language} - {lang.proficiency}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Custom Sections */}
        {data.customSections && data.customSections.length > 0 && (
          <>
            {data.customSections.map((section, index) => (
              <section key={index} className="mb-6 mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-gray-900">{section.title}</h2>
                {renderMultilineOrList(section.content, templateId, "text-gray-700")}
              </section>
            ))}
          </>
        )}
      </div>
    );
  }

  // Colorful Template
  if (templateId === "6") {
    return (
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 text-gray-800 p-8 shadow-medium rounded-lg max-w-[8.5in] mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-xl mb-6">
            <h1 className="text-4xl font-bold mb-3">
              {data.personalInfo.fullName || "Your Name"}
            </h1>
            <div className="text-purple-100 space-y-1">
              {data.personalInfo.email && <p>✉ {data.personalInfo.email}</p>}
              {data.personalInfo.phone && <p>📞 {data.personalInfo.phone}</p>}
              {data.personalInfo.location && <p>📍 {data.personalInfo.location}</p>}
              {data.personalInfo.linkedin && <p>🔗 {data.personalInfo.linkedin}</p>}
            </div>
          </div>
        </header>

        {/* Summary */}
        {data.summary && (
          <section className="mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-purple-500">
              <h2 className="text-xl font-bold text-purple-700 mb-3">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-6 cv-section">
            <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center cv-section-header">Work Experience</h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4 bg-white rounded-lg p-6 shadow-sm border-l-4 border-pink-500 cv-entry">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-pink-700">{exp.jobTitle}</h3>
                  <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</span>
                </div>
                <p className="text-pink-600 font-medium mb-2">{exp.company}</p>
                {exp.description && renderMultilineOrList(exp.description, templateId, "text-sm")}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-6 cv-section">
            <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center cv-section-header">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-3 bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-500 cv-entry">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-red-700">{edu.degree}</h3>
                    <p className="text-red-600">{edu.institution}</p>
                  </div>
                  {(edu.startDate || edu.graduationDate) && <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">{edu.startDate ? `${formatDate(edu.startDate)} - ` : ""}{edu.graduationDate ? formatDate(edu.graduationDate) : "Present"}</span>}
                </div>
                {edu.description && (
                  <div className="mt-2">
                    {renderMultilineOrList(edu.description, templateId, "text-sm")}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-purple-700 mb-3 text-center">Skills</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-purple-700 mb-3 text-center">Languages</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm space-y-2">
                {data.languages.map((lang, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium text-purple-700">{lang.language}</span>
                    <span className="text-sm text-pink-600 bg-pink-100 px-2 py-1 rounded">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Custom Sections */}
        {data.customSections && data.customSections.length > 0 && (
          <>
            {data.customSections.map((section, index) => (
              <section key={index} className="mb-6 mt-6">
                <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-gradient-to-b from-purple-500 to-pink-500">
                  <h2 className="text-xl font-bold text-purple-700 mb-3">{section.title}</h2>
                  {renderMultilineOrList(section.content, templateId, "text-gray-700")}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    );
  }

  // Default fallback template
  return (
    <div className="bg-white text-black p-8 shadow-medium rounded-lg max-w-[8.5in] mx-auto">
      <div className="text-center text-gray-500 py-20">
        <p>Template preview will appear here once you start filling in your details.</p>
        <p className="text-sm mt-2">Selected template: {templateId}</p>
      </div>
    </div>
  );
};

export default CVPreview;