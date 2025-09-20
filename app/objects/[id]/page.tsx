"use client"

import { useState } from 'react';
import { ArrowLeft, Plus, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'next-i18next';

// Mock data for object details
const mockObject = {
  id: '1',
  title: 'Residential Complex Alpha',
  address: '123 Main St, Moscow',
  status: 'in_progress',
};

const mockRooms = [
  { id: '1', name: 'Kitchen', defectCount: 3, maxSeverity: 'medium', completed: true },
  { id: '2', name: 'Living Room', defectCount: 0, maxSeverity: null, completed: true },
  { id: '3', name: 'Bedroom 1', defectCount: 5, maxSeverity: 'high', completed: false },
  { id: '4', name: 'Bedroom 2', defectCount: 2, maxSeverity: 'low', completed: false },
  { id: '5', name: 'Bathroom', defectCount: 1, maxSeverity: 'medium', completed: false },
  { id: '6', name: 'Corridor', defectCount: 0, maxSeverity: null, completed: true },
];

const mockDefects = [
  { id: '1', location: 'Kitchen', type: 'Paint defect', severity: 'medium', description: 'Paint peeling on wall' },
  { id: '2', location: 'Bedroom 1', type: 'Plumbing issue', severity: 'high', description: 'Pipe leak detected' },
  { id: '3', location: 'Bathroom', type: 'Tile issue', severity: 'low', description: 'Minor tile crack' },
];

export default function ObjectDetailPage() {
  const params = useParams();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('rooms');

  const getSeverityBadge = (severity: string | null) => {
    if (!severity) return <Badge variant="outline">No issues</Badge>;
    
    switch (severity) {
      case 'low':
        return <Badge variant="low">Low</Badge>;
      case 'medium':
        return <Badge variant="medium">Medium</Badge>;
      case 'high':
        return <Badge variant="high">High</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const mockObjects = [
    {
      id: '1',
      title: t('objectTitleAlpha'),
      address: t('objectAddressAlpha'),
      status: 'in_progress',
      defectCount: 12,
      completedRooms: 8,
      totalRooms: 15,
    },
    // ...
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{mockObject.title}</h1>
          <p className="text-muted-foreground flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            {mockObject.address}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="defects">Defects</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="report">Report</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Rooms ({mockRooms.length})</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Room
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockRooms.map((room) => (
              <Card key={room.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    {room.completed && <Badge variant="low">Complete</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Defects:</span>
                      <span className={room.defectCount > 0 ? "text-destructive" : "text-muted-foreground"}>
                        {room.defectCount}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Max Severity:</span>
                      {getSeverityBadge(room.maxSeverity)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="defects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Defects ({mockDefects.length})</h2>
            <Link href="/defects/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Defect
              </Button>
            </Link>
          </div>
          <div className="space-y-4">
            {mockDefects.map((defect) => (
              <Card key={defect.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{defect.type}</h3>
                      <p className="text-sm text-muted-foreground">{defect.location}</p>
                    </div>
                    {getSeverityBadge(defect.severity)}
                  </div>
                  <p className="text-sm">{defect.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <h2 className="text-lg font-semibold">Photo Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Placeholder for gallery items */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">Photo {item}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          <h2 className="text-lg font-semibold">Generate Report</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">Generate inspection reports for this object.</p>
              <div className="space-y-2">
                <Button className="w-full sm:w-auto">Export to DOCX</Button>
                <Button variant="outline" className="w-full sm:w-auto">Export to PDF</Button>
                <Button variant="outline" className="w-full sm:w-auto">Export to XLSX</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}