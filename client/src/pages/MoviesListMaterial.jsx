import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef } from '@material-ui/data-grid'
import Button from '@material-ui/core/Button';
import api from '../api'

import styled from 'styled-components'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const DeleteMovie = (props) => {
  
  const deleteAPI = (id) => {
    if (
      window.confirm(
          `Do tou want to delete the movie ${id} permanently?`,
      )
  ) {
      api.deleteMovieById(id)
      window.location.reload()
  }
  }
  


  return (<Button  variant="contained"
    color="primary"
    size="small"
    onClick= {() => deleteAPI(props.id)}>Delete
  </Button>)
}

const MoviesListMaterial = (props) => {
    const [ movies, setMovies ] =  useState([])


    const fetchData = async () => {
      const movies = await api.getAllMovies()
        const idMovies = movies.data.data.map(m => ({id: m._id, ...m}))
        setMovies(idMovies)
        console.log(idMovies)        
    }

    useEffect(() => {
       fetchData()
    }, [])

const callUpdate = (id) => { 
  //console.log("======= ", id)
  window.location.href=`/movies/update/${id}`
}

const columns: GridColDef[] = [
    { field: 'id', width: 200,
    renderCell: (params: GridCellParams) => (
    <a href={`/movies/detail/${params.id}`}>
      {params.id}
    </a>
    )
  },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'rating', headerName: 'Rating', width: 200 },
    { field: 'time', headerName: 'Time', width: 200 },
    { field: '', width: 100,
      renderCell: (params: GridCellParams) => (
      <Button  variant="contained"
      color="primary"
      size="small"
      onClick= {() => callUpdate(params.id)}>Update
      </Button>
      )
    },
    { field: ' ', width: 100,
      renderCell: (params: GridCellParams) => (
      <DeleteMovie id={params.id} />
      )
    }
  ]

return(
    <Wrapper>
    <div>{movies && movies[1] && movies[1].id}</div>
    <DataGrid
    columns={columns}
    rows={movies || []}
    autoHeight={true}
  />
  </Wrapper>
)

}

export default MoviesListMaterial