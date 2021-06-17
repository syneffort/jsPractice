const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const assert = require('assert');

const url = 'mongodb://127.0.0.1:27017';

MongoClient.connect(url, (error, server) => {
    if (error) {
        console.log(error);
    } else {
        console.log('✨ Server connected');
        server.close();
    }
});

// InsertOne
// MongoClient.connect(url, (error, db) => {
//     if (error) {
//         console.log(error);
//     } else {
//         var testdoc = { 
//             name: 'tester1',
//             age: 34,
//             gender: 'M', 
//         };
//         db.db('testdb').collection('testcollection').insertOne(testdoc);
//         db.close();
//     }
// });

const Conn = (callback) => {
    MongoClient.connect(url, (error, server) => {
        if (error){
            console.error(error);
        } else {
            callback(server.db('testdb').collection('testcollection'));
            server.close();
        }
    });
};

// InsertOne
Conn((collection) => {
    var tester = {
        name: 'tester2',
        age: 15,
        gender: 'F',
    };
    collection.insertOne(tester);
});

// InsertMany
Conn((collection) => {
    var user1 = { name: 'user1', age: 16, gender: 'M' };
    var user2 = { name: 'user2', age: 17, gender: 'F' };
    var user3 = { name: 'user3', age: 18, gender: 'M' };
    var user4 = { name: 'user4', age: 19, gender: 'F' };
    var user5 = { name: 'user5', age: 20, gender: 'M' };
    collection.insertMany([ user1, user2, user3, user4, user5 ]);
});

// Find (all)
Conn((collection) => {
    var items = collection.find();
    items.each((error, doc) => {
        if (error) {
            console.error(error);
        } else {
            if (doc) {
                console.log(doc);
            }
        }
    });
});

// Find (by query)
Conn((collection) => {
    var qry = { gender: 'M' };
    var items = collection.find(qry);
    items.each((error, doc) => {
        if (error) {
            console.error(error);
        } else {
            if (doc) {
                console.log(doc);
            }
        }
    });
});

// Field Projection
Conn((collection) => {
    var qry = { gender: 'M' };
    var projection = { name: 1, _id: 0 };
    var items = collection.find(qry).project(projection);
    items.each((error, doc) => {
        if (error) {
            console.error(error);
        } else {
            if (doc) {
                console.log(doc);
            }
        }
    });
});

// Greater than, Less than
Conn((collection) => {
    var qry = { gender: 'F', age: {'$gte': 16, '$lte': 18} };
    var items = collection.find(qry);
    items.each((error, doc) => {
        if (error) {
            console.error(error);
        } else {
            if (doc) {
                console.log(doc);
            }
        }
    });
});

// Paging
Conn((collection) => {
    var qry = { };
    var items = collection.find(qry).skip(2).limit(4);
    items.each((error, doc) => {
        if (error) {
            console.error(error);
        } else {
            if (doc) {
                console.log(doc);
            }
        }
    });
});

// Update
Conn((collection) => {
    var qry = { name: 'user1' };
    var operator = { age: 0, gender: 'unknown' }; // name 필드는 지워짐
    var option  = { upsert: true };
    collection.update(qry, operator, option, (error, upserted) => {
        if (error) {
            console.error(error);
        } else {
            console.log('✅ update complete');
        }
    });
});

// Delete
Conn((collection) => {
    var qry = { name: undefined };
    collection.remove(qry, (error, removed) => {
        if (error) {
            console.error(error);
        } else {
            console.log('⚠️remove complete');
        }
    });
});