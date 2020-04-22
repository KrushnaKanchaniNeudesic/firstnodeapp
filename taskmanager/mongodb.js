
const {MongoClient , ObjectID} = require('mongodb');

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {

    if (error) {
        return console.log('Unable to connect database');
    }

    console.log("Mongo DB connected");

    const id = new ObjectID();
    console.log(`new object id ${id}`);
    console.log(`id time stamp ${id.getTimestamp()}`);



    const db = client.db(databaseName);
    db.collection('users').insertOne({
        _id:id,
        name: 'krishna',
        age: '27'
    }, (err, result) => {
         if(err){
           return  console.log('falied insertion');
         }
         console.log(result.ops);
    });

    db.collection('users').insertMany([
        {
            name: 'krishna',
            age: '27'
        },
        {
            name: 'chaithanya',
            age: '27'
        }], (err, result) => {
            if (err) {
                return console.log('falied insertion');
            }
            console.log(result.ops);
        });

});