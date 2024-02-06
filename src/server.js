const app = require('./app');
const sequelize = require('./utils/connection');
const cors = require('cors');
require("./models");
app.use(cors());



const PORT = process.env.PORT || 8080;

const main = async () => {
    try {
        sequelize.sync();
        console.log("DB connected");
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log(error)
    }
}

main();
