"use client";
import { useEffect, useState, useRef } from "react";
import { BrowserMultiFormatReader, mScannerView } from '@zxing/browser';
import { toast } from 'react-hot-toast';
import Tesseract from "tesseract.js";
import { useSpeech } from "react-text-to-speech";
import { Speaker, Pause, Square } from 'lucide-react';
import { useSpeechSynthesis } from 'react-speech-kit';


function Scanner({ setShowScanner }) {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const scannerRef = useRef(null);
    const { speak, cancel } = useSpeechSynthesis();

    const startCameraScanner = () => {
        return new Promise((resolve, reject) => {
            const codeReader = new BrowserMultiFormatReader();
            scannerRef.current = codeReader;
            setFetchedData(null)
            codeReader.decodeFromVideoDevice(
                undefined, // Use default camera
                'reader',
                async (result, error) => {
                    if (result) {
                        stopScanning();
                        console.log("Code detected:", result.text);
                        setScanResult(result.text);
                        // Stop scanning immediately after detection
                        await fetchQrData(result.text);
                    }
                    if (error && !(error instanceof Error)) {
                        console.error("Scanning error:", error);
                    }
                }
            ).then(() => {
                setIsScanning(true);
                resolve();
            }).catch(err => {
                setIsScanning(false);
                console.error("Camera initialization error:", err);
                reject(err);
            });
        });
    };

    const stopScanning = () => {
        setIsScanning(false);  // Set scanning state to false

        // If the scanner has a stop method (e.g., for barcode scanner)
        if (scannerRef.current && typeof scannerRef.current.stop === 'function') {
            scannerRef.current.stop();
        }

        // Stopping the video stream if it exists
        const videoElement = document.getElementById('reader');  // Assuming 'reader' is your video element ID
        if (videoElement) {
            const stream = videoElement.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());  // Stop all media tracks (video/audio)
            }
            videoElement.srcObject = null;  // Disconnect the video element from the stream
        }
    };


    const scanFromGallery = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const codeReader = new BrowserMultiFormatReader();
        try {
            const imageUrl = URL.createObjectURL(file);
            const hints = new Map();
            hints.set(2, true); // Enable try harder mode
            const result = await codeReader.decodeFromImageUrl(imageUrl);
            console.log("QR code from file:", result.text);
            setScanResult(result.text);

            // Fetch data from the scanned QR code
            await fetchQrData(result.text);
        } catch (err) {
            console.error("Error scanning file:", err);
            setScanResult(null);
            alert("No QR code found in the image. Please try another image.");
        } finally {
            codeReader.reset();
            URL.revokeObjectURL(imageUrl);
        }
    };


    const scanTextFromCamera = async () => {
        try {
            // First start the camera
            await startCameraScanner();

            // Create a new Tesseract worker
            const worker = await Tesseract.createWorker('eng');

            // Wait a moment for camera to initialize
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Get video element and create canvas
            const video = document.getElementById('reader');
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // Set canvas size to video size
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Capture frame from video
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert canvas to blob
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
            const imageUrl = URL.createObjectURL(blob);

            // Recognize text
            const { data: { text } } = await worker.recognize(imageUrl);

            // Clean up
            await worker.terminate();
            URL.revokeObjectURL(imageUrl);
            stopScanning();

            if (text.trim()) {
                setScanResult(text.trim());
                const words = text.trim().split(' ');
                for (const word of words) {
                    if (word) {
                        await fetchQrData(word);
                    }
                }
            }

        } catch (error) {
            console.error('Error scanning text:', error);
            toast.error("Error scanning text");
            stopScanning();
        }
    };


    const fetchQrData = async (name) => {
        try {
            if (!name) {
                console.error("Barcode number is empty");
                return;
            }
            console.log("name ", name)
            // Sanitize and normalize the text
            // const decodedName = encodeURIComponent(name);
            // console.log("decodenam ",decodedName); // Debugging line
            const extractedName = name.match(/^[a-zA-Z0-9]+/)[0].trim(); console.log("topass name:", extractedName);
            const response = await fetch(`/api/getmedicinename?search=${extractedName}`);

            if (!response.ok) {
                throw new Error("Failed to fetch medicine data");
            }

            const data = await response.json();

            // Set the fetched data to display on the frontend
            setFetchedData(data);
            setIsScanning(false);
            stopScanning(); // Stop scanning process

            // Explicitly stop video tracks
            const videoElement = document.getElementById('reader');
            if (videoElement && videoElement.srcObject) {
                const tracks = videoElement.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoElement.srcObject = null;
            }

        } catch (error) {
            toast.error("Error fetching medicine data");
            console.error("Error fetching medicine data:", error);
        }
    };




    const {
        Text,
        speechStatus,
        isInQueue,
        start,
        pause,
        stop,
    } = useSpeech({
        text: fetchedData ?
            `Name: ${fetchedData.name}. 
                 Description: ${fetchedData.description}. 
                 Dosage: ${fetchedData.dose}. 
                 Price: ${fetchedData.price} rupees. 
                 Expiry Date: ${fetchedData.expiry}`
            : ''
    });
    const readFetchedData = () => {
        if (isSpeaking) {
            cancel();
            setIsSpeaking(false);
            return;
        }
        const textToSpeak = `
          Name: ${fetchedData.name}
          Description: ${fetchedData.description}
          Dosage: ${fetchedData.dose}
          Price: ₹ ${fetchedData.price}
          Expiry Date: ${fetchedData.expiry}
        `;
        setIsSpeaking(true);
        speak({ 
            text: textToSpeak,
            onEnd: () => setIsSpeaking(false)
        });
        speak({ text: textToSpeak });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">

            <div className="flex justify-center items-center space-x-4 py-8">
                {/* QR Code Scanner Block */}
                {
                    !fetchedData ? (
                        <div className="scanner-container bg-white p-6 rounded-lg shadow-lg max-w-lg min-w-[400px w-full relative">
                            <button
                                className="absolute top-2 right-2 text-red-500"
                                onClick={() => { setShowScanner(false); stopScanning(); cancel(); }}
                            >
                                ✖
                            </button>
                            <div className="text-center">
                                {/* Camera Scanner Controls */}
                                <div className="mt-4">
                                    {isScanning ? (
                                        <button
                                            onClick={() => stopScanning()}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Stop Scanning
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => scanTextFromCamera()}
                                            // onClick={startCameraScanner}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Scan with Camera
                                        </button>
                                    )}
                                </div>


                                {/* Image Preview */}
                                <img id="preview" className="mt-4 max-w-full h-48 object-contain hidden" alt="Preview" />

                                {/* QR Code Reader Video */}
                                <video id="reader" className={`mt-6 w-full ${isScanning ? "block " : "hidden"} `}></video>
                            </div>
                        </div>
                    ) : (
                        <div className="result-container bg-white p-6 rounded-lg shadow-lg min-w-[400px] w-full relative">

                            <button
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                onClick={() => {
                                    setShowScanner(false);
                                    stopScanning()
                                    window.location.reload();// Clear the scan result    
                                }}

                            >
                                ✖
                            </button>
                            <h3 className="text-xl max-w-[500px] font-bold mb-2 text-gray-500">Scan Result:</h3>
                            {fetchedData && (
                                <div>
                                    <div className="space-y-2">
                                        <p><strong>name:</strong> {fetchedData.name}</p>
                                        <p><strong>barcode:</strong> {fetchedData.barcode}</p>
                                        <p><strong>description:</strong> {fetchedData.description}</p>
                                        <p><strong>dosage:</strong> {fetchedData.dose}</p>
                                        <p><strong>price:</strong> ₹ {fetchedData.price}</p>
                                        <p><strong>expiryDate:</strong> {fetchedData.expiry}</p>
                                    </div>
                                     <div className="flex items-center gap-4 mt-4">
                                  <button onClick={readFetchedData} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors">
                                    <Speaker size={24} className="text-blue-600" />
                                    <span className="text-blue-600">Speak</span>
                                    </button>
                                    <button
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors"
                                            onClick={cancel}
                                        >
                                            <Square size={24} className="text-red-600" />
                                            <span className="text-red-600">Stop</span>
                                        </button>
                                    </div> 
                                    {/* <button onClick={readFetchedData} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors">
                                    <Speaker size={24} className="text-blue-600" />
                                    <span className="text-blue-600">Speak</span>
                                    </button> */}
                                    {/* <div className="flex items-center gap-4 mt-4">
                                        <button
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
                                            onClick={speechStatus !== "started" ? start : pause}
                                        >
                                            {speechStatus !== "started" ? (
                                                <>
                                                    <Speaker size={24} className="text-blue-600" />
                                                    <span className="text-blue-600">Speak</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Pause size={24} className="text-blue-600" />
                                                    <span className="text-blue-600">Pause</span>
                                                </>
                                            )}
                                        </button>

                                        <button
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors"
                                            onClick={stop}
                                        >
                                            <Square size={24} className="text-red-600" />
                                            <span className="text-red-600">Stop</span>
                                        </button>
                                    </div> */}
                                </div>
                            )}
                        </div>
                    )
                }
            </div>
        </div>

    );
}

export default Scanner;