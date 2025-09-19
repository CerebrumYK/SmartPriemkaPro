"use client"

import { useState } from 'react';
import { Filter, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for gallery
const mockPhotos = [
  { id: '1', url: '/placeholder-1.jpg', room: 'kitchen', type: 'paint-defect', severity: 'medium', date: '2024-01-15' },
  { id: '2', url: '/placeholder-2.jpg', room: 'bedroom-1', type: 'plumbing-issue', severity: 'high', date: '2024-01-16' },
  { id: '3', url: '/placeholder-3.jpg', room: 'bathroom', type: 'tile-issue', severity: 'low', date: '2024-01-17' },
  { id: '4', url: '/placeholder-4.jpg', room: 'living-room', type: 'electrical-issue', severity: 'medium', date: '2024-01-18' },
  { id: '5', url: '/placeholder-5.jpg', room: 'corridor', type: 'paint-defect', severity: 'low', date: '2024-01-19' },
  { id: '6', url: '/placeholder-6.jpg', room: 'kitchen', type: 'structural-issue', severity: 'high', date: '2024-01-20' },
];

export default function GalleryPage() {
  const [roomFilter, setRoomFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [selectedPhotos, setSelectedPhotos] = useState<Set<string>>(new Set());

  const filteredPhotos = mockPhotos.filter(photo => {
    if (roomFilter !== 'all' && photo.room !== roomFilter) return false;
    if (typeFilter !== 'all' && photo.type !== typeFilter) return false;
    if (severityFilter !== 'all' && photo.severity !== severityFilter) return false;
    return true;
  });

  const togglePhotoSelection = (photoId: string) => {
    const newSelection = new Set(selectedPhotos);
    if (newSelection.has(photoId)) {
      newSelection.delete(photoId);
    } else {
      newSelection.add(photoId);
    }
    setSelectedPhotos(newSelection);
  };

  const handleDeleteSelected = () => {
    if (selectedPhotos.size === 0) return;
    
    // TODO: Implement actual deletion with Supabase
    console.log('Deleting photos:', Array.from(selectedPhotos));
    
    // Show confirmation dialog
    if (confirm(`Delete ${selectedPhotos.size} selected photos?`)) {
      // Simulate deletion
      setSelectedPhotos(new Set());
    }
  };

  const getSeverityBadge = (severity: string) => {
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Photo Gallery</h1>
          <p className="text-muted-foreground">Browse inspection photos and defect documentation</p>
        </div>
        {selectedPhotos.size > 0 && (
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download ({selectedPhotos.size})
            </Button>
            <Button variant="destructive" onClick={handleDeleteSelected}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({selectedPhotos.size})
            </Button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Select value={roomFilter} onValueChange={setRoomFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by room" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rooms</SelectItem>
            <SelectItem value="kitchen">Kitchen</SelectItem>
            <SelectItem value="living-room">Living Room</SelectItem>
            <SelectItem value="bedroom-1">Bedroom 1</SelectItem>
            <SelectItem value="bedroom-2">Bedroom 2</SelectItem>
            <SelectItem value="bathroom">Bathroom</SelectItem>
            <SelectItem value="corridor">Corridor</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="paint-defect">Paint Defect</SelectItem>
            <SelectItem value="plumbing-issue">Plumbing Issue</SelectItem>
            <SelectItem value="electrical-issue">Electrical Issue</SelectItem>
            <SelectItem value="tile-issue">Tile Issue</SelectItem>
            <SelectItem value="structural-issue">Structural Issue</SelectItem>
          </SelectContent>
        </Select>

        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredPhotos.map((photo) => (
          <Card 
            key={photo.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedPhotos.has(photo.id) ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => togglePhotoSelection(photo.id)}
          >
            <CardContent className="p-0">
              <div className="aspect-square bg-muted rounded-t-lg flex items-center justify-center">
                <span className="text-muted-foreground">Photo {photo.id}</span>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <div className="text-sm">
                    <p className="font-medium capitalize">{photo.room.replace('-', ' ')}</p>
                    <p className="text-muted-foreground capitalize">
                      {photo.type.replace('-', ' ')}
                    </p>
                  </div>
                  {getSeverityBadge(photo.severity)}
                </div>
                <p className="text-xs text-muted-foreground">{photo.date}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground">No photos found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            No photos match the current filter criteria.
          </p>
        </div>
      )}
    </div>
  );
}