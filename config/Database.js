const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

class Database {
	constructor() {
		this.connection = null;
	}

	connect () {
		console.log(chalk.bgHex('#589636').hex('#FFFFFF').bold(" MongoDB ") + ` >> Connecting to database...`);
        
		mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
			useUnifiedTopology: true,
		}).then(() => {
            console.log(chalk.bgHex('#589636').hex('#FFFFFF').bold(" MongoDB ") + ` >> Connected to database`);
			this.connection = mongoose.connection;
		}).catch(err => {
			console.error(err);
		});
	}
}

module.exports = Database; 
