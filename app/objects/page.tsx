"use client"

import { useState } from 'react';
import { Plus, Search, Building2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useObjects } from '@/hooks/useObjects';

export default function ObjectsPage() {
  const { objects, loading, error } = useObjects();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredObjects = objects.filter(obj => 
    obj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    obj.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'done':
        return <Badge variant="low">Complete</Badge>;
      case 'in_progress':
        return <Badge variant="medium">In Progress</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-muted-foreground">Loading objects...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-destructive">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Objects</h1>
          <p className="text-muted-foreground">Browse and manage all property inspection objects</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Object
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search objects by name or address..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Objects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredObjects.map((object) => (
          <Link key={object.id} href={`/objects/${object.id}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Building2 className="mr-2 h-5 w-5" />
                    {object.title}
                  </CardTitle>
                  {getStatusBadge(object.status)}
                </div>
                <p className="text-sm text-muted-foreground">{object.address}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Rooms Progress:</span>
                    <span>{object.completedRooms}/{object.totalRooms}</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(object.completedRooms / object.totalRooms) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Open Defects:</span>
                    <span className={object.defectCount > 0 ? "text-destructive" : "text-muted-foreground"}>
                      {object.defectCount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredObjects.length === 0 && !loading && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No objects found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {searchQuery 
              ? `No objects match "${searchQuery}". Try a different search term.`
              : 'Create your first inspection object to get started.'
            }
          </p>
        </div>
      )}
    </div>
  );
}