'use client'
import React, { useState, SyntheticEvent, useEffect } from 'react';
export default function Page() {
    const [companyName, setCompanyName] = useState<string>("");
    function handleInputChange(e: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.currentTarget;
        setCompanyName(value);
    }

    function handleClick() {
        //TODO fecth data from db
    }
    return (
        <div className = "flex flex-col items-center max-w-lg mx-auto mt-20">
            <div>
                <label className="text-sm font-bold mb-2 w-full mr-5">
                    Enter in Company Name:
                </label>
                <input
                type="text"
                name="companyNameBox"
                placeholder=""
                onChange={handleInputChange}
                className="block text-black w-64 p-2 border rounded-md focus:outline-none focus:border-blue-500"
                />

            </div>
            <div>
                <button
                    type="submit"
                    className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 cursor-pointer mx-auto mt-2"
                    form="user-form"
                    onClick={handleClick}
                    >
                    Fetch Data
                </button>
            </div>
        </div>
    );
}