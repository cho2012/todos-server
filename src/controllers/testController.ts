import { Request, Response } from "express";

interface Data {
  id: number;
  name: string;
}

const Send: Data = {
  id: 0,
  name: "test",
};

const test = (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: Send,
  });
};

export { test };
