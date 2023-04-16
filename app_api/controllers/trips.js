const mongoose = require('mongoose');
const model = mongoose.model('trips');
const user = mongoose.model('users');


// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    model
        .find({}) // empty filter for all
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({"message": "trips not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

// GET /trips/:tripCode - returns a single trip
const tripsFindCode = async (req, res) => {
    model
        .find({'code': req.params.tripCode}) // empty filter for all
        .exec((err, trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({"message": "trip not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

const tripsAddTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {       
    model
        .create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
            (err, trip) => {
                if (err) {
                    return res
                        .status(400) // bad request
                        .json(err);
                } else {
                    return res
                        .status(201) //trip created
                        .json(trip);
                }
            });
        }    
    )
}

const tripsUpdateTrip = async (req, res) => {
    console.log(req.body);
    getUser(req, res,
        (req, res) => {    
    model
        .findOneAndUpdate({ 'code': req.params.tripCode }, {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, { new: true })
        .then(trip => {
            if (!trip) {
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
            }
            res.send(trip);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: "Trip not found with code " + req.params.tripCode
                    });
            }
            return res
                .status(500) // server error
                .json(err);
        });
    }
    )
}

const getUser = (req, res, callback) => {
    if (req.user && req.user.email) {
        console.log('req.payload.email:', req.payload.email);
        user
            .findOne({ email: req.user.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({"message": "User not found"});
                } else if (err) {
                    console.log(err);
                    return res 
                        .status(404)
                        .json(err);
                }
                callback(req, res, user.name);
            });
    } else {
        return res
            .status(404)
            .json({"message": "User not found"})
    }
}

 /* const tripsDeleteTrip = async (req, res) => {
    model.findOneAndDelete({ 'code': req.params.tripCode }).exec((err, trip) => {
        if (err) {
            return res.status(404).json(err);
        } else if (!trip) {
            return res.status(404).json({ "message": "trip not found" });
        } else {
            return res.status(200).json(trip);
        }
    }); 
}; */
   
module.exports = {
    tripsList,
    tripsFindCode,
    tripsAddTrip,
    tripsUpdateTrip
    // tripsDeleteTrip
}