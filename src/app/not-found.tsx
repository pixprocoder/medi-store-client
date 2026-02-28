import { Button } from "@/components/ui/button";
import Link from "next/link";

function NotFoundPage() {
    return (
        <div>
            Page not found
            <Button asChild>
                <Link href="/">Back to Home</Link>
            </Button>
        </div>
    );
}

export default NotFoundPage;
