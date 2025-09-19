"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace with actual Supabase authentication
    // Mock authentication logic for now
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // Mock role-based redirect
      const mockRole = email.includes('admin') ? 'admin' : 
                      email.includes('inspector') ? 'inspector' : 'guest';
      
      if (mockRole === 'admin') {
        router.push('/settings');
      } else if (mockRole === 'inspector') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">SmartPriemkaPro</CardTitle>
          <CardDescription className="text-center">
            Sign in to your property inspection account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Demo accounts:</p>
            <p>• admin@example.com (Admin access)</p>
            <p>• inspector@example.com (Inspector access)</p>
            <p>• guest@example.com (Read-only access)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}