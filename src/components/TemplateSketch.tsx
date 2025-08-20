interface TemplateSketchProps {
  templateId: number;
}

const TemplateSketch = ({ templateId }: TemplateSketchProps) => {
  // Modern Professional Template
  if (templateId === 1) {
    return (
      <div className="p-4 h-full bg-white text-gray-400 text-xs">
        <div className="border-b-2 border-blue-300 pb-2 mb-3">
          <div className="h-3 bg-gray-300 rounded mb-1 w-3/4"></div>
          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
          <div className="h-2 bg-gray-200 rounded w-2/3 mt-1"></div>
        </div>
        <div className="mb-3">
          <div className="h-2 bg-blue-200 rounded w-1/3 mb-1"></div>
          <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
          <div className="h-1 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="mb-3">
          <div className="h-2 bg-blue-200 rounded w-1/2 mb-1"></div>
          <div className="h-1 bg-gray-300 rounded w-2/3 mb-0.5"></div>
          <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
          <div className="h-1 bg-gray-200 rounded w-4/5"></div>
        </div>
        <div>
          <div className="h-2 bg-blue-200 rounded w-1/3 mb-1"></div>
          <div className="h-1 bg-gray-300 rounded w-1/2 mb-0.5"></div>
          <div className="h-1 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  // Classic Executive Template
  if (templateId === 2) {
    return (
      <div className="p-4 h-full bg-white text-gray-400 text-xs">
        <div className="text-center border-b border-gray-400 pb-3 mb-3">
          <div className="h-4 bg-gray-400 rounded mb-2 w-2/3 mx-auto"></div>
          <div className="h-1 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
        <div className="mb-3">
          <div className="h-1 bg-gray-400 rounded w-1/2 mb-1 uppercase"></div>
          <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
          <div className="h-1 bg-gray-200 rounded w-5/6"></div>
        </div>
        <div className="mb-3">
          <div className="h-1 bg-gray-400 rounded w-2/3 mb-1 uppercase"></div>
          <div className="h-1 bg-gray-300 rounded w-1/2 mb-0.5"></div>
          <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
          <div className="h-1 bg-gray-200 rounded w-4/5"></div>
        </div>
        <div>
          <div className="h-1 bg-gray-400 rounded w-1/3 mb-1 uppercase"></div>
          <div className="h-1 bg-gray-300 rounded w-2/5 mb-0.5"></div>
        </div>
      </div>
    );
  }

  // Creative Designer Template
  if (templateId === 3) {
    return (
      <div className="p-4 h-full bg-gradient-to-br from-purple-50 to-pink-50 text-gray-400 text-xs">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-purple-200 rounded-full mr-2"></div>
          <div>
            <div className="h-2 bg-purple-300 rounded w-16 mb-0.5"></div>
            <div className="h-1 bg-gray-300 rounded w-12"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <div className="h-1 bg-purple-200 rounded w-full mb-1"></div>
            <div className="h-1 bg-gray-200 rounded w-3/4 mb-0.5"></div>
            <div className="h-1 bg-gray-200 rounded w-full"></div>
          </div>
          <div>
            <div className="h-1 bg-purple-200 rounded w-2/3 mb-1"></div>
            <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
            <div className="h-1 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
        <div className="h-8 bg-purple-100 rounded mb-2"></div>
        <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
        <div className="h-1 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  // Tech Minimalist Template
  if (templateId === 4) {
    return (
      <div className="p-4 h-full bg-white text-gray-400 text-xs border-l-4 border-green-400">
        <div className="mb-4">
          <div className="h-3 bg-gray-800 rounded w-1/2 mb-1"></div>
          <div className="flex space-x-2">
            <div className="h-1 bg-green-300 rounded w-8"></div>
            <div className="h-1 bg-green-300 rounded w-10"></div>
            <div className="h-1 bg-green-300 rounded w-12"></div>
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="h-1 bg-gray-800 rounded w-1/4 mb-1"></div>
            <div className="ml-2">
              <div className="h-1 bg-gray-300 rounded w-1/3 mb-0.5"></div>
              <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
              <div className="h-1 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
          <div>
            <div className="h-1 bg-gray-800 rounded w-1/3 mb-1"></div>
            <div className="ml-2">
              <div className="h-1 bg-gray-300 rounded w-2/5 mb-0.5"></div>
              <div className="h-1 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Corporate Standard Template
  if (templateId === 5) {
    return (
      <div className="p-4 h-full bg-blue-50 text-gray-400 text-xs">
        <div className="bg-blue-800 text-white p-2 -m-4 mb-3">
          <div className="h-3 bg-blue-200 rounded w-1/2 mb-1"></div>
          <div className="h-1 bg-blue-300 rounded w-3/4"></div>
        </div>
        <div className="space-y-2">
          <div>
            <div className="h-1 bg-blue-600 rounded w-1/3 mb-1"></div>
            <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
            <div className="h-1 bg-gray-200 rounded w-5/6"></div>
          </div>
          <div>
            <div className="h-1 bg-blue-600 rounded w-2/5 mb-1"></div>
            <div className="h-1 bg-gray-300 rounded w-1/2 mb-0.5"></div>
            <div className="h-1 bg-gray-200 rounded w-full"></div>
          </div>
          <div>
            <div className="h-1 bg-blue-600 rounded w-1/4 mb-1"></div>
            <div className="h-1 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Academic Scholar Template
  if (templateId === 6) {
    return (
      <div className="p-4 h-full bg-amber-50 text-gray-400 text-xs border-t-4 border-amber-600">
        <div className="text-center mb-3">
          <div className="h-3 bg-amber-800 rounded w-2/3 mx-auto mb-1"></div>
          <div className="h-1 bg-amber-600 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="space-y-2 text-justify">
          <div>
            <div className="h-1 bg-amber-700 rounded w-1/2 mb-1"></div>
            <div className="h-1 bg-gray-200 rounded w-full mb-0.5"></div>
            <div className="h-1 bg-gray-200 rounded w-5/6 mb-0.5"></div>
            <div className="h-1 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div>
            <div className="h-1 bg-amber-700 rounded w-2/5 mb-1"></div>
            <div className="h-1 bg-gray-300 rounded w-1/3 mb-0.5"></div>
            <div className="h-1 bg-gray-200 rounded w-full"></div>
          </div>
          <div>
            <div className="h-1 bg-amber-700 rounded w-1/3 mb-1"></div>
            <div className="h-1 bg-gray-300 rounded w-2/5"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default TemplateSketch;