import React from 'react';

interface DownloadDocProps {
    documentContent : string;
}

export default function DownloadDoc(props : DownloadDocProps) {

    function handleDownloadClick() {
        const blob = new Blob([props.documentContent], { type : 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "markdown_content.md";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
    };
    return (
        <button onClick={handleDownloadClick} className="btn-download bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 cursor-pointer mt-4 mb-4">
          Download Markdown
        </button>
    );

};