import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import blk from "../../images/black.jpg";

export default function Home(props) {

  const navigate = useNavigate();

  const [trendingMovies,setTrindingMovies] = useState([]);
  const [trendingTv,setTrindingTv] = useState([]);
  const [trendingPerson,setTrindingPerson] = useState([]);

  let imgPrefix = 'https://image.tmdb.org/t/p/w500';


  async function getTrendingMedia(mediaType , callback) {
    
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f482dd12c25f9847100b5cc47a0e4e7f`)
    callback(data.results.slice(0,10))
  }

  useEffect(()=>{
    getTrendingMedia('movie' , setTrindingMovies);
    getTrendingMedia('tv' , setTrindingTv);
    getTrendingMedia('person' , setTrindingPerson);
  },[]);



  return (
    <div className="container my-5">
    <div className='row'>
      <div className="col-md-4">
        <div className="brdr my-2"></div>
        <h2 className='h1 py-2'>Trending Movies<br/>To Watch<br/>Right Now</h2>
        <p className='h5 text-muted py-2'>Trending Movies To Watch</p>
        <div className="brdr my-3"></div>
      </div>
      {trendingMovies.map((movie,index) =>

        <div key={index} className="col-md-2 mb-2">
        <div className="movie" onClick={()=>{navigate(`/${movie.media_type}/${movie.id}`);}}>
          <img className='w-100 rounded' src={movie.poster_path?imgPrefix+movie.poster_path:blk} alt={movie.title} />
          <h6 className='rate bg-primary py-2 px-2 text-center rounded'>{movie.vote_average}</h6>
          <h3 className='h6 my-2'>{movie.title}</h3>
        </div>
      </div>
      )}
      
      
    </div>

    <br/>
    <br/>
    <br/>

    <div className='row'>
      <div className="col-md-4">
        <div className="brdr my-2"></div>
        <h2 className='h1 py-2'>Trending Series<br/>To Watch<br/>Right Now</h2>
        <p className='h5 text-muted py-2'>Trending Series To Watch</p>
        <div className="brdr my-3"></div>
      </div>
      {trendingTv.map((movie,index) =>

        <div key={index} className="col-md-2 mb-3">
        <div className="movie" onClick={()=>{navigate(`/${movie.media_type}/${movie.id}`);}}>
          <img className='w-100 rounded' src={movie.poster_path?imgPrefix+movie.poster_path:blk} alt={movie.name} />
          <h6 className='rate bg-primary py-2 px-2 text-center rounded'>{movie.vote_average}</h6>
          <h3 className='h6 my-2'>{movie.name}</h3>
        </div>
      </div>
      )}
      
      
    </div>

    <br/>
    <br/>
    <br/>

    <div className='row'>
      <div className="col-md-4">
        <div className="brdr my-2"></div>
        <h2 className='h1 py-2'>Trending Celebrities<br/>To Watch<br/>Right Now</h2>
        <p className='h5 text-muted py-2'>Trending Celebrities To Watch</p>
        <div className="brdr my-3"></div>
      </div>
      {trendingPerson.map((movie,index) =>

        <div key={index} className="col-md-2 mb-3">
        <div className="movie" onClick={()=>{navigate(`/${movie.media_type}/${movie.id}`);}}>
          <img className='w-100 rounded' src={movie.profile_path?imgPrefix+movie.profile_path:blk} alt={movie.name} />
          <h3 className='h6 my-2'>{movie.name}</h3>
        </div>
      </div>
      )}
      
      
    </div>
    </div>
  )
}
