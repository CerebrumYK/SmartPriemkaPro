"use client"

import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for dashboard
const mockObjects = [
  {
    id: '1',
    title: 'Residential Complex Alpha',
    address: '123 Main St, Moscow',
    status: 'in_progress',
    defectCount: 12,
    completedRooms: 8,
    totalRooms: 15,
  },
  {
    id: '2', 
    title: 'Office Building Beta',
    address: '456 Business Ave, Moscow',
    status: 'done',
    defectCount: 3,
    completedRooms: 25,
    totalRooms: 25,
  },
  {
    id: '3',
    title: 'Shopping Center Gamma',
    address: '789 Commerce Blvd, Moscow', 
    status: 'in_progress',
    defectCount: 28,
    completedRooms: 5,
    totalRooms: 12,
  },
];

export default function DashboardPage() {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredObjects = mockObjects.filter(obj => 
    statusFilter === 'all' || obj.status === statusFilter
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'done':
        return <Badge variant="low">Complete</Badge>;
      case 'in_progress':
        return <Badge variant="medium">In Progress</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Objects</h1>
          <p className="text-muted-foreground">Manage your property inspections</p>
        </div>
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Objects</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Complete</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Object
          </Button>
        </div>
      </div>

      {/* Objects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredObjects.map((object) => (
          <Card key={object.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{object.title}</CardTitle>
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
        ))}
      </div>

      {/* Empty State */}
      {filteredObjects.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No objects found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {statusFilter === 'all' 
              ? 'Create your first inspection object to get started.'
              : `No objects with status "${statusFilter}" found.`
            }
          </p>
        </div>
      )}
    </div>
  );
}