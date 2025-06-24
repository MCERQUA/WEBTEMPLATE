export default function TestTailwind() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tailwind CSS Test Page</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Colors Test</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary-500 text-white p-4 rounded">Primary 500</div>
            <div className="bg-primary-600 text-white p-4 rounded">Primary 600</div>
            <div className="bg-primary-700 text-white p-4 rounded">Primary 700</div>
            <div className="bg-secondary-500 text-white p-4 rounded">Secondary 500</div>
            <div className="bg-secondary-600 text-white p-4 rounded">Secondary 600</div>
            <div className="bg-secondary-700 text-white p-4 rounded">Secondary 700</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Typography Test</h2>
          <p className="text-gray-600 mb-2">This is a paragraph with default text.</p>
          <p className="text-primary-500 mb-2">This is primary colored text.</p>
          <p className="text-secondary-500 mb-2">This is secondary colored text.</p>
          <p className="font-bold mb-2">This is bold text.</p>
          <p className="italic mb-2">This is italic text.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Layout Test</h2>
          <div className="flex gap-4 mb-4">
            <div className="flex-1 bg-gray-200 p-4 rounded">Flex Item 1</div>
            <div className="flex-1 bg-gray-300 p-4 rounded">Flex Item 2</div>
            <div className="flex-1 bg-gray-400 p-4 rounded">Flex Item 3</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-200 p-4 rounded">Grid Item 1</div>
            <div className="bg-blue-300 p-4 rounded">Grid Item 2</div>
            <div className="bg-blue-400 p-4 rounded">Grid Item 3</div>
            <div className="bg-blue-500 text-white p-4 rounded">Grid Item 4</div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Button Test</h2>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
              Primary Button
            </button>
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-2 px-4 rounded">
              Secondary Button
            </button>
            <button className="border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded">
              Outline Button
            </button>
            <button className="text-gray-700 hover:bg-gray-100 font-bold py-2 px-4 rounded">
              Ghost Button
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}