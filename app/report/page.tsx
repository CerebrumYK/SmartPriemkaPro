"use client"

import { useState } from 'react';
import { FileText, Download, Image, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const mockObjects = [
	{
		id: '1',
		title: 'Жилой комплекс Альфа',
		address: 'ул. Главная, 123, Москва',
		status: 'in_progress',
		defectCount: 12,
		completedRooms: 8,
		totalRooms: 15,
	},
	{
		id: '2',
		title: 'Торговый центр Бета',
		address: 'пр. Свободы, 45, Санкт-Петербург',
		status: 'completed',
		defectCount: 5,
		completedRooms: 5,
		totalRooms: 5,
	},
	{
		id: '3',
		title: 'Офисное здание Гамма',
		address: 'ул. Ленина, 78, Новосибирск',
		status: 'in_progress',
		defectCount: 20,
		completedRooms: 10,
		totalRooms: 30,
	},
	{
		id: '4',
		title: 'Складской комплекс Дельта',
		address: 'шоссе Энтузиастов, 10, Екатеринбург',
		status: 'not_started',
		defectCount: 0,
		completedRooms: 0,
		totalRooms: 20,
	},
	{
		id: '5',
		title: 'Завод Жетысу',
		address: 'ул. Заводская, 5, Алматы',
		status: 'completed',
		defectCount: 2,
		completedRooms: 2,
		totalRooms: 2,
	},
];

export default function ReportPage() {
	const [includePhotos, setIncludePhotos] = useState(true);
	const [includeResolved, setIncludeResolved] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);

	const handleExport = async (format: 'docx' | 'pdf' | 'xlsx') => {
		setIsGenerating(true);

		// TODO: Replace with actual export API calls
		console.log(`Exporting report as ${format.toUpperCase()}`, {
			includePhotos,
			includeResolved,
		});

		// Simulate export process
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Simulate file download
		console.log(`${format.toUpperCase()} report generated successfully`);

		setIsGenerating(false);
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div>
				<h1 className="text-2xl font-bold text-foreground">Export Reports</h1>
				<p className="text-muted-foreground">
					Generate and export inspection reports in various formats
				</p>
			</div>

			{/* Export Options */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center">
						<Settings className="mr-2 h-5 w-5" />
						Export Settings
					</CardTitle>
					<CardDescription>
						Configure what to include in your reports
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							id="include-photos"
							checked={includePhotos}
							onChange={(e) => setIncludePhotos(e.target.checked)}
							className="rounded border-gray-300"
						/>
						<Label
							htmlFor="include-photos"
							className="flex items-center cursor-pointer"
						>
							<Image className="mr-2 h-4 w-4" />
							Include photos in reports
						</Label>
					</div>

					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							id="include-resolved"
							checked={includeResolved}
							onChange={(e) => setIncludeResolved(e.target.checked)}
							className="rounded border-gray-300"
						/>
						<Label
							htmlFor="include-resolved"
							className="cursor-pointer"
						>
							Include resolved defects
						</Label>
					</div>
				</CardContent>
			</Card>

			{/* Export Formats */}
			<div className="grid gap-4 md:grid-cols-3">
				{/* DOCX Export */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center">
							<FileText className="mr-2 h-5 w-5" />
							DOCX Report
						</CardTitle>
						<CardDescription>
							Detailed inspection report in Microsoft Word format
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="text-sm text-muted-foreground space-y-1 mb-4">
							<li>• Comprehensive defect details</li>
							<li>• Professional formatting</li>
							<li>• Photo integration</li>
							<li>• Ready for sharing</li>
						</ul>
						<Button
							onClick={() => handleExport('docx')}
							disabled={isGenerating}
							className="w-full"
						>
							<Download className="mr-2 h-4 w-4" />
							{isGenerating ? 'Generating...' : 'Export DOCX'}
						</Button>
					</CardContent>
				</Card>

				{/* PDF Export */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center">
							<FileText className="mr-2 h-5 w-5" />
							PDF Report
						</CardTitle>
						<CardDescription>
							Portable inspection report in PDF format
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="text-sm text-muted-foreground space-y-1 mb-4">
							<li>• Universal compatibility</li>
							<li>• Print-ready format</li>
							<li>• Embedded photos</li>
							<li>• Secure and archivable</li>
						</ul>
						<Button
							onClick={() => handleExport('pdf')}
							disabled={isGenerating}
							variant="outline"
							className="w-full"
						>
							<Download className="mr-2 h-4 w-4" />
							{isGenerating ? 'Generating...' : 'Export PDF'}
						</Button>
					</CardContent>
				</Card>

				{/* XLSX Export */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center">
							<FileText className="mr-2 h-5 w-5" />
							XLSX Spreadsheet
						</CardTitle>
						<CardDescription>
							Data export in Excel spreadsheet format
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ul className="text-sm text-muted-foreground space-y-1 mb-4">
							<li>• Structured data format</li>
							<li>• Easy data analysis</li>
							<li>• Sortable and filterable</li>
							<li>• Compatible with Excel</li>
						</ul>
						<Button
							onClick={() => handleExport('xlsx')}
							disabled={isGenerating}
							variant="outline"
							className="w-full"
						>
							<Download className="mr-2 h-4 w-4" />
							{isGenerating ? 'Generating...' : 'Export XLSX'}
						</Button>
					</CardContent>
				</Card>
			</div>

			{/* Report Summary */}
			<Card>
				<CardHeader>
					<CardTitle>Report Summary</CardTitle>
					<CardDescription>
						Overview of data to be included in reports
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
						<div>
							<div className="text-2xl font-bold text-foreground">
								{mockObjects.length}
							</div>
							<div className="text-sm text-muted-foreground">
								Total Objects
							</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-destructive">
								{mockObjects.reduce(
									(sum, obj) =>
										sum +
										(obj.status === 'in_progress'
											? obj.defectCount
											: 0),
									0
								)}
							</div>
							<div className="text-sm text-muted-foreground">
								Open Defects
							</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-emerald-600">
								{mockObjects.reduce(
									(sum, obj) =>
										sum +
										(obj.status === 'completed'
											? obj.defectCount
											: 0),
									0
								)}
							</div>
							<div className="text-sm text-muted-foreground">
								Resolved Defects
							</div>
						</div>
						<div>
							<div className="text-2xl font-bold text-foreground">
								{mockObjects.reduce(
									(sum, obj) => sum + obj.totalRooms,
									0
								)}
							</div>
							<div className="text-sm text-muted-foreground">
								Total Rooms
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}