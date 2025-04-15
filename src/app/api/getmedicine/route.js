import { NextResponse } from 'next/server';
import medicine from '@/models/medicinemodel';
import {connect} from '@/dbConfig/dbConfig';

connect()

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const barcode = searchParams.get('barcode');

    if (!barcode) {
        return NextResponse.json(
            { error: 'Barcode is required' },
            { status: 400 }
        );
    }

    try {
        // TODO: Add your database connection here (e.g., MongoDB, MySQL, etc.)
        // Example with a mock database call:
        // const medicineData = await fetchMedicineFromDatabase(barcode);
        const medicineData = await medicine.findOne({ barcode: barcode });

        if (!medicineData) {
            return NextResponse.json(
                { error: 'Medicine not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(medicineData);
    } catch (error) {
        console.error('Error fetching medicine:', error);
        return NextResponse.json(
            { error: 'Failed to fetch medicine data' },
            { status: 500 }
        );
    }
}

// async function fetchMedicineFromDatabase(barcode) {
//     // Replace this with actual database logic
//     // This is just a mock implementation
//     return {
//         barcode: barcode,
//         name: "Sample Medicine",
//         description: "Sample Description",
//         manufacturer: "Sample Manufacturer",
//         dosage: "Sample Dosage",
//         expiryDate: "2024-12-31"
//     };
// }
