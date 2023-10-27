import { DocketObject } from '@/models/DocketObject.model';
import { useUserDocsData } from '@/docs/retrieve/UserDocsDataProvider';
import Link from 'next/link';


export default function DynamicNavbar() {
  const { userDocsData , handleUpdateUserDocsData } = useUserDocsData();
  return (
    <nav className="text-left">
      <ul>
        {userDocsData.currDocketObjects.map((docket: DocketObject, index: number) => (
          <li key={index}>
            <a>Testacsdasdc</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}