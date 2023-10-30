"use client"
import { createContext, useContext, useState } from 'react';
import { UserDocsData } from '@/models/UserDocsData.model';
import { DocketObject } from '@/models/DocketObject.model';

interface UserDocsDataContextProps {
    userDocsData : UserDocsData
    handleUpdateUserDocsData : (    
        currEndpoint : string,
        currSubmitStatus : boolean,
        currDocketObjects : DocketObject[],
        ) => void;
}

const UserDocsDataContext = createContext<UserDocsDataContextProps | undefined>(undefined);

export function useUserDocsData() {
    const context = useContext(UserDocsDataContext);
    if(!context) {
        throw new Error('useDocket Data must be used within a DataProvider')
    }
    return context;
}

export function UserDocsDataProvider({children,} : {children: React.ReactNode}) {
    //default values for initial context
    const [userDocsData, setUserDocsData] = useState<UserDocsData>({
        id : "",
        currEndpoint : "",
        currSubmitStatus : false,
        currDocketObjects : [],
    });

    function handleUpdateUserDocsData (newEnpoint : string, newSubmitStatus : boolean, newDocketObjects : DocketObject[], ) {
        setUserDocsData((prevValues) => ({
            ...prevValues,
            currEndpoint : newEnpoint,
            currSubmitStatus : newSubmitStatus,
            currDocketObjects : newDocketObjects,
        }));
    }

    return (
        <UserDocsDataContext.Provider
        value = {{ userDocsData, handleUpdateUserDocsData }}>
        {children}

        </UserDocsDataContext.Provider>
    );
}