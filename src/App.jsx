import { useState } from 'react'
import axios from "axios";
import openAILogo from "./assets/openai_logo.jpg";
import './App.css'
function App() {
  const serverURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8000';
  const [generatedImages, setGeneratedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  async function generateImage() {
    if (prompt.trim() == '') {
      setPrompt('');
      alert('Enter a prompt')
      return;
    }
    setLoading(true);
    try {
      let response = await axios.post(`${serverURL}/generateimages`,
                    {prompt: prompt});  
      let data = response.data;
      setGeneratedImages(data.data);
      setPrompt('');
    } catch (error) {
      alert("Rate limit exceeded. Please try after few minutes");
      console.log(error);
    }  
    setLoading(false);
  }

  return (
    <div className="app">
      <h1>Dall-E-Clone</h1>
      <img style={{ display: loading ? 'block' : 'none' }} className="loading-icon" src={openAILogo} alt="open-ai-logo" />
      {generatedImages?.length < 1 && <h3>Enter a prompt and let the AI magic happen !</h3>}

      <main className="main-app-container">
        <div style={{ opacity: loading ? '0.2' : '1' }} className="images-container">
          {
            generatedImages?.map((image, idx) => {
              return <img key={idx} src={image.url} alt="generated-image" />
            })
          }
        </div>
        <input disabled={loading} onKeyDown={(e) => { if (e.key === "Enter") { generateImage() } }} value={prompt} onChange={(e) => { setPrompt(e.target.value) }} type="text" name="prompt" id="user-prompt" placeholder="Enter a prompt. Ex: A flying cat" />
        <button disabled={loading} onClick={generateImage}>Generate</button>
      </main>
      <footer>
        <div className="socials" style={{width:'99%'}}>
        <p>Made by Sujal Gupta</p>
          <a href="https://www.linkedin.com/in/heysujal/">
            <i
              style={{color: '#0072b1', marginRight:'10px'}}
              className="fab fa-linkedin fa-3x"
            ></i>
          </a>
          <a href="https://github.com/heysujal">
            <i
              style={{color: 'white', marginRight:'10px'}}
              className="fab fa-github fa-3x"
            ></i>
          </a>

          <a href="https://twitter.com/heysujal">
            <i
              style={{color : '#1da1f2', marginRight:'10px'}}
              className="fab fa-twitter fa-3x"
            ></i>
          </a>
          <a href="mailto:sujalgupta6100@gmail.com">
            <i style={{color : 'white', marginRight:'10px'}} className="fas fa-envelope fa-3x"></i>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App
