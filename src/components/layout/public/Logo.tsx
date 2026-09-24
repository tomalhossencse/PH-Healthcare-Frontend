import { HeartPlusIcon } from "lucide-react";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 font-medium p-2">
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <HeartPlusIcon className="size-4" />
            </div>
            PH Healthcare
        </Link>
    );
}
