import React from 'react';
import { Link } from 'react-router-dom';
import { HomeContainer, BackgroundVideo, Content, LargeText, TransparentButton, SearchContainer, SearchInput, SearchButton } from '../components/InfoSection/HomeElements';

import Footer from '../components/Footer';
import MovieCard from '../components/MovieCard';
import { useState } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import '../styles/About.css';

const Home = () => {
  const [question, setQuestion] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);


  const askOpenAI = async () => {
    setLoading(true);
    try {
        const response = await axios.post('http://127.0.0.1:5000/ask', { question: question });
        setMovies(response.data.movies);
    } catch (error) {
        console.error("Error asking OpenAI:", error);
    }
    setLoading(false);
}


  return (
    <>

    <HomeContainer>
    
      {/* <BackgroundVideo autoPlay muted loop>
         <source src={require('../assets/ocean.mp4')} type="video/mp4" /> 
      </BackgroundVideo> */}

      <Content>
        <LargeText>YOUR CINEMATIC DISCOVERY</LargeText>
        <SearchContainer>
          <SearchInput value={question} onChange={e => setQuestion(e.target.value)}/>
          <SearchButton onClick={askOpenAI} disabled={loading}>
             <i className="fa fa-search" />
             {loading ? 'Loading...' : 'Search'}
          </SearchButton>
        </SearchContainer>
      </Content>
      <div>
             {movies.map(movie => (
              <MovieCard {...{title: movie.title,description:movie.description}}/>
                
             ))}
      </div>
      </HomeContainer>
      
    <Footer/>

    
    </>
);

};

export default Home;