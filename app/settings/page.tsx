    "use client"

import { useState } from 'react';
import { Plus, Edit, Trash2, Users, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'next-i18next';

// Mock data for settings
const mockLocations = [
  { id: '1', name: 'Kitchen', category: 'Living Space' },
  { id: '2', name: 'Living Room', category: 'Living Space' },
  { id: '3', name: 'Bedroom', category: 'Living Space' },
  { id: '4', name: 'Bathroom', category: 'Utilities' },
  { id: '5', name: 'Corridor', category: 'Common Areas' },
];

const mockDefectTypes = [
  { id: '1', name: 'Paint Defect', description: 'Issues with paint application or quality' },
  { id: '2', name: 'Plumbing Issue', description: 'Water-related problems' },
  { id: '3', name: 'Electrical Issue', description: 'Electrical system problems' },
  { id: '4', name: 'Tile Issue', description: 'Problems with tile installation or quality' },
];

const mockUsers = [
  { id: '1', email: 'admin@example.com', role: 'admin', name: 'John Admin', status: 'active' },
  { id: '2', email: 'inspector@example.com', role: 'inspector', name: 'Jane Inspector', status: 'active' },
  { id: '3', email: 'guest@example.com', role: 'guest', name: 'Bob Guest', status: 'active' },
];

const mockSeverityLevels = [
  { id: '1', name: 'Low', color: 'emerald', description: 'Minor issues that can be addressed later' },
  { id: '2', name: 'Medium', color: 'amber', description: 'Issues requiring attention' },
  { id: '3', name: 'High', color: 'rose', description: 'Critical issues requiring immediate attention' },
];

export default function SettingsPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('locations');

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="destructive">Admin</Badge>;
      case 'inspector':
        return <Badge variant="default">Inspector</Badge>;
      case 'guest':
        return <Badge variant="outline">Guest</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage system dictionaries and user access</p>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="defects">Defect Types</TabsTrigger>
          <TabsTrigger value="severity">Severity</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Locations Tab */}
        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5" />
                    Location Dictionary
                  </CardTitle>
                  <CardDescription>
                    Manage available locations for defect classification
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Location
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLocations.map((location) => (
                  <div key={location.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{location.name}</h3>
                      <p className="text-sm text-muted-foreground">{location.category}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Defect Types Tab */}
        <TabsContent value="defects" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5" />
                    Defect Types Dictionary
                  </CardTitle>
                  <CardDescription>
                    Manage defect categories and classifications
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Defect Type
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDefectTypes.map((defectType) => (
                  <div key={defectType.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{defectType.name}</h3>
                      <p className="text-sm text-muted-foreground">{defectType.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Severity Levels Tab */}
        <TabsContent value="severity" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5" />
                    Severity Levels Dictionary
                  </CardTitle>
                  <CardDescription>
                    Manage defect severity classifications
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Severity Level
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSeverityLevels.map((severity) => (
                  <div key={severity.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant={severity.color as any}>{severity.name}</Badge>
                      <div>
                        <p className="text-sm text-muted-foreground">{severity.description}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    User Management
                  </CardTitle>
                  <CardDescription>
                    Manage user accounts and access levels
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getRoleBadge(user.role)}
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}