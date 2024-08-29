import * as express from 'express';
import { ExpressUserRouter } from './lib/user/infrastructure/ExpressUserRouter';

const app = express();
const port = 3000;  

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(ExpressUserRouter);

app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
    }
    return res.sendStatus(500);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})