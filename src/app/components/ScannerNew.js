import React, { useState } from 'react';
import {BarcodeScanner} from 'react-barcode-scanner';

const BarcodeScannerWithClose = () => {
  const [barcode, setBarcode] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(true);

  const handleScan = (data) => {
    if (data) {
      setBarcode(data.text);
    }
  };

  const handleCloseCamera = () => {
    setIsCameraActive(false); // This stops rendering the camera
  };

  const handleRestartCamera = () => {
    setIsCameraActive(true); // This starts rendering the camera again
  };

  return (
    <div>
      <h2>Barcode Scanner</h2>
      
      {isCameraActive ? (
        <div>
          <BarcodeScanner onUpdate={handleScan} />
          <button onClick={handleCloseCamera}>Close Camera</button>
        </div>
      ) : (
        <div>
          <p>Camera is closed</p>
          <button onClick={handleRestartCamera}>Restart Camera</button>
        </div>
      )}

      {barcode && <p>Scanned Barcode: {barcode}</p>}
    </div>
  );
};

export default BarcodeScannerWithClose;
