const mongoose = require('mongoose');
const config = require('./config');
const Post = require('./models/Post');

const User = require('./models/User');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

const user =  await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
    subscriptions:[]
  }, {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    token: nanoid(),
    subscriptions:[]
  },{
  username: 'jon',
  password: '123',
  role: 'user',
  token: nanoid(),
  subscriptions:[]
});

  await Post.create({
    title: '111',
    tags:['123','fff'],
    image: 'uploads/fixtures/cpu.jpg',
    user:user[0]
  }, {
    title: '22222',
    tags:['222','222'],
    image: 'uploads/fixtures/gpu.jpg',
    user:user[1]
  }, {
    title: '33333',
    tags:['333','444'],
    image: 'uploads/fixtures/hdd.jpg',
    user:user[1]
  },{
    title: 'nooooooo',
        tags:['333','444'],
        image: 'uploads/fixtures/hdd.jpg',
        user:user[2]
  }, {
    title: '5555',
    tags:['555','777'],
    image: 'uploads/fixtures/hdd.jpg',
    user:user[0]
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});