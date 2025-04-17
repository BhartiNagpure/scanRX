import React from "react";
import { Speaker , Square} from "lucide-react";

const JsonToSpeech = ({ data }) => {
  const synth = window.speechSynthesis;

  const speakJSON = () => {
    if (synth.speaking) {
      synth.cancel(); // stop any ongoing speech before starting a new one
    }

    // const data = {
    //   name: "John",
    //   age: 28,
    //   location: "New York",
    //   message: "Welcome to our service!"
    // };

    let text = "";
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        text += `${capitalize(key)} is ${data[key]}. `;
      }
    }

    function capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    synth.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synth.speaking) {
      synth.cancel();
    }
  };

  return (
    <div  className="flex items-center gap-4 mt-4">
      <button onClick={speakJSON} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors">
        <Speaker size={24} className="text-blue-600" />
        <span className="text-blue-600">Speak</span>
      </button>
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors" onClick={stopSpeaking}>
        <Square size={24} className="text-red-600" />
        <span className="text-red-600">Stop</span></button>
    </div>
  );
};

export default JsonToSpeech;