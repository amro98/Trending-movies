import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import blk from "../../images/black.jpg";


export default function MovieDetails() {

    const {media_type,id} = useParams();

    const [movie,setMovie] = useState([]);
    let imgPrefix = 'https://image.tmdb.org/t/p/w500';

    async function getMovie() {
    
        let {data} = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=f482dd12c25f9847100b5cc47a0e4e7f&language=en-US`)
        setMovie(data)
      }

      useEffect(()=>{
          getMovie();
      },[]);

    
  return (
    <div className='container'>
      <div className="row">

        {media_type==="person"?
        <>
            <div className="col-md-5 pt-4">
              <img className='w-75 rounded' src={movie.profile_path?imgPrefix+movie.profile_path:blk} alt={movie.original_title} />
            </div>

            <div className="col-md-6 py-5">
          <h1 className='h2'>{movie.name}</h1>
          
          <div className="brdr my-2"></div>
          <h6 className='py-3'>Date of birth :  {movie.birthday}</h6>

          <h6 className='py-3'>Place of birth :  {movie.place_of_birth}</h6>


          <div className="brdr my-2"></div>
          <p className='py-3'>{movie.biography}</p>


        </div>
            
            </>
            :
            <>
            <div className="col-md-5 pt-4">
          <img className='w-75 rounded' src={movie.poster_path?imgPrefix+movie.poster_path:blk} alt={movie.original_title} />
        </div>

        <div className="col-md-6 py-5">
          <h1 className='h2'>{media_type==="tv"?movie.original_name:movie.original_title}</h1>
          <div className="brdr my-2 w-50"></div>
          <h5 className='py-3'>{movie.overview}</h5>
          <div className="brdr my-2"></div>
          <h6 className='py-3'>Release date :  {media_type==="tv"?movie.first_air_date:movie.release_date}</h6>

          <div className="d-flex py-3">
            <div className='d-flex align-items-center '>
                <h6 className=' m-0'>Spoken languages : </h6>
            </div>
            <div className='d-flex   '>
                {movie.spoken_languages?.map((lng,index) =>
                <div key={index} className='d-flex align-items-center'>
                    <h3 className='h6 m-0'>&nbsp;&nbsp;{lng.english_name}</h3>
                </div>
                )}
            </div>
          </div>


          <div className="d-flex py-3">
            <div className='d-flex align-items-center '>
                <h6 className=' m-0'>Genres : </h6>
            </div>
            <div className='d-flex   '>
                {movie.genres?.map((lng,index) =>
                <div key={index} className='d-flex align-items-center'>
                    <h3 className='h6 m-0'>&nbsp;&nbsp;{lng.name}</h3>
                </div>
                )}
            </div>
          </div>

          <div className="d-flex py-3">
            <div className='d-flex align-items-center '>
                <h6 className=' m-0'>Production countries : </h6>
            </div>
            <div className='d-flex   '>
                {movie.production_countries?.map((lng,index) =>
                <div key={index} className='d-flex align-items-center'>
                    <h3 className='h6 m-0'>&nbsp;&nbsp;{lng.name}</h3>
                </div>
                )}
            </div>
          </div>

          {media_type==="tv"?<h6 className='py-3'>Seasons :  {movie.last_episode_to_air?.season_number}</h6>:""}

          <h6 className='py-2'>Rate :  {movie.vote_average}</h6>


          

          


        </div>
            
        </>
        }
        
        
      </div>
      
      
    </div>
  )
}
