import config from 'config';
import mongoose from 'mongoose';

const env = process.env.NODE_ENV;

if (env === 'production') {
  // Using mongoose to connect to MLAB database (Create new database single node free and create new user and set name and password)
  const username = config.mongo.MONGO_USER;
  const password = config.mongo.MONGO_PW;
  mongoose.connect(
    `mongodb://${username}:${password}@ds161630.mlab.com:61630/passport`
  );
} else {
  mongoose
    .connect(
      'mongodb+srv://onibenjo:' +
        process.env.MONGOPWD +
        '@amweak.nbibc.mongodb.net/amweak?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
    )
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));
  //   mongoose.connect('mongodb://localhost:27017/clean_node'),
  //     {
  //       useMongoClient: true,
  //     };
}

// Signal connection
mongoose.connection
  .once('open', function () {
    console.log('Connection has been made');
  })
  .on('error', function (error) {
    console.log('Connect error', error);
  })
  .on('disconnected', function () {
    console.log('Connection disconnected');
  });

export default mongoose;
