import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from '../../user/interfaces/user.interface';

export const User = createParamDecorator(
    (data: unknown, req: any): IUser => {
        return req.user;
    },
);
