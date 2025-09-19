import { supabase } from './supabaseClient';

// TODO: Implement exportReport function
async function exportReport(params: { building_name: string; address: string }) {
    console.log('Export report for:', params);
    // Implementation pending
}

export async function exportAllBuildingsReports() {
    const { data: buildings } = await supabase.from('buildings').select('*');
    if (buildings) {
        for (const building of buildings) {
            await exportReport({
                building_name: building.name,
                address: building.address,
            });
        }
    }
}