import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogsService {
    createBlog() {
        return 'This action adds a new blog';
    }
}
