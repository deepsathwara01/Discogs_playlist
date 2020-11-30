const express = require('express')
const app = express()

const cors = require('cors')
const DB = require('./src/dao')

app.use(cors())

app.use(express.json())
// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({
    extended: true
}))

app.get('/',
    function (req, res) {
        res.writeHead(200) // optional because 200 is the default response code
        res.end('<h1>Hello World test</h1>')
    }
)

app.get('/playlist', function (request, response) {
    
    DB.connect()
    DB.query('SELECT * from playlist order by id asc', function (playlist) {
        const playlistJSON = { playlist: playlist.rows }
        const playlistJSONString = JSON.stringify(playlistJSON, null, 4)

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(playlistJSONString)
    })
})

app.get('/tracks', function (request, response) {
    DB.connect()
    DB.query('SELECT * from track order by id asc', function (track) {
        const trackJSON = { track: track.rows }
        const trackJSONString = JSON.stringify(trackJSON, null, 4)

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(trackJSONString)
    })
})

app.post('/tracks',function(request, response){
	
	const Data = {
		id: request.body.id,
		playlist_id: request.body.playlist_id,
		title: request.body.title,
		url: request.body.url,
		master_id: request.body.master_id
	}
	DB.connect()
	let insert = "INSERT into track(id, playlist_id, title, uri, master_id) VALUES($1,$2,$3,$4,$5)"
	const values = [Data.id, Data.playlist_id, Data.title, Data.url, Data.master_id]

	DB.queryParams(insert,values,()=>{
		const status = 200
		const msg = 'Success'
		const error = null
		response.writeHead(status, {
			'Content-Type':'application/json'
		})
		const trackJSONString = JSON.stringify({
			message:msg
		},4)
		response.end(trackJSONString)
		DB.disconnect()
	})
})

app.delete('/tracks/:id',function(request, response){
	const id = request.params.id
	DB.connect()
	DB.query('DELETE FROM track WHERE id=$1',[id],()=>{
		response.writeHead(200,{
			'Content-type': 'text/json'
		})
		DB.disconnect()
		const trackJSONString = JSON.stringify({
			message:'Ok track deleted'
		})
		response.end(trackJSONString)
	})
})
	

app.listen(8000, function () {
    console.log('Server listening to port 8000, go to http://localhost:8000')
})
