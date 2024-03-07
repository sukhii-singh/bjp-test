"use client"

// import { Container } from "@mui/material";
// import React, { useEffect, useState } from "react";

// const Example = () => {
//     const [text, setText] = useState("I am a robot");
//     const [pitch, setPitch] = useState(1);
//     const [rate, setRate] = useState(1);
//     const [voiceIndex, setVoiceIndex] = useState(null);
//     const onEnd = () => {
//         // You could do something here after speaking has finished
//     };
//     const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis({
//         onEnd,
//     });

//     const voice = voices[voiceIndex] || null;

//     const styleFlexRow = { display: "flex", flexDirection: "row" };
//     const styleContainerRatePitch = {
//         display: "flex",
//         flexDirection: "column",
//         marginBottom: 12,
//     };

//     return (
//         <Container className="mt-96">
//             <form>
//                 <h2>Speech Synthesis</h2>
//                 {!supported && (
//                     <p>
//                         Oh no, it looks like your browser doesn&#39;t support Speech
//                         Synthesis.
//                     </p>
//                 )}
//                 {supported && (
//                     <>
//                         <p>
//                             {`Type a message below then click 'Speak'
//                 and SpeechSynthesis will read it out.`}
//                         </p>
//                         <label htmlFor="voice">Voice</label>
//                         <select
//                             id="voice"
//                             name="voice"
//                             value={voiceIndex || ""}
//                             onChange={(event) => {
//                                 setVoiceIndex(event.target.value);
//                             }}
//                         >
//                             <option value="">Default</option>
//                             {voices.map((option, index) => (
//                                 <option key={option.voiceURI} value={index}>
//                                     {`${option.lang} - ${option.name}`}
//                                 </option>
//                             ))}
//                         </select>


//                         <label htmlFor="message">Message</label>
//                         <textarea
//                             id="message"
//                             name="message"
//                             rows={3}
//                             value={text}
//                             onChange={(event) => {
//                                 setText(event.target.value);
//                             }}
//                         />
//                         {speaking ? (
//                             <button type="button" onClick={cancel}>
//                                 Stop
//                             </button>
//                         ) : (
//                             <button
//                                 type="button"
//                                 onClick={() => speak({ text, voice, rate, pitch })}
//                             >
//                                 Speak
//                             </button>
//                         )}
//                     </>
//                 )}
//             </form>
//         </Container>
//     );
// };

// export default Example;

// const useSpeechSynthesis = (props = {}) => {
//     const { onEnd = () => { } } = props;
//     const [voices, setVoices] = useState([]);
//     const [speaking, setSpeaking] = useState(false);
//     const [supported, setSupported] = useState(false);

//     const processVoices = (voiceOptions) => {
//         setVoices(voiceOptions);
//     };

//     const getVoices = () => {
//         // Firefox seems to have voices upfront and never calls the
//         // voiceschanged event
//         let voiceOptions = window.speechSynthesis.getVoices();
//         if (voiceOptions.length > 0) {
//             processVoices(voiceOptions);
//             return;
//         }

//         window.speechSynthesis.onvoiceschanged = (event) => {
//             voiceOptions = event.target.getVoices();
//             processVoices(voiceOptions);
//         };
//     };

//     const handleEnd = () => {
//         setSpeaking(false);
//         onEnd();
//     };

//     useEffect(() => {
//         if (typeof window !== "undefined" && window.speechSynthesis) {
//             setSupported(true);
//             getVoices();
//         }
//     }, []);

//     const speak = (args = {}) => {
//         const { voice = null, text = "", volume = 1 } = args;
//         if (!supported) return;
//         setSpeaking(true);
//         // Firefox won't repeat an utterance that has been
//         // spoken, so we need to create a new instance each time
//         const utterance = new window.SpeechSynthesisUtterance();
//         utterance.text = text;
//         utterance.voice = voice;
//         utterance.onend = handleEnd;

//         utterance.volume = volume;
//         window.speechSynthesis.speak(utterance);
//     };

//     const cancel = () => {
//         if (!supported) return;
//         setSpeaking(false);
//         window.speechSynthesis.cancel();
//     };

//     return {
//         supported,
//         speak,
//         speaking,
//         cancel,
//         voices,
//     };
// };

// import React, { useState, useEffect } from 'react';

// const TextToSpeechComponent = () => {
//     const [text, setText] = useState('');
//     const [language, setLanguage] = useState('en-US');
//     const [speaking, setSpeaking] = useState(false);
//     let synth = window.speechSynthesis;

//     useEffect(() => {
//         if (synth) {
//             synth.cancel();
//             if (speaking) {
//                 speakText();
//             }
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [language]);

//     const speakText = () => {
//         if (synth && !speaking) {
//             const utterance = new SpeechSynthesisUtterance(text);
//             utterance.lang = language;
//             synth.speak(utterance);
//             setSpeaking(true);
//         } else if (synth && speaking) {
//             synth.cancel();
//             setSpeaking(false);
//         }
//     };

//     return (
//         <div className='mt-[400px]'>
//             <textarea
//                 rows="4"
//                 cols="50"
//                 placeholder="Enter text to speak"
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//             />
//             <br />
//             <label>Select Language: </label>
//             <select
//                 value={language}
//                 onChange={(e) => setLanguage(e.target.value)}
//             >
//                 <option value="en-US">English (US)</option>
//                 <option value="hi-IN">hindi (Spain)</option>
//                 {/* Add more language options as needed */}
//             </select>
//             <br />
//             <button onClick={speakText}>
//                 {speaking ? 'Stop Speaking' : 'Start Speaking'}
//             </button>
//         </div>
//     );
// };

// export default TextToSpeechComponent;

import React, { useState, useEffect } from 'react';

const TextToSpeechComponent = () => {
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('en-US');
    const [speaking, setSpeaking] = useState(false);
    let synth = window.speechSynthesis;

    useEffect(() => {
        if (synth) {
            synth.cancel();
            if (speaking) {
                speakText();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language]);

    const speakText = () => {
        if (synth && !speaking) {
            const chunks = text.match(/.{1,200}/g); // Split text into chunks of 200 characters
            chunks.forEach((chunk, index) => {
                const utterance = new SpeechSynthesisUtterance(chunk);
                utterance.lang = language;
                if (index === chunks.length - 1) {
                    utterance.onend = () => setSpeaking(false); // Set speaking to false after the last chunk
                }
                synth.speak(utterance);
            });
            setSpeaking(true);
        } else if (synth && speaking) {
            synth.cancel();
            setSpeaking(false);
        }
    };

    return (
        <div className='mt-[200px]'>
            <textarea
                rows="4"
                cols="50"
                placeholder="Enter text to speak"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <br />
            <label>Select Language: </label>
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="en-US">English (US)</option>
                <option value="es-ES">Spanish (Spain)</option>
                <option value="hi-IN">Hindi</option>
                {/* Add more language options as needed */}
            </select>
            <br />
            <button onClick={speakText}>
                {speaking ? 'Stop Speaking' : 'Start Speaking'}
            </button>
        </div>
    );
};

export default TextToSpeechComponent;
