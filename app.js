import express, { json } from 'express';
import { connect } from 'mongoose';
import { initialize } from 'passport';
import sessionRoutes from './routes/sessions.js';
import './config/passport.js';

const app = express();

app.use(json());
app.use(initialize());

app.use('/api/sessions', sessionRoutes);

connect('mongodb+srv://manueell:WIbJGXheEUsTF8WN@coderhouse.n5jmn.mongodb.net/?retryWrites=true&w=majority&appName=CoderHouse', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(3000, () => {
        console.log('Bien primer paso, no el último:  is running on port 3000');
    });
}).catch(err => {
    console.error('Error en base:', err);
});
