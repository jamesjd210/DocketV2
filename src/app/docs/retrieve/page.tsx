"use client"
import RetriveDataForm from '@/docs//retrieve/(retrievecomponents)/RetrieveDataForm';
import DynamicNavbar  from '@/docs/retrieve/(retrievecomponents)/DynamicNavbar';
import { useUserDocsData } from '@/docs/retrieve/UserDocsDataProvider';
export default function Page() {
    const { userDocsData , handleUpdateUserDocsData } = useUserDocsData();
    //if user has not submitted the form
    if (!userDocsData.currSubmitStatus) {
        return (
            <RetriveDataForm/>
        )
    }

    else {
        return (
            <div className="w-full mx-auto mt-20 flex justify-between">
                <div className="w-1/3">
                    {/* Content for the first column */}
                    testslf;dsjfs;a
                </div>
                <div className="w-1/3">
                    {/* Content for the second column */}
                    Testasdfasdfaf
                </div>
                <div className="w-1/3">
                    Test
                    asdfasdfasdfasdf
                </div>
            </div>
        );
    }
}