import jwt from 'jsonwebtoken';

import 'dotenv/config';
import { env } from '../variaveisAmbiente/env';

export type IGenerateToken = {
  id: string
  email: string
  roles?: string
  id_tenant: string
  tenant_token: string
  nome_empresa_token: string
}
export const generateToken = ({
  email, roles, id_tenant, tenant_token, nome_empresa_token, id,
}: IGenerateToken) => jwt.sign(
  {
    email, roles, id_tenant, tenant_token: tenant_token.trim(), nome_empresa_token, id,
  },
  String(env.SECRET_TOKEN),
  { expiresIn: 60 * 60 * 8 }, // 8h
);
