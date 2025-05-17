import Link from 'next/link';
import { Box } from 'lucide-react'; // Changed from Cube to Box

export function Logo() {
  return (
    <Link href="/" className="flex items-center text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
      <Box className="mr-2 h-6 w-6" /> {/* Changed from Cube to Box */}
      Ninetech
    </Link>
  );
}
