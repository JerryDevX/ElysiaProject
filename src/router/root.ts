import { Elysia,t } from 'elysia'
import db from '../db/database.service';



// export default db

const Data = async (body: {
    username: string;
    password: string;
}) => {
    const {username, password} = body
    console.log(username, password);

    const collection = db.collection('users');
    const user = await collection.findOne({username: username});
    console.log(user);

    if (!user) {
        await collection.insertOne({username, password});
        return 'User created';
    } else {
        return 'User exists';
    }
    
    
    
}

const rootRouter = new Elysia({prefix:'/auth'})
.get('/', () =>  'Hello, World!')
.post('/register', ({body}) => Data(body), {
    body: t.Object({
        username: t.String(),
        password: t.String()
    })
})

export default rootRouter