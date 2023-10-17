import React from 'react';
import { useDocketObject } from '@/create/DocketDataProvider';
export default function ConvertEnv() {
    const { docketObject , handleUpdateDocketObject } = useDocketObject();
    
    return (
    <button
        type="button"
        className="bg-blue-800 text-white py-2 px-4 rounded hover-bg-gray-700 cursor-pointer mt-4"
        onClick={() => {window.location.reload();}}
    >
        Convert to Output
    </button>
    );
}