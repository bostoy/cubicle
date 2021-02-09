const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb+srv://dbUser:dbUserPassword@cubicle.elfpv.mongodb.net/allCubes?retryWrites=true&w=majority',
        SALT_ROUNDS: 9,
        SECRET: 'secret',
        COOKIE_NAME: 'USER_SESSION'
    },
    production: {
        PORT: 80,
        SALT_ROUNDS: 9,
        SECRET: 'Insert secret here',
        COOKIE_NAME: 'USER_SESSION'

    }
}
module.exports = config[process.env.NODE_ENV.trim()]