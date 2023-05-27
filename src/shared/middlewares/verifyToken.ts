import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

import 'dotenv/config';
import { AppError } from '@shared/Util/AppError/AppError';
import { env } from '@shared/Util/variaveisAmbiente/VariaveisAmbiente';

interface ITokenInterface {
  email: string;
  roles: string;
  id_tenant?: string;
  tenant_token?: string;
  nome_empresa_token?: string;
  id: string;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;
  const SECRET = env.SECRET_TOKEN;

  if (!authToken) return res.status(401).json({ message: 'Token não enviado, faça seu login novamente' });

  const [Bearer, token] = authToken.split(' ');
  if (Bearer && Bearer !== 'Bearer') res.status(401).json({ message: 'Token com formato invalido !' });

  return jwt.verify(token, SECRET, (err, decoded) => {
    if (err?.message === 'jwt expired') throw new AppError('Sessão expirada, faça seu login novamente !', 401);
    if (err) throw new AppError('Token com formato invalido !', 401);

    const decodedToken = decoded as ITokenInterface;

    if (!decodedToken.id_tenant) throw new AppError('Token com formato invalido !', 401);
    if (!decodedToken.tenant_token) throw new AppError('Token com formato invalido !', 401);
    if (!decodedToken.nome_empresa_token) throw new AppError('Token com formato invalido !', 401);

    req.body.emailToken = decodedToken.email.trim();
    req.body.roles = decodedToken.roles;
    req.body.id_tenantToken = decodedToken.id_tenant.trim();
    req.body.tenant_token = decodedToken.tenant_token?.trim();
    req.body.nome_empresa_token = decodedToken.nome_empresa_token?.trim();
    req.body.id_token = decodedToken.id;

    return next();
  });
};
