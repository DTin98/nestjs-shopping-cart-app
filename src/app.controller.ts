import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { Public } from './shared/decorators/public.decorator';

@Controller()
export class AppController {
    constructor() { }

    @Get('recovery')
    @Public()
    async findAll() {
        return "Hello World";
    }
}