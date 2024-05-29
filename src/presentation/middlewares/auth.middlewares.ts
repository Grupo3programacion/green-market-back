import { NextFunction, Request, Response } from 'express';
import { ClienteDatasourceImpl } from '../../infraestructure/datasource/cliente.datasorce';
import { ClienteEntity } from '../../domain/entities/cliente.entity';
import { JwtAdapter } from '../../config/jwt.adapter';
import { error } from 'console';

export class AuthMiddleware {


    static async validateJWT( req: Request, res: Response, next: NextFunction ) {
  
      const authorization = req.header('Authorization');
      if( !authorization ) return res.status(401).json({ error: 'No token provided' });
      if ( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid Bearer token' });
  
      const token = authorization.split(' ').at(1) || '';
  
  
      try {
  
        const payload = await JwtAdapter.validateToken<{ id: string }>(token);
        if ( !payload ) return res.status(401).json({ error: 'Invalid token' })
        
        if(isNaN(parseInt(payload.id)))
            return res.status(401).json({error: 'Invalid id'})

        const user = await new ClienteDatasourceImpl().findById( parseInt(payload.id) );
        if ( !user ) return res.status(401).json({ error: 'Invalid token - user' });
  

        if(user.estado == 0)
            return res.status(401).json({ error: 'Usuario inactivo' });
  
        req.body.user = ClienteEntity.fromObject(user);
  
        next();
  
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
  
      }
      
    }
  }