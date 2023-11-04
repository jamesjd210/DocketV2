import { useUserDocsData } from '@/docs/retrieve/UserDocsDataProvider';
import { useDocketObject } from '@/docs/DocketDataProvider';
import React, { useState } from 'react';
import Link from 'next/link';


export default function DynamicNavbar() {
  const { userDocsData , handleUpdateUserDocsData } = useUserDocsData();
  const { docketObject , handleUpdateNewDocketObject } = useDocketObject();
  
  function handleEndpointSelection(endpoint : string) {
    handleUpdateUserDocsData(endpoint, userDocsData.currSubmitStatus, userDocsData.currDocketObjects);
    const selectedDocket = userDocsData.currDocketObjects.find(docket => docket.currApiRequest.httpMethod + " " + docket.currApiRequest.url === endpoint);
    if (selectedDocket) {
      handleUpdateNewDocketObject(selectedDocket);
    }
    console.log(selectedDocket);
  }

  const endpointButtons = userDocsData.currDocketObjects.map((currDocketObject) => (
    <button
      value = {currDocketObject.currApiRequest.httpMethod + " " + currDocketObject.currApiRequest.url} 
      className = "bg-blue-800 text-white py-2 px-4 rounded hover-bg-gray-700 cursor-pointer mt-4"
      onClick={() => handleEndpointSelection(currDocketObject.currApiRequest.httpMethod + " " + currDocketObject.currApiRequest.url)} >
        {currDocketObject.currApiRequest.httpMethod + " " + currDocketObject.currApiRequest.url}
    </button>
  ));

  const endpointSelector = (
    <div>
        <h1 className="text-2xl font-bold mb-4">API</h1>
        <div className='mt-4'>
            <label className="block text-sm font-medium">Select Endpoint:</label>
            <div className="flex flex-wrap">{endpointButtons}</div>
        </div>
    </div>
  );

  return (
    <>
    {endpointSelector}
    </>
  );
}