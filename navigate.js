window.localStorage.setItem("video1", "videos/How_HVAC_Refrigerant_Pressure_Switches_Work_&_Troubleshooting.mp4")
window.localStorage.setItem("video2", "videos/HVAC_Online_Training_and_Courses_- _Evaporator_Pressure_Regulating_Valve_(EPR).mp4")
window.localStorage.setItem("video3", "videos/HVAC_Online_Training_and_Courses_-_Compressor_Unloader.mp4")


// initialize and call knex library
var knex = require("knex")({
    client: "sqlite3",
    connection: {
        filename: "./anl.sqlite"
    }
});


knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('fullname');
        table.string('email').unique();
        table.string('password');
        table.integer('age');
        table.integer('videosWatched').defaultTo("1");
    }).then(() => console.log("table created"))
    .catch((err) => {
        console.log(err);
        throw err
    })
    .finally(() => {
        knex.destroy();
    });


const userDetails = [{
    "fullname": "test",
    "email": "test@test.com",
    "password": "12345",
    "age": "27"
}, {
    "fullname": "test1",
    "email": "test1@test.com",
    "password": "12345",
    "age": "27"
}, {
    "fullname": "test2",
    "email": "test2@test.com",
    "password": "12345",
    "age": "27"
}];


/**
knex('users').insert(userDetails).then(() => console.log("data inserted"))
    .catch((err) => {
        console.log(err);
        throw err
    })
    .finally(() => {
        knex.destroy();
    });
 */


var loggedin = window.localStorage.getItem("loggedin")
if (loggedin == 1) {
    window.location.replace("src/dashboard.html")
} else {
    window.location.replace("src/index.html")
}
''