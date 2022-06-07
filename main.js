const MongoClient = require("mongodb").MongoClient;
const User = require("./user");

MongoClient.connect(
	// TODO: Connection 
	"mongodb+srv://m001-student:m001-mongodb-basics@/Sandbox?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB');
	User.injectDB(client);
})

const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// POST
app.post('/create', async (req, res) => {
	console.log("\nPOST Request Body : ", req.body);
	const user = await User.create(req.body.title, req.body.director, req.body.imdb);
	if (user != null) {
		console.log("Create Successful");
		res.status(200).json({
			_id: user._id,
			title: user.title,
			director: user.director,
			imdb: user.imdb,
		})
	} else {
		console.log("Create Failed");
		res.status(404).json( {error : "Create Failed"} );
	}
})

// GET
app.get('/read', async (req, res) => {
	console.log("\nGET Request Body : ", req.body);
	const user = await User.read(req.body.title);
	if (user != null) {
		console.log("Read Successful");
		res.status(200).json({
			_id: user._id,
			title: user.title,
			director: user.director,
			imdb: user.imdb,
		});
	} else {
		console.log("No user found to read");
		res.status(404).json( {error : "No user found"} );
	}
})

// PATCH
app.patch('/update', async (req, res) => {
	console.log("\nPATCH Request Body : ", req.body);
	const user = await User.update(req.body.title, req.body.director, req.body.imdb);
	if (user != null) {
		console.log("Update Successful");
		res.status(200).json({
			_id: user._id,
			title: user.title,
			director: user.director,
			imdb: user.imdb,
		})
	}
	else {
		console.log("Update Failed");
		res.status(404).json( {error : "Update Failed"} );
	}
})

// DELETE
app.delete('/delete', async (req, res) => {
	console.log("\nDELETE Request Body : ", req.body);
	const user = await User.delete(req.body.title);
	if (user != null) {
		console.log("User Deleted");
		res.status(200).json({ delete : "success"})
	}
	else {
		console.log("Delete Failed");
		res.status(404).json( {error : "Delete Failed"} );
	}
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})