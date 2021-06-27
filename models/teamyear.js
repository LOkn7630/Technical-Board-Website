const mongoose = require('mongoose');

const TeamYearSchema = new mongoose.Schema({
    year : {type : String, required : true},
});

module.exports = mongoose.model("Year", TeamYearSchema);