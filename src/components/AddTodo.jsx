import { useEffect, useRef, useState } from "react";
import DeadlineBlock from "./DeadlineBlock";
import SvgForm from "./SvgForm";

export function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const isStartedRef = useRef(false);

  const recognitionRef = useRef(null);
  const finalTextRef = useRef("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);
    finalTextRef.current = value;
  };

  const startListening = () => {
    if (recognitionRef.current && !isStartedRef.current) {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error("Ошибка старта:", error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isStartedRef.current) {
      recognitionRef.current.stop();
      isStartedRef.current = false;
      setIsListening(false);
    }
  };

  const toggleListening = () => {
    isListening ? stopListening() : startListening();
  };

  const clearInput = () => {
    setText("");
    finalTextRef.current = "";
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !recognitionRef.current) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.lang = "ru-RU";
        recognitionInstance.interimResults = true;
        recognitionInstance.onstart = () => {
          isStartedRef.current = true;
          setIsListening(true);
        };

        recognitionInstance.onend = () => {
          isStartedRef.current = false;
          if (isListening) {
            try {
              recognitionInstance.start();
            } catch (e) {
              console.log("Ожидание освобождения API...", e);
            }
          } else {
            setIsListening(false);
          }
        };

        recognitionInstance.onresult = (event) => {
          let interimScript = "";
          let newFinalTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) newFinalTranscript += transcript;
            else interimScript += transcript;
          }
          if (newFinalTranscript) {
            finalTextRef.current = (
              finalTextRef.current.trim() +
              " " +
              newFinalTranscript
            ).trim();
          }
          setText(
            interimScript
              ? (finalTextRef.current + " " + interimScript).trim()
              : finalTextRef.current,
          );
        };

        recognitionRef.current = recognitionInstance;
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isListening) stopListening();
    if (text.trim()) {
      onAdd(text, deadline);
      setText("");
      setDeadline("");
      setShowDeadlineInput(false);
      finalTextRef.current = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500 dark:border-gray-700">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder={isListening ? "Слушаю..." : "Добавление задачи ..."}
          className="dark:bg-page-dark dark:text-txt-dark flex-1 p-3 text-gray-700 placeholder-gray-400 transition-all outline-none"
        />

        {text && (
          <button
            type="button"
            onClick={clearInput}
            className="p-2 text-gray-400 transition-colors hover:text-gray-600"
            title="Очистить текст"
          >
            <SvgForm
              classNameSVG={`h-5 w-5`}
              dSVG={"M6 18L18 6M6 6l12 12"}
              viewBoxSVG={"0 0 24 24"}
            />
          </button>
        )}

        <button
          type="button"
          onClick={toggleListening}
          className={`relative mx-2 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
            isListening
              ? "animate-pulse-red bg-red-500 text-white shadow-md"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
          title={isListening ? "Остановить запись" : "Голосовой ввод"}
        >
          <SvgForm
            classNameSVG={`h-6 w-6 stroke-2 ${isListening ? "scale-110" : ""}`}
            dSVG={
              "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
            }
            viewBoxSVG={"0 0 24 24"}
          />
        </button>

        <button
          type="submit"
          className="hover:bg-btn-light-hv bg-btn-light dark:bg-btn-dark hover:dark:bg-btn-dark-hv p-3 text-white transition-colors duration-300"
        >
          <SvgForm
            classNameSVG={"h-6 w-6 stroke-2"}
            dSVG={"M12 4v16m8-8H4"}
            viewBoxSVG={"0 0 24 24"}
          />
        </button>
      </div>
      <DeadlineBlock
        showDeadlineInput={showDeadlineInput}
        deadline={deadline}
        setDeadline={setDeadline}
        setShowDeadlineInput={setShowDeadlineInput}
      />
    </form>
  );
}
// import { useEffect, useRef, useState } from "react";
// import DeadlineBlock from "./DeadlineBlock";
// import SvgForm from "./SvgForm";

// export function AddTodo({ onAdd }) {
//   const [text, setText] = useState("");
//   const [deadline, setDeadline] = useState("");
//   const [showDeadlineInput, setShowDeadlineInput] = useState(false);
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const finalTextRef = useRef("");

//   const startListening = () => {
//     if (recognition) {
//       recognition.start();
//       setIsListening(true);
//     }
//   };

//   const stopListening = () => {
//     if (recognition) {
//       recognition.stop();
//       setIsListening(false);
//       setText(finalTextRef.current);
//     }
//   };
//   const toggleListening = () => {
//     if (isListening) {
//       stopListening();
//     } else {
//       startListening();
//     }
//   };

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const SpeechRecognition =
//         window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognitionInstance = new SpeechRecognition();
//         recognitionInstance.continuous = true;
//         recognitionInstance.lang = "ru-RU";
//         recognitionInstance.interimResults = true;
//         recognitionInstance.onresult = (event) => {
//           let finalTranscript = "";
//           let interimScript = "";
//           for (let i = event.resultIndex; i < event.results.length; i++) {
//             const transcript = event.results[i][0].transcript;
//             if (event.results[i].isFinal) {
//               finalTranscript += transcript;
//             } else {
//               interimScript += transcript;
//             }
//             if (finalTranscript) {
//               finalTextRef.current =
//                 finalTextRef.current + " " + finalTranscript;
//               setText(finalTextRef.current);
//             } else if (interimScript) {
//               setText(finalTextRef.current + " " + interimScript);
//             }
//           }
//         };
//         recognitionInstance.onerror = (event) => {
//           console.error("Ошибка распознавания: ", event.error);
//           stopListening();
//         };

//         recognitionInstance.onend = () => {
//           if (isListening) {
//             recognitionInstance.start();
//           }
//         };
//         setRecognition(recognitionInstance);
//       }
//     }
//     return () => {
//       if (recognition) {
//         recognition.stop();
//       }
//     };
//   }, [isListening]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (text.trim()) {
//       onAdd(text, deadline);
//       setText("");
//       setDeadline("");
//       setShowDeadlineInput(false);
//       finalTextRef.current = "";
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mb-6">
//       <div className="flex items-center overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
//         <input
//           type="text"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//           placeholder="Добавление задачи ..."
//           className="dark:bg-page-dark dark:text-txt-dark flex-1 p-3 text-gray-700 placeholder-gray-400 outline-none"
//         />
//         <button
//           type="button"
//           onClick={toggleListening}
//           className={`active: rounded-full p-1 ${isListening ? "bg-red-400 hover:bg-red-300" : "hover:bg-gray-200"}`}
//         >
//           <SvgForm
//             classNameSVG={"h-6 w-6 stroke-2 "}
//             dSVG={
//               "M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
//             }
//             viewBoxSVG={"0 0 24 24"}
//           />
//         </button>

//         <button
//           type="submit"
//           className="hover:bg-btn-light-hv bg-btn-light dark:bg-btn-dark hover:dark:bg-btn-dark-hv cursor-pointer p-3 text-white transition-colors duration-300"
//         >
//           <SvgForm
//             classNameSVG={"h-6 w-6 stroke-2"}
//             dSVG={"M12 4v16m8-8H4"}
//             viewBoxSVG={"0 0 24 24"}
//           />
//         </button>
//       </div>
//       <DeadlineBlock
//         showDeadlineInput={showDeadlineInput}
//         deadline={deadline}
//         setDeadline={setDeadline}
//         setShowDeadlineInput={setShowDeadlineInput}
//       />
//     </form>
//   );
// }
