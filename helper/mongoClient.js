import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://admin:NqDpggqZxUca1Uod@cluster0.lwbk70a.mongodb.net/?retryWrites=true&w=majority";

export default function mongoClient () {
    return new MongoClient(uri)
}