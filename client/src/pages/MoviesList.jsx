import React, { useState, useEffect } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const UpdateMovie = ({id}) =>  {
    
    const updateUser = event => {
        event.preventDefault()

        window.location.href = `/movies/update/${id}`
    }

   
    return <Update onClick={updateUser}>Update</Update>
   
}

const DeleteMovie = ({id, name}) => {
    
    const deleteUser = event => {
        console.log('event ', event)
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the movie ${name} permanently?`,
            )
        ) {
            api.deleteMovieById(id)
            window.location.reload()
        }
    }

    return <Delete onClick={deleteUser}>Delete</Delete>
}


const MoviesList = (props) => {
    const [ movies, setMovies ] =  useState([])
    const [isLoading, setLoading] = useState(false)

    const fetchData = async () => {
        const resp = await api.getAllMovies()
        const movies = resp?.data?.data ?? [] 
        setMovies(movies)        
    }

    useEffect(() => {
       fetchData()
    }, [])

        // console.log('TCL: MoviesList -> render -> movies', movies)

        const columns = [
            {
                Header: '_id',
                accessor: '',
                filterable: false,
                Cell: props => 
                    
                        <span>
                            <a href={`detail/${props.original._id}`}>{props.original._id}</a>
                        </span>
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteMovie id={props.original._id} name={props.original.name} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateMovie id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        // console.log('========== ', movies)
        if (!movies.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={movies}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }


export default MoviesList
