let users;
class User {
	static async injectDB(conn) {
		users = await conn.db("lab7").collection("movies")
	}

	static async create(title, director, imdb) {
	    let user = await users.findOne({ "title": title });
		if (user) {
			return null;
		} else {
			await users.insertOne({"title": title, "director": director, "imdb": imdb });
			return user = await users.findOne({ "title": title });
		}
	}
	
	static async read(title) {
		let user = await users.findOne({ "title": title });
		if (user) {
			return user;
		} else {
			return null;
		}
	}

	static async update(title, director, imdb) {
		let user = await users.findOne({ "title": title });
		if (user) {
			await users.updateOne({ "title": title }, { $set: { "director": director, "imdb": imdb } });
			return user = await users.findOne({ "title": title });
		} else {
			return null;
		}
	}

	static async delete(title) {
		let user = await users.findOne({ "title": title });
		if (user) {
			await users.deleteOne({ "title": title });
			return true;
		} else {
			return null;
		}
	}
}
module.exports = User;