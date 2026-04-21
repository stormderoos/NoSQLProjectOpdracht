import mongoose from 'mongoose';
import neo4j from 'neo4j-driver';
import * as bcrypt from 'bcrypt';

const MONGO_URI      = process.env['MONGO_DB_CONNECTION_STRING'] ?? '';
const NEO4J_URI      = process.env['NEO4J_URI']      ?? '';
const NEO4J_USER     = process.env['NEO4J_USER']     ?? '';
const NEO4J_PASSWORD = process.env['NEO4J_PASSWORD'] ?? '';
const NEO4J_DATABASE = process.env['NEO4J_DATABASE'] ?? '';

const userSchema = new mongoose.Schema({
  username:      { type: String, required: true },
  email:         { type: String, required: true, unique: true },
  password:      { type: String, required: true },
  role:          { type: String, enum: ['admin', 'user'], default: 'user' },
  profileImgUrl: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/219/219969.png' },
  gender:        { type: String, enum: ['male', 'female', 'unknown'], default: 'unknown' },
});

const clubSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  location:  { type: String, required: true },
  logoUrl:   { type: String },
  players:   { type: [String], default: [] },
  createdBy: { type: String },
});

const playerSchema = new mongoose.Schema({
  firstName:       { type: String, required: true },
  lastName:        { type: String, required: true },
  position:        { type: String, required: true },
  clubId:          { type: String },
  birthdate:       { type: Date, required: true },
  profileImageUrl: { type: String },
  goals:           { type: Number, default: 0 },
  assists:         { type: Number, default: 0 },
});

const scoreEntrySchema  = new mongoose.Schema({ playerId: String, goals:   { type: Number, default: 1 } });
const assistEntrySchema = new mongoose.Schema({ playerId: String, assists: { type: Number, default: 1 } });

const matchSchema = new mongoose.Schema({
  date:         { type: Date, required: true },
  location:     { type: String, required: true },
  home_club_id: { type: String, required: true },
  away_club_id: { type: String, required: true },
  score_home:   { type: Number, default: null },
  score_away:   { type: Number, default: null },
  scorers:      { type: [scoreEntrySchema],  default: [] },
  assisters:    { type: [assistEntrySchema], default: [] },
});

