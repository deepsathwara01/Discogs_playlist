import React,{Fragment,useEffect,useState} from 'react'

const ListOffice = () => {
    
    const [tracks, setOffices] = useState([])

    const deleteOffice = async (id)=>{
        try { 
            const deleteOffice = await fetch(`http://localhost:8000/tracks/${id}`,{
                method: "DELETE"
            })
            console.log(deleteOffice) 
            setOffices(tracks.filter(track => track.id !== id))    
        } catch (err) { 
            console.error(err.message)
        }
    }

    const getData = async()=>{
        try {
            const response = await fetch("http://localhost:8000/tracks")
            const jsonData = await response.json()
            setOffices(jsonData)
            console.log(response)
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(()=>{
        getData()
    },[])

    console.log(tracks)
 return <Fragment>
            {" "}
            <table className="table mt-5 text-center">
            <thead>
            <tr>
                <th>id</th>
                <th>Title</th>
                <th>Uri</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                {/*<tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr> */}
            {tracks.map(track => (
                <tr key={track.id}>
                    <td>{track.id}</td>
                    <td>{track.title}</td>
                    <td>{track.uri}</td>
                    <td><button className="btn btn-danger" onClick={() => {deleteOffice(track.id)}}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
     </Fragment>
} 

export default ListOffice