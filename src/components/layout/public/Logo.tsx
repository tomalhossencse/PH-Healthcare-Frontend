import { HeartPlusIcon } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2 font-medium p-2">
        <span className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <HeartPlusIcon className="size-4" />
        </span>
        <span>PH Healthcare</span>
      </Link>
    </div>
  );
}