async function seed() {
  console.log('Verbinden met MongoDB...');
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB verbonden');

  const UserModel   = mongoose.model('User',   userSchema);
  const ClubModel   = mongoose.model('Club',   clubSchema);
  const PlayerModel = mongoose.model('Player', playerSchema);
  const MatchModel  = mongoose.model('Match',  matchSchema);

  await Promise.all([
    UserModel.deleteMany({}),
    ClubModel.deleteMany({}),
    PlayerModel.deleteMany({}),
    MatchModel.deleteMany({}),
  ]);
  console.log('Bestaande data verwijderd');

  const hashedPw = await bcrypt.hash('Test1234!', 10);
  const adminPw  = await bcrypt.hash('Admin1234!', 10);

  const [admin, user1, user2] = await UserModel.insertMany([
    { username: 'admin', email: 'admin@football.nl', password: adminPw,  role: 'admin', gender: 'male' },
    { username: 'storm', email: 'storm@football.nl', password: hashedPw, role: 'user',  gender: 'male' },
    { username: 'lisa',  email: 'lisa@football.nl',  password: hashedPw, role: 'user',  gender: 'female' },
  ]);
  console.log('Users aangemaakt');

  const [ajax, psv, feyenoord] = await ClubModel.insertMany([
    { name: 'Ajax',      location: 'Amsterdam', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/79/Ajax_crest.svg',     createdBy: admin._id.toString() },
    { name: 'PSV',       location: 'Eindhoven', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/0/05/PSV_Eindhoven.svg',  createdBy: admin._id.toString() },
    { name: 'Feyenoord', location: 'Rotterdam', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/2/23/Feyenoord_logo.svg', createdBy: user1._id.toString() },
  ]);
  console.log('Clubs aangemaakt');

  const players = await PlayerModel.insertMany([
    { firstName: 'Jordan',   lastName: 'Henderson', position: 'CM',  clubId: ajax._id.toString(),      birthdate: new Date('1990-06-17'), goals: 8,  assists: 14 },
    { firstName: 'Brian',    lastName: 'Brobbey',   position: 'ST',  clubId: ajax._id.toString(),      birthdate: new Date('2002-02-01'), goals: 22, assists: 7 },
    { firstName: 'Kenneth',  lastName: 'Taylor',    position: 'CM',  clubId: ajax._id.toString(),      birthdate: new Date('2002-05-16'), goals: 5,  assists: 9 },
    { firstName: 'Luuk',     lastName: 'de Jong',   position: 'ST',  clubId: psv._id.toString(),       birthdate: new Date('1990-08-27'), goals: 18, assists: 4 },
    { firstName: 'Joey',     lastName: 'Veerman',   position: 'CAM', clubId: psv._id.toString(),       birthdate: new Date('1998-06-10'), goals: 11, assists: 16 },
    { firstName: 'Hirving',  lastName: 'Lozano',    position: 'RW',  clubId: psv._id.toString(),       birthdate: new Date('1995-07-30'), goals: 15, assists: 11 },
    { firstName: 'Santiago', lastName: 'Gimenez',   position: 'ST',  clubId: feyenoord._id.toString(), birthdate: new Date('2001-04-18'), goals: 30, assists: 6 },
    { firstName: 'Calvin',   lastName: 'Stengs',    position: 'LW',  clubId: feyenoord._id.toString(), birthdate: new Date('1998-05-04'), goals: 10, assists: 18 },
    { firstName: 'Cody',     lastName: 'Gakpo',     position: 'LW',  clubId: undefined,                birthdate: new Date('1999-05-07'), goals: 25, assists: 13 },
    { firstName: 'Virgil',   lastName: 'van Dijk',  position: 'CB',  clubId: undefined,                birthdate: new Date('1991-07-08'), goals: 3,  assists: 2 },
  ]);
  console.log(`${players.length} spelers aangemaakt`);

  await ClubModel.findByIdAndUpdate(ajax._id,      { players: players.filter(p => p.clubId === ajax._id.toString()).map(p => p._id.toString()) });
  await ClubModel.findByIdAndUpdate(psv._id,       { players: players.filter(p => p.clubId === psv._id.toString()).map(p => p._id.toString()) });
  await ClubModel.findByIdAndUpdate(feyenoord._id, { players: players.filter(p => p.clubId === feyenoord._id.toString()).map(p => p._id.toString()) });

  const brobbey = players.find(p => p.lastName === 'Brobbey')!;
  const gimenez = players.find(p => p.lastName === 'Gimenez')!;
  const dejong  = players.find(p => p.lastName === 'de Jong')!;
  const stengs  = players.find(p => p.lastName === 'Stengs')!;

  await MatchModel.insertMany([
    {
      date: new Date('2025-10-05'),
      location: 'Johan Cruijff ArenA',
      home_club_id: ajax._id.toString(),
      away_club_id: psv._id.toString(),
      score_home: 2, score_away: 1,
      scorers:   [{ playerId: brobbey._id.toString(), goals: 2 }, { playerId: dejong._id.toString(), goals: 1 }],
      assisters: [{ playerId: players[0]._id.toString(), assists: 1 }],
    },
    {
      date: new Date('2025-11-22'),
      location: 'De Kuip',
      home_club_id: feyenoord._id.toString(),
      away_club_id: ajax._id.toString(),
      score_home: 3, score_away: 0,
      scorers:   [{ playerId: gimenez._id.toString(), goals: 2 }, { playerId: stengs._id.toString(), goals: 1 }],
      assisters: [{ playerId: stengs._id.toString(), assists: 2 }],
    },
    {
      date: new Date('2026-02-14'),
      location: 'Philips Stadion',
      home_club_id: psv._id.toString(),
      away_club_id: feyenoord._id.toString(),
      score_home: 1, score_away: 1,
      scorers:   [{ playerId: dejong._id.toString(), goals: 1 }, { playerId: gimenez._id.toString(), goals: 1 }],
      assisters: [],
    },
  ]);
  console.log('Wedstrijden aangemaakt');

  console.log('Verbinden met Neo4j AuraDB...');
  const driver  = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));
  const session = driver.session({ database: NEO4J_DATABASE });

  try {
    await session.run('MATCH (n) DETACH DELETE n');
    console.log('Bestaande Neo4j-data verwijderd');

    await session.run(`
      CREATE (:User { id: $id1, username: 'admin' }),
             (:User { id: $id2, username: 'storm' }),
             (:User { id: $id3, username: 'lisa'  })
    `, { id1: admin._id.toString(), id2: user1._id.toString(), id3: user2._id.toString() });

    await session.run(`
      CREATE (:Club { id: $id1, name: 'Ajax'      }),
             (:Club { id: $id2, name: 'PSV'       }),
             (:Club { id: $id3, name: 'Feyenoord' })
    `, { id1: ajax._id.toString(), id2: psv._id.toString(), id3: feyenoord._id.toString() });

    await session.run(`
      MATCH (a:User { id: $storm }), (b:User { id: $lisa })
      CREATE (a)-[:FOLLOWS]->(b)
    `, { storm: user1._id.toString(), lisa: user2._id.toString() });

    await session.run(`
      MATCH (a:User { id: $lisa }), (b:User { id: $storm })
      CREATE (a)-[:FOLLOWS]->(b)
    `, { storm: user1._id.toString(), lisa: user2._id.toString() });

    await session.run(`
      MATCH (u:User { id: $storm }), (c:Club { id: $ajax })
      CREATE (u)-[:FOLLOWS_CLUB]->(c)
    `, { storm: user1._id.toString(), ajax: ajax._id.toString() });

    await session.run(`
      MATCH (u:User { id: $storm }), (c:Club { id: $psv })
      CREATE (u)-[:FOLLOWS_CLUB]->(c)
    `, { storm: user1._id.toString(), psv: psv._id.toString() });

    await session.run(`
      MATCH (u:User { id: $lisa }), (c:Club { id: $feyenoord })
      CREATE (u)-[:FOLLOWS_CLUB]->(c)
    `, { lisa: user2._id.toString(), feyenoord: feyenoord._id.toString() });

    console.log('Neo4j nodes en relaties aangemaakt');
  } finally {
    await session.close();
    await driver.close();
  }

  await mongoose.disconnect();

  console.log('\nSeed klaar!');
  console.log('Login als admin:  admin@football.nl  / Admin1234!');
  console.log('Login als user:   storm@football.nl  / Test1234!');
  console.log('Login als user:   lisa@football.nl   / Test1234!');
}

seed().catch(err => {
  console.error('Seed mislukt:', err);
  process.exit(1);
});
