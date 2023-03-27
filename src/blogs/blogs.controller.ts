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
    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateBlog(@Param('id') id: any, @Body() dto: BlogDto): Promise<Blog> {
        return this.blogService.updateBlog(id, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteBlog(@Param('id') id: any, @Body() dto: BlogDto): Promise<Blog> {
        return this.blogService.deleteBlog(id, dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('my-blogs')
    getCurrentUserBlogs(@Request() req: any): Promise<Blog[]> {
        return this.blogService.getCurrentUserBlogs(req);
    }

    @Get()
    getAllBlogs(): Promise<Blog[]> {
        return this.blogService.getAllBlogs();
    }

    @Get(':id')
    getOneBlog(@Param('id') id: any): Promise<Blog> {
        return this.blogService.getOneBlog(id);
    }
}
