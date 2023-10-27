import { DocketObject } from '@/models/DocketObject.model';
import { useUserDocsData } from '@/docs/retrieve/UserDocsDataProvider';
import Link from 'next/link';


export default function DynamicNavbar() {
  const { userDocsData , handleUpdateUserDocsData } = useUserDocsData();
  return (
    <nav className="text-left">
      <ul>
        {userDocsData.currDocketObjects.map((currDocketObject: DocketObject) => (
          <li key={currDocketObject._id}>
            <a>{currDocketObject.currApiRequest.url}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}