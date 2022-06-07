const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('Express Route Test', function () {
	
	// CREATE
	it('create successfully', async () => {
		return request
			.post('/create')
			.send({ title: 'Interstellar', director: 'Christopher Nolan', imdb: "8.6" })
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body).toEqual({
					_id: expect.any(String),
					title: expect.stringMatching("Interstellar"),
					director: expect.stringMatching("Christopher Nolan"),
					imdb: expect.stringMatching("8.6"),
					})
			});
	});

	it('create failed', async () => {
		return request
			.post('/create')
			.send({ title: 'The Terminal', director: 'Steven Spielberg', imdb: "7.0" })
			.expect('Content-Type', /json/)
			.expect(404)
			.then(res => {
				expect(res.body).toEqual({error : "Create Failed"});
			});
	});

	// READ
	it('read successfully', async () => {
		return request
			.get('/read')
			.send({ title: 'Interstellar' })
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body).toEqual({
					_id: expect.any(String),
					title: expect.stringMatching("Interstellar"),
					director: expect.stringMatching("Christopher Nolan"),
					imdb: expect.stringMatching("8.6"),
					})
			});
	});

	it('read failed', async () => {
		return request
			.get('/read')
			.send({ title: 'nothing' })
			.expect('Content-Type', /json/)
			.expect(404)
			.then(res => {
				expect(res.body).toEqual({error : "No user found"});
			});
	});

	// UPDATE
	it('update successfully', async () => {
		return request
			.patch('/update')
			.send({ title: 'The Terminal' , director: 'Steven Spielberg', imdb: "7.4" })
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body).toEqual({
					_id: expect.any(String),
					title: expect.stringMatching("The Terminal"),
					director: expect.stringMatching("Steven Spielberg"),
					imdb: expect.stringMatching("7.4"),
					})
			});
	});

	it('update failed', async () => {
		return request
			.patch('/update')
			.send({ title: 'nothing' , director: 'nothing', imdb: "nothing"})
			.expect('Content-Type', /json/)
			.expect(404)
			.then(res => {
				expect(res.body).toEqual({error : "Update Failed"});
			});
	});

	// DELETE
	it('delete successfully', async () => {
		return request
			.delete('/delete')
			.send({ title: 'useless' })
			.expect('Content-Type', /json/)
			.expect(200)
			.then(res => {
				expect(res.body).toEqual({ delete : "success" })
			});
	});

	it('delete failed', async () => {
		return request
			.delete('/delete')
			.send({ title: 'nothing' })
			.expect('Content-Type', /json/)
			.expect(404)
			.then(res => {
				expect(res.body).toEqual({error : "Delete Failed"});
			});
	});
});