import React, { useState, useRef } from 'react';

const BabyeyiLetter = () => {
    const [content, setContent] = useState('');
    const editorRef = useRef(null);

    // Toolbar button configurations
    const toolbarButtons = [
        { 
            icon: 'B', 
            style: 'font-weight: bold', 
            command: () => document.execCommand('bold', false, null) 
        },
        { 
            icon: 'I', 
            style: 'font-style: italic', 
            command: () => document.execCommand('italic', false, null) 
        },
        { 
            icon: 'U', 
            style: 'text-decoration: underline', 
            command: () => document.execCommand('underline', false, null) 
        }
    ];

    const handleContentChange = () => {
        if (editorRef.current) {
            setContent(editorRef.current.innerHTML);
        }
    };

    const handleSave = () => {
        if (content.trim()) {
            alert("Letter content saved successfully!");
            console.log("Saved Content:", content);
        } else {
            alert("Please enter some content before saving.");
        }
    };

    const handleClear = () => {
        if (editorRef.current) {
            editorRef.current.innerHTML = '';
            setContent('');
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-black">Babyeyi Letter</h2>
            
            {/* Toolbar */}
            <div className="mb-2 flex space-x-2">
                {toolbarButtons.map((button, index) => (
                    <button
                        key={index}
                        onClick={button.command}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
                        style={{ fontWeight: button.style.includes('bold') ? 'bold' : 'normal' }}
                    >
                        {button.icon}
                    </button>
                ))}
            </div>

            {/* Editor */}
            <div 
                ref={editorRef}
                contentEditable={true}
                onInput={handleContentChange}
                className="w-full min-h-[300px] border rounded p-2 mb-4 text-black" // Ensures content appears black
                placeholder="Enter your letter content here"
                suppressContentEditableWarning={true} // Prevent React warnings about contentEditable
                style={{ color: 'black' }} // Additional inline style to ensure black text
            ></div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={handleClear}
                >
                    Clear
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleSave}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default BabyeyiLetter;
