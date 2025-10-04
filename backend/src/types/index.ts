// src/types/index.ts
import { Request } from 'express';

export interface JwtPayload {
    sub: string;
    cargo: string;
    name: string;
}

// ✅ NOVA INTERFACE ✅
// Ela herda tudo do tipo 'Request' do Express e adiciona a nossa propriedade.
export interface RequestWithUser extends Request {
    usuario?: JwtPayload;
}