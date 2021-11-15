require('dotenv').config()
// Credenciais
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
const dbCluster = process.env.DB_CLUSTER

export const config = {
	API_URL: 'http://localhost:5000',
	MONGO_CONNECTION:
	`mongodb+srv://${dbUser}:${dbPassword}@${dbCluster}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
}