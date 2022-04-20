import { useEffect, useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import './App.css';

const Loader = () => {
  return (
    <div className="w-6 h-6 rounded-full border-4 border-dblue-500 border-t-transparent animate-spin"></div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    const apiUrl = "https://api.quotable.io/random";

    fetch(apiUrl, {
      method: 'GET',
      signal: signal
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });

    return () => {
      controller.abort();
    }
  }, []);

  const handleOnClick = () => {
    setLoading(true);
    const apiUrl = "https://api.quotable.io/random";
    fetch(apiUrl, {
      method: 'GET'
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  }

  let encodedURI = encodeURI(`"${data.content}" -${data.author}`);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-slate-800 transition-all">
      {loading ? <Loader /> : (
        <div
          id="quote-box"
          className="bg-slate-900 max-w-lg p-8 rounded-xl transition-all"
        >
          <h1 id="text" className="text-3xl italic text-slate-300">
            "{data.content}"
          </h1>
          <h3
            id="author"
            className="flex w-full justify-end mt-8 mb-12 text-lg text-slate-500"
          >
            <span>-{data.author}</span>
          </h3>
          <div className="flex justify-between items-center">
            <a
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodedURI}`}
              id="tweet-quote"
              target="_blank"
              className="w-12 h-12 bg-slate-600 rounded-lg flex justify-center items-center group hover:scale-110 transition-al duration-300"
              rel="noreferrer"
            >
              <FaTwitter className="text-white" />
            </a>
            <button
              id="new-quote"
              className="px-8 py-4 bg-slate-600 rounded-lg text-white shadow-lg shadow-slate-800 hover:scale-110 transition-all duration-300"
              onClick={handleOnClick}
            >
              New Quote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
