import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="page">
      <div className="wrap">
        <header className="page__head">
          <h1>Off the sheet</h1>
          <p>
            This address is not on the map. It may have moved, or it may never have been surveyed.
          </p>
          <Link href="/" className="more">
            Back to the sheet
            <ArrowIcon className="icon" />
          </Link>
        </header>
      </div>
    </div>
  );
}
