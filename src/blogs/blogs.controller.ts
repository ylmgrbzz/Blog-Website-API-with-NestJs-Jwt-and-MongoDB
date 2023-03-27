import { Controller, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
    constructor(private BlogService: BlogsService) { }

    @Post()
    createBlog() {
        return this.BlogService.createBlog();
    }
}
