import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import blk from "../../images/black.jpg";


export default function Tv() {

  const navigate = useNavigate();
  const [trendingTv,setTrindingTv] = useState([]);
  let imgPrefix = 'https://image.tmdb.org/t/p/w500';

  async function getTrindingTv() {
    
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=f482dd12c25f9847100b5cc47a0e4e7f`)
    setTrindingTv(data.results)
  }

  useEffect(()=>{
    getTrindingTv();
  },[]);



  return (
    <div className="container my-5">
    
    <div className="container w-75 text-center my-5">
        <div className="brdr my-2"></div>
        <h2 className='h1 py-2'>Trending Series To Watch Right Now</h2>
        <p className='h5 text-muted py-2'>Trending Series To Watch</p>
        <div className="brdr my-3"></div>
      </div>
    

    <div className='row'>
      
      {trendingTv.map((movie,index) =>

        <div key={index} className="col-md-3 mb-3">
        <div className="movie" onClick={()=>{navigate(`/${movie.media_type}/${movie.id}`);}}>
          <img className='w-100 rounded' src={movie.poster_path?imgPrefix+movie.poster_path:blk} alt={movie.name} />
          <h3 className='h6 my-2'>{movie.name}</h3>
        </div>
      </div>
      )}
      
      
    </div>

    <br/>
    <br/>
    <br/>

    
    </div>
  )
}
