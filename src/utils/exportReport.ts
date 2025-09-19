import { supabase } from './supabaseClient';
import { exportReport } from './exportReport';

async function exportAllBuildingsReports() {
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