import { NextFunction, Request, Response } from "express";
import { UserNotFoundError } from "../domain/UserNotFoundError";
import { v4 as uuidv4 } from 'uuid';
import { ServiceContainer } from "../../shared/infrastructure/ServiceContainer";

type expressUser = {
    id?: string;
    name: string;
    email: string;
}

export class ExpressUserController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        const users = await ServiceContainer.user.getAll.run();

        return res.json(users.map((user) => user.mapToPrimitives())).status(200);
    }

    async getOneById(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.params.id);
            const user = await ServiceContainer.user.getOneById.run(req.params.id);

            return res.json(user.mapToPrimitives()).status(200);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
        }
    }

    async create(req: Request<expressUser>, res: Response, next: NextFunction) {
        console.log(req.body);
        if (!req.body) return res.sendStatus(400);

        if (!req.body.name || !req.body.email) return res.sendStatus(400);

        const id = uuidv4();
        const { name, email } = req.body;
        const createdAt = new Date();

        try {
            const user = await ServiceContainer.user.create.run(id, name, email, createdAt);
            return res.json(user).status(201);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
        }
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body) return res.sendStatus(400);
            if (!req.params.id) return res.sendStatus(400);

            const { name, email } = req.body;

            const user = await ServiceContainer.user.edit.run(req.params.id, name, email, new Date());
            return res.json(user).status(200);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
        }

    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await ServiceContainer.user.delete.run(req.params.id);
            return res.sendStatus(204);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return res.status(404).json({ message: error.message });
            }
        }
    }

}