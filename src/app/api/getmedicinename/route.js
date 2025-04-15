import { NextResponse } from 'next/server';
import medicine from '@/models/medicinemodel';
import {connect} from '@/dbConfig/dbConfig';

connect()


// export async function GET(request) {
//     const { searchParams } = new URL(request.url);
//         const name = searchParams.get('name');

//         console.log("name for backend url",name)

//         if (!name) {
//             return NextResponse.json({ error: 'Medicine name is required' }, { status: 400 });
//         }

//     try {       
           
//             const medicineData = await medicine.findOne({ 
//                 name: { $regex: new RegExp(name, 'i') } 
//             });
    
//             if (!medicineData) {
//                 return NextResponse.json(
//                     { error: 'Medicine not found' },
//                     { status: 404 }
//                 );
//             }
    
//             console.log("medicine data",medicineData)
//             return NextResponse.json(medicineData);
        
//     } catch (error) {
//          console.error('Error fetching medicine:', error);
//                 return NextResponse.json(
//                     { error: 'Failed to fetch medicine data' },
//                     { status: 500 }
//                 );
       
//     }
// }

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('search');  // We will use 'search' to get either name or barcode

    console.log("Search query for backend:", searchText);

    if (!searchText) {
        return NextResponse.json({ error: 'Search term (name or barcode) is required' }, { status: 400 });
    }

    try {
        // Search by name or barcode (case-insensitive)
        const medicineData = await medicine.findOne({
            $or: [
                { name: { $regex: new RegExp(searchText, 'i') } },  // Case-insensitive search for name
                { barcode: { $regex: new RegExp(searchText, 'i') } } // Case-insensitive search for barcode
            ]
        });

        if (!medicineData) {
            return NextResponse.json(
                { error: 'Medicine not found' },
                { status: 404 }
            );
        }

        console.log("Medicine data:", medicineData);
        return NextResponse.json(medicineData);

    } catch (error) {
        console.error('Error fetching medicine:', error);
        return NextResponse.json(
            { error: 'Failed to fetch medicine data' },
            { status: 500 }
        );
    }
}
