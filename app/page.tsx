import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to auth page since this is the entry point
  redirect('/auth');
}
