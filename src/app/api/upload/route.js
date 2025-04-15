import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Medicine from '@/models/medicinemodel';

// Establish database connection with error handling
try {
    await connect();
    console.log('Connected to MongoDB');
} catch (error) {
    console.error('MongoDB connection error:', error);
}

// export async function POST(request) {
//     try {
//         const formData = await request.formData();
//         const qrUrl = formData.get('qrUrl');

//         if (!qrUrl) {
//             return NextResponse.json(
//                 { error: 'QR URL is required' },
//                 { status: 400 }
//             );
//         }

//         // Here you can add your logic to process the QR URL
//         // For example, fetching medicine information from a database
//         // or validating the QR code

//         // Example response
//         const medicineInfo = {
//             qrUrl: qrUrl,
//             timestamp: new Date().toISOString(),
//             status: 'processed'
//         };

//         return NextResponse.json(
//             { success: true, data: medicineInfo },
//             { status: 200 }
//         );

//     } catch (error) {
//         console.error('Error processing QR URL:', error);
//         return NextResponse.json(
//             { error: 'Internal server error' },
//             { status: 500 }
//         );
//     }
// }

// export async function GET() {
//     return NextResponse.json(
//         { message: 'Please use POST method to submit QR URL' },
//         { status: 405 }
//     );
// }



// export async function POST(request) {
//     try {
//         const formData = await request.formData();
//         const barcode = formData.get('barcode');

//         if (!barcode) {
//             return NextResponse.json(
//                 { error: 'Barcode is required' },
//                 { status: 400 }
//             );
//         }

//         try {
//             // You should replace this with your actual database logic
//             const result = await db.medicine.find({
//                 data: {
//                     barcode: barcode,
//                     timestamp: new Date(),
//                 }
//             });

//             return NextResponse.json(
//                 {
//                     success: true,
//                     data: {
//                         barcode: result.barcode,
//                         timestamp: result.timestamp
//                     }
//                 },
//                 { status: 200 }
//             );
//         } catch (dbError) {
//             console.error('Database error:', dbError);
//             return NextResponse.json(
//                 { error: 'Failed to save to database' },
//                 { status: 500 }
//             );
//         }

//     } catch (error) {
//         console.error('Error processing request:', error);
//         return NextResponse.json(
//             { error: 'Internal server error' },
//             { status: 500 }
//         );
//     }
// }
export async function POST(request) {
    try {
        const formData = await request.formData();
        console.log("Form data received:", formData);
        const name = formData.get('name');
        const barcode = formData.get('barcode');
        
        if (!name || !barcode) {
            return NextResponse.json(
                { error: 'Name and barcode are required fields' },
                { status: 400 }
            );
        }

        const medicineCreated = await Medicine.create({
            name: name,
            barcode: barcode,
            description: formData.get('description'),
            price: formData.get('price'),
            dose: formData.get('dose'),
            expiry: formData.get('expiry'),
        });

        if (!medicineCreated) {
            return NextResponse.json(
                { error: "Failed to create medicine" },
                { status: 400 }
            );
        }
        console.log("Medicine created:", medicineCreated);

        return NextResponse.json(
            { success: true, data: medicineCreated },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { message: 'Please use POST method to submit barcode' },
        { status: 405 }
    );
}