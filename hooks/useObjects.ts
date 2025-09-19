"use client"

import { useState, useEffect } from 'react';

export interface PropertyObject {
  id: string;
  title: string;
  address: string;
  status: 'in_progress' | 'done' | 'pending';
  defectCount: number;
  completedRooms: number;
  totalRooms: number;
  createdAt: string;
  updatedAt: string;
}

// Mock data - TODO: Replace with Supabase queries
const mockObjects: PropertyObject[] = [
  {
    id: '1',
    title: 'Residential Complex Alpha',
    address: '123 Main St, Moscow',
    status: 'in_progress',
    defectCount: 12,
    completedRooms: 8,
    totalRooms: 15,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    title: 'Office Building Beta', 
    address: '456 Business Ave, Moscow',
    status: 'done',
    defectCount: 3,
    completedRooms: 25,
    totalRooms: 25,
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
  },
];

export function useObjects() {
  const [objects, setObjects] = useState<PropertyObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    const fetchObjects = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        setObjects(mockObjects);
        setError(null);
      } catch (err) {
        setError('Failed to load objects');
        console.error('Error fetching objects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchObjects();
  }, []);

  // TODO: Implement with Supabase
  const createObject = async (data: Partial<PropertyObject>) => {
    console.log('TODO: Create object with Supabase', data);
    // Simulate optimistic update
    const newObject: PropertyObject = {
      id: Date.now().toString(),
      title: data.title || '',
      address: data.address || '',
      status: 'pending',
      defectCount: 0,
      completedRooms: 0,
      totalRooms: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    setObjects(prev => [...prev, newObject]);
    return newObject;
  };

  const updateObject = async (id: string, data: Partial<PropertyObject>) => {
    console.log('TODO: Update object with Supabase', id, data);
    setObjects(prev => 
      prev.map(obj => 
        obj.id === id 
          ? { ...obj, ...data, updatedAt: new Date().toISOString() }
          : obj
      )
    );
  };

  return {
    objects,
    loading,
    error,
    createObject,
    updateObject,
  };
}