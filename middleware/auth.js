// import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../index.js';



// Middleware to authenticate JWT tokens
export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET) ;
      const user = await prisma.user.findUnique({ where: { id: payload.userId } });

      if (!user) {
        return res.sendStatus(401);
      }

      req.user = user;
      next();
    } catch (error) {
      return res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
};

