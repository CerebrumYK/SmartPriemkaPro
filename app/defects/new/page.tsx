"use client"

import { useState } from 'react';
import { ArrowLeft, Camera } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTranslation } from 'react-i18next';

export default function NewDefectPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    location: '',
    defectType: '',
    severity: '',
    normative: '',
    comment: '',
    photo: null as File | null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with actual Supabase insert
    console.log('Saving defect:', formData);
    
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Navigate back to object detail
    router.push('/objects/1');
  };

  const handleCancel = () => {
    router.back();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
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
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">New Defect</h1>
          <p className="text-muted-foreground">Add a new defect to the inspection</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Defect Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                  <SelectItem value="living-room">Living Room</SelectItem>
                  <SelectItem value="bedroom-1">Bedroom 1</SelectItem>
                  <SelectItem value="bedroom-2">Bedroom 2</SelectItem>
                  <SelectItem value="bathroom">Bathroom</SelectItem>
                  <SelectItem value="corridor">Corridor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Defect Type */}
            <div className="space-y-2">
              <Label htmlFor="defectType">Defect Type</Label>
              <Select value={formData.defectType} onValueChange={(value) => setFormData(prev => ({ ...prev, defectType: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select defect type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="paint-defect">Paint Defect</SelectItem>
                  <SelectItem value="plumbing-issue">Plumbing Issue</SelectItem>
                  <SelectItem value="electrical-issue">Electrical Issue</SelectItem>
                  <SelectItem value="tile-issue">Tile Issue</SelectItem>
                  <SelectItem value="structural-issue">Structural Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label htmlFor="photo">Photo</Label>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('photo-input')?.click()}
                  className="flex items-center space-x-2"
                >
                  <Camera className="h-4 w-4" />
                  <span>{formData.photo ? 'Change Photo' : 'Take Photo'}</span>
                </Button>
                {formData.photo && (
                  <span className="text-sm text-muted-foreground">{formData.photo.name}</span>
                )}
              </div>
              <input
                id="photo-input"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePhotoUpload}
              />
            </div>

            {/* Normative */}
            <div className="space-y-2">
              <Label htmlFor="normative">Normative Reference</Label>
              <Input
                id="normative"
                placeholder="Enter normative reference (e.g., SNIP 3.04.01-87)"
                value={formData.normative}
                onChange={(e) => setFormData(prev => ({ ...prev, normative: e.target.value }))}
              />
            </div>

            {/* Severity */}
            <div className="space-y-2">
              <Label>Severity Level</Label>
              <div className="flex space-x-4">
                {[
                  { value: 'low', label: 'Low', color: 'emerald' },
                  { value: 'medium', label: 'Medium', color: 'amber' },
                  { value: 'high', label: 'High', color: 'rose' },
                ].map((severity) => (
                  <label key={severity.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="severity"
                      value={severity.value}
                      checked={formData.severity === severity.value}
                      onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value }))}
                      className="text-primary"
                    />
                    <span className={`text-sm font-medium text-${severity.color}-600`}>
                      {severity.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                placeholder="Describe the defect in detail..."
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
              />
            </div>

            {/* Actions */}
            <div className="flex space-x-4 pt-4">
              <Button type="submit" className="flex-1">
                Save Defect
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}