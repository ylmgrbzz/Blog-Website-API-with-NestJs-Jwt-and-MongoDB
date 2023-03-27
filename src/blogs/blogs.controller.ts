import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { Blog } from './schemas/blog.schema';

@Controller('blogs')
export class BlogsController {
    [x: string]: any;
    constructor(private BlogService: BlogsService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @Post()
    createBlog(@Request() req: any, @Body() dto: BlogDto): Promise<Blog> {
        return this.blogService.createBlog(req, dto);
    }
}
