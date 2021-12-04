import mongoose from 'mongoose'

const conncetDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			// useCreateIndex: true,
		})

		console.log(`Mongo db connected: ${conn.connection.host}`)
	} catch(err) {
		console.log(`Error: ${err}`)
		process.exit(1)
	}
}

export default conncetDB