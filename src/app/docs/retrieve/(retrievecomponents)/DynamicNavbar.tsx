import { DocketObject } from '@/models/DocketObject.model';
import Link from 'next/link';

interface DynamicNavbarProps {
  docketObjects: DocketObject[];
}

export default function DynamicNavbar(props: DynamicNavbarProps) {
  return (
    <nav className="text-left">
      <ul>
        {props.docketObjects.map((docket: DocketObject, index: number) => (
          <li key={index}>
            <a>Testacsdasdc</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}