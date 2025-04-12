import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import { stat } from 'fs';
import { useSelector ,useDispatch} from 'react-redux';
import {setmood} from '../Redux/features/moodslice';
import { set } from 'mongoose';

function MentalHeathh({ containerHeight = '600px', onSentimentAnalyzed }) {
  const {user}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  const {mood}=useSelector(state=>state.mood);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const abortControllerRef = useRef(null);
  const chatEndRef = useRef(null);
  const [flag, setFlag] = useState(false);
  const [sent,setSentiment]=useState("");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (flag) {
      sentiment();
    }
  }, [flag]);

  const stopStreaming = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const updatedMessages = [...messages, { role: 'user', content: input }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'ALIENTELLIGENCE/mindwell',
          messages: updatedMessages,
          stream: true,
        }),
        signal: controller.signal,
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let botMessage = '';
      let currentMessages = [...updatedMessages];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(Boolean);

        for (const line of lines) {
          const data = JSON.parse(line);
          if (data?.message?.content) {
            botMessage += data.message.content;
            const updated = [...currentMessages, { role: 'assistant', content: botMessage }];
            setMessages(updated);
          }
        }
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Streaming error:', err);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: '⚠ Oops! Something went wrong.' },
        ]);
      }
    } finally {
      setLoading(false);
      setFlag(true);
    }
  };

  const sentiment = async () => {
    try {
      const conversationText = messages.map(msg => msg.content).join('\n');
      console.log("Conversation Text:", conversationText);

      const form = new FormData();
      form.append("prompt", conversationText);

      const res = await axios.post('http://127.0.0.1:8004/sum', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Sentiment Analysis Response:", res.data);
      setSentiment(res.data);
      if(res.data==="verylow") sendemail();
      // {
      //   const respond=await axios.post('http://localhost:6000/send-email', 
      //     {
      //       "to": "bhuvan.ravi075@gmail.com",
      //       "subject": "Test Email from Express",
      //       "text": "This is a test email sent from an Express API using Nodemailer."
      //     },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     }
      //   }).then(res => console.log(res));
      // }
      dispatch(setmood(res.data));

    } catch (error) {
      console.error("Sentiment analysis failed:", error);
    }
  };

  const sendemail = async () => {
    try {
      const res = await axios.post('http://localhost:8080/send-email', {
        to: 'bhuvan.ravi075@gmail.com',
        subject: 'from Vertex.ai',
        text: `${user.username} is feeling very low . Please console him`,
      });
      console.log(res.data);
    } catch (err) {
      console.error('Email send failed:', err.message);
    }
  };

  return (
    <div className={`flex flex-col w-full rounded-lg overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100' 
        : 'bg-gradient-to-br from-emerald-200 to-cyan-100 text-slate-800'
    } font-sans shadow-xl`} style={{ height: containerHeight }}>
      <div className="text-center p-3">
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-sky-400' : 'text-emerald-500'}`}>
            🌿 MindWell
          </h1>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className={`px-3 py-1 rounded-lg border-none cursor-pointer text-sm font-medium shadow-md ${
              darkMode 
                ? 'bg-slate-700 text-slate-100' 
                : 'bg-emerald-50 text-green-800'
            }`}
          >
            {darkMode ? '☀ Light' : '🌙 Dark'}
          </button>
        </div>
        <p className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-500'}`}>
          Your compassionate AI therapy companion
        </p>
      </div>

      <div className={`flex-1 overflow-y-auto p-3 m-2 rounded-xl backdrop-blur-md flex flex-col gap-3 ${
        darkMode 
          ? 'bg-slate-800 shadow-lg' 
          : 'bg-emerald-50/75 shadow-md'
      }`}>
        {messages.length === 0 && (
          <div className={`text-center py-4 px-3 ${darkMode ? 'text-slate-300' : 'text-slate-700'} leading-relaxed`}>
            <h3 className="text-base font-semibold">Welcome to your safe space</h3>
            <p className="text-sm">Share your thoughts freely – I'm here to listen without judgment.</p>
            <div className={`mt-3 p-3 rounded-xl text-left text-xs ${
              darkMode 
                ? 'bg-slate-700 border-l-4 border-sky-400 text-slate-100 shadow-md' 
                : 'bg-emerald-50 border-l-4 border-emerald-400 text-emerald-900 shadow-sm'
            }`}>
              <p>Try saying:</p>
              <ul className="list-disc pl-4 mt-1">
                <li>"I've been feeling anxious about..."</li>
                <li>"How can I cope with stress better?"</li>
                <li>"I need help processing a difficult emotion"</li>
              </ul>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl text-sm leading-relaxed max-w-4/5 shadow-md ${
              msg.role === 'user' 
                ? 'bg-sky-500 text-white self-end' 
                : `self-start ${darkMode ? 'bg-slate-700 text-slate-100' : 'bg-emerald-50 text-green-800'}`
            }`}
          >
            <div className="flex items-center mb-1 font-bold">
              <span className="text-lg mr-2">
                {msg.role === 'user' ? '🧘‍♂' : '🌱'}
              </span>
              <strong className="text-xs">
                {msg.role === 'user' ? 'You' : 'MindWell'}
              </strong>
            </div>
            <div className="whitespace-pre-wrap">
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className={`p-3 rounded-2xl text-sm leading-relaxed self-start shadow-md ${
            darkMode ? 'bg-slate-700 text-slate-100' : 'bg-emerald-50 text-green-800'
          }`}>
            <div className="flex items-center mb-1 font-bold">
              <span className="text-lg mr-2">🌿</span>
              <strong className="text-xs">MindWell</strong>
            </div>
            <div className="flex gap-1 h-4">
              <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-slate-100' : 'bg-slate-400'} animate-pulse`}></span>
              <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-slate-100' : 'bg-slate-400'} animate-pulse animation-delay-200`}></span>
              <span className={`w-1 h-1 rounded-full ${darkMode ? 'bg-slate-100' : 'bg-slate-400'} animate-pulse animation-delay-400`}></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-2 p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share what's on your heart..."
          disabled={loading}
          className={`flex-1 p-2 text-sm rounded-xl border border-slate-300 shadow-md ${
            darkMode 
              ? 'bg-slate-800 text-slate-100' 
              : 'bg-white text-slate-800'
          }`}
        />
        <div className="flex gap-1">
          <button
            type="submit"
            disabled={loading}
            className={`px-3 py-2 text-sm rounded-xl border-none font-medium cursor-pointer shadow-md ${
              loading 
                ? 'bg-slate-400 text-white cursor-not-allowed' 
                : darkMode 
                  ? 'bg-sky-400 text-slate-900' 
                  : 'bg-emerald-500 text-white'
            }`}
          >
            Send
          </button>
          {loading && (
            <button
              type="button"
              onClick={stopStreaming}
              className={`px-3 py-2 text-sm rounded-xl border-none font-medium cursor-pointer shadow-md ${
                darkMode 
                  ? 'bg-slate-700 text-slate-100' 
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              Stop
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default MentalHeathh;