import React,{Fragment,useEffect,useState} from 'react'

const ListOffice = () => {
    
    const [tracks, setOffices] = useState([])

    const deleteOffice = async (event)=>{
        try { 
            const deleteOffice = await fetch(`http://localhost:8000/tracks/${event.target.id}`,{
                method: "DELETE"
            })
            console.log(deleteOffice) 
            setOffices(tracks.filter(track => track.id !== event.target.id)) 
            //console.log(tracks)   
        } catch (err) { 
            console.error(err.message)
        }
    }

    const getData = async()=>{
        try {
            const response = await fetch("http://localhost:8000/tracks")
            const jsonData = await response.json()
            setOffices(jsonData.track)
            console.log(response)
        } catch (err) {
            console.error(err.message)
        }
    }
    useEffect(()=>{
        getData()
    },[])

    console.log(tracks)
    console.log("HI")
    const renderThing =() => {
        if(tracks.length > 0){
        return (        
        <div>
            {
        tracks.map((item) => (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.uri}</td>
                <td><button id={item.id} className="btn btn-danger" onClick={(event) => {deleteOffice(event)}}>Delete</button></td>
            </tr>)
        )}
        </div>
        )}
        else {
            return <div> </div>
        }
    }
 return <Fragment>
            {" "}
            <table className="table mt-5 text-center">
            <thead>
            <tr>
            </tr>
            </thead>
            <tbody>
                {/*<tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
            </tr> */}
            
            {renderThing()}
            </tbody>
        </table>
     </Fragment>
} 

export default ListOffice
