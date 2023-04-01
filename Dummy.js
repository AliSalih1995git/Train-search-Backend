// Get trains by source and destination
app.get('/trains/:source/:destination', (req, res) => {
    const source = req.params.source;
    const destination = req.params.destination;
    Train.find({ source: source, destination: destination })
        .populate('source destination', 'name')
        .then(trains => {
            res.status(200).json(trains);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
// ========================
// Get trains by source and destination
app.get('/trains/:source/:destination', (req, res) => {
    const source = req.params.source;
    const destination = req.params.destination;
    Train.find({ source: source, destination: destination })
    .populate('source destination', 'name')
    .sort({ price: 1 })
    .then(trains => {
    res.status(200).json(trains);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({
    error: err
    });
    });
    });
    
    // Generate test data
    app.post('/testdata', (req, res) => {
    const stations = [
    { name: 'Station A', location: 'Location A' },
    { name: 'Station B', location: 'Location B' },
    { name: 'Station C', location: 'Location C' },
    // add more stations here...
    ];
    Station.insertMany(stations)
    .then(result => {
    const sourceStations = result;
    const destinationStations = result.filter(station => station.id !== sourceStations[0].id);
    const trains = [];
    for (let i = 0; i < 1000; i++) {
    const sourceIndex = Math.floor(Math.random() * sourceStations.length);
    const destinationIndex = Math.floor(Math.random() * destinationStations.length);
    const source = sourceStations[sourceIndex]._id;
    const destination = destinationStations[destinationIndex]._id;
    const distance = Math.floor(Math.random() * 500) + 100;
    const train = new Train({
    name: Train ${i + 1},
    source: source,
    destination: destination,
    departureTime: new Date(),
    arrivalTime: new Date(),
    distance: distance,
    price: distance * 1.25
    });
    trains.push(train);
    }
    Train.insertMany(trains)
    .then(result => {
    res.status(201).json({
    message: 'Test data generated successfully',
    stations: sourceStations.concat(destinationStations),
    trains: result
    });
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({
    error: err
    });
    });
    })
    .catch(err => {
    console.log(err);
    res.status(500).json({
    error: err
    });
    });
    });