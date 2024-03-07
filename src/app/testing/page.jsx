"use client";
import { Container } from "@mui/material";
// import React, { useState } from "react";
// import { useSpeechSynthesis } from "react-speech-kit";

// const textToSpeech = () => {
//   const [text, setText] = useState("");
//   //   const { speak } = useSpeechSynthesis();
//   const onEnd = () => {
//     // You could do something here after speaking has finished
//   };
//   let { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
//     onEnd,
//   });

//   const handleVoiceStart = () => {
//     speak({ text: text });
//   };
//   const handleVoiceStop = () => {
//     cancel();
//   };
//   voices = [
//     {
//       default: true,
//       //   lang: "en-AU",
//       lang: "hi-IN",
//       localService: true,
//       name: "Karen",
//       voiceURI: "Karen",
//     },
//   ];
//   return (
//     <div>
//       <textarea
//         className="mt-52"
//         name=""
//         id=""
//         cols="30"
//         rows="10"
//         onChange={(e) => setText(e.target.value)}
//       ></textarea>
//       <button onClick={handleVoiceStart}>Read Aloud</button>
//       <button onClick={handleVoiceStop} className="mx-11">
//         Stop
//       </button>
//     </div>
//   );
// };

// export default textToSpeech;

// import React, { useState } from "react";

// const TextToSpeechComponent = () => {
//   const [inputText, setInputText] = useState("");

//   const handleInputChange = (e) => {
//     setInputText(e.target.value);
//   };

//   const handleButtonClick = () => {
//     if ("speechSynthesis" in window) {
//       const speechSynthesis = window.speechSynthesis;
//       const speechText = new SpeechSynthesisUtterance(inputText);
//       //   speechText.lang = "en-US";
//       speechText.lang = "hi-IN";
//       // You can set the language here. Example: speechText.lang = 'en-US';

//       speechSynthesis.speak(speechText);
//     } else {
//       alert("Speech synthesis is not supported in your browser.");
//     }
//   };

//   return (
//     <div>
//       <textarea
//         className="mt-52"
//         name=""
//         id=""
//         cols="30"
//         rows="10"
//         value={inputText}
//         onChange={handleInputChange}
//         placeholder="Type text here..."
//       />
//       <button onClick={handleButtonClick}>Convert to Speech</button>
//     </div>
//   );
// };

// export default TextToSpeechComponent;

// --------------------------------------------------------------------------------------------------------------------------------------
import React, { useEffect, useState } from "react";

const Example = () => {
  const [text, setText] = useState("I am a robot");
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [voiceIndex, setVoiceIndex] = useState(null);
  const onEnd = () => {
    // You could do something here after speaking has finished
  };
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
    onEnd,
  });

  const voice = voices[voiceIndex] || null;

  const styleFlexRow = { display: "flex", flexDirection: "row" };
  const styleContainerRatePitch = {
    display: "flex",
    flexDirection: "column",
    marginBottom: 12,
  };

  return (
    <Container className="mt-96">
      <form>
        <h2>Speech Synthesis</h2>
        {!supported && (
          <p>
            Oh no, it looks like your browser doesn&#39;t support Speech
            Synthesis.
          </p>
        )}
        {supported && (
          <>
            <p>
              {`Type a message below then click 'Speak'
                and SpeechSynthesis will read it out.`}
            </p>
            <label htmlFor="voice">Voice</label>
            <select
              id="voice"
              name="voice"
              value={voiceIndex || ""}
              onChange={(event) => {
                setVoiceIndex(event.target.value);
              }}
            >
              <option value="">Default</option>
              {voices.map((option, index) => (
                <option key={option.voiceURI} value={index}>
                  {`${option.lang} - ${option.name}`}
                </option>
              ))}
            </select>
            {/* <div style={styleContainerRatePitch}>
              <div style={styleFlexRow}>
                <label htmlFor="rate">Rate: </label>
                <div className="rate-value">{rate}</div>
              </div>
              <input
                type="range"
                min="0.5"
                max="2"
                defaultValue="1"
                step="0.1"
                id="rate"
                onChange={(event) => {
                  setRate(event.target.value);
                }}
              />
            </div>
            <div style={styleContainerRatePitch}>
              <div style={styleFlexRow}>
                <label htmlFor="pitch">Pitch: </label>
                <div className="pitch-value">{pitch}</div>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                defaultValue="1"
                step="0.1"
                id="pitch"
                onChange={(event) => {
                  setPitch(event.target.value);
                }}
              />
            </div> */}
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />
            {speaking ? (
              <button type="button" onClick={cancel}>
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={() => speak({ text, voice, rate, pitch })}
              >
                Speak
              </button>
            )}
          </>
        )}
      </form>
    </Container>
  );
};

export default Example;

const useSpeechSynthesis = (props = {}) => {
  const { onEnd = () => {} } = props;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  };

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSupported(true);
      getVoices();
    }
  }, []);

  const speak = (args = {}) => {
    const { voice = null, text = "", volume = 1 } = args;
    if (!supported) return;
    setSpeaking(true);
    // Firefox won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = voice;
    utterance.onend = handleEnd;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  return {
    supported,
    speak,
    speaking,
    cancel,
    voices,
  };
};
// -----------------------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import { useSpeechSynthesis } from "react-speech-kit";

// const TextToVoiceConverter = () => {
//   let voiceOptions = window.speechSynthesis.getVoices();
//   console.log(voiceOptions);
//   const [text, setText] = useState("");
//   const [voiceIndex, setVoiceIndex] = useState(null);

//   let { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
//   const voice = voices[voiceIndex] || null;
//   //   console.log;
//   const handleSpeak = () => {
//     speak({ text: text, voice });
//   };
//   const handleSpeakStop = () => {
//     cancel();
//   };

//   return (
//     <div>
//       <h1>Text to Voice Converter</h1>

//       <textarea
//         className="mt-64"
//         placeholder="Enter text..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />

//       <select
//         id="voice"
//         name="voice"
//         value={voiceIndex || ""}
//         onChange={(event) => {
//           //   console.log(event.target.value);
//           setVoiceIndex(event.target.value);
//         }}
//       >
//         <option value="">Default</option>
//         {voices.map((option, index) => (
//           <option key={option.voiceURI} value={index}>
//             {`${option.lang} - ${option.name}`}
//           </option>
//         ))}
//       </select>
//       {!speaking ? (
//         <button onClick={handleSpeak}>Convert to Voice</button>
//       ) : (
//         <button onClick={handleSpeakStop} className="mx-32">
//           stop
//         </button>
//       )}
//     </div>
//   );
// };

// export default TextToVoiceConverter;
