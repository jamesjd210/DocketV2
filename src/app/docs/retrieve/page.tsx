"use client"
import RetriveDataForm from '@/docs//retrieve/(retrievecomponents)/RetrieveDataForm';
import DynamicNavbar  from '@/docs/retrieve/(retrievecomponents)/DynamicNavbar';
import { useUserDocsData } from '@/docs/retrieve/UserDocsDataProvider';
import ApiSandbox from '@/docs/create/(ApiSandbox)/ApiSandbox';
export default function Page() {
    const { userDocsData , } = useUserDocsData();
    //if user has not submitted the form
    if (!userDocsData.currSubmitStatus) {
        return (
            <RetriveDataForm/>
        )
    }

    else {
        return (
            <div className="w-full columns-3 gap-8 mx-auto mt-20 flex justify-between">
                <div className="w-1/3 max-w-xs whitespace-normal">
                    {/* Content for the first column */}
                    <DynamicNavbar/>
                </div>
                <div className="w-1/3 max-w-xs whitespace-normal">
                    {/* Content for the second column */}
                    <ApiSandbox/>
                </div>
                <div className="w-1/3 max-w-xs whitespace-normal">
                    Test
                    asdfasdfasdfasdfdfdfdfdf
                </div>
            </div>
        );
    }
}