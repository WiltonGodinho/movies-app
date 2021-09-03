import { useState, useEffect } from 'react'
import api from '../api'
import styled from 'styled-components'

const MoviesDetail = props => {
    const [movie, setMovie] = useState({})
    const id = props.match.params.id

    const setData = async (movieID) => {
        const ret = await api.getMovieById(movieID)
        setMovie(ret.data.data)
        console.log(ret.data.data)
    }
    
    useEffect(() => setData(id), [id])

    return(<Center>
            <Line>Name: {movie.name}</Line>
            <Line>RATING: {movie.rating}</Line>
            <Line>Time: {movie.time}</Line>
        </Center>)
          
}

const Center = styled.div`
    margin: 0 30px;
`
const Line = styled.div`
    margin: 0 15px;
`


export default MoviesDetail