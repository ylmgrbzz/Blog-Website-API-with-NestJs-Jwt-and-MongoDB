import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { BlogDto } from './dto/blog.dto';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

@Injectable()
export class BlogsService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }
    async createBlog(req: any, dto: BlogDto): Promise<Blog> {
        const currentUser = await this.userModel.findById(req.user.id);
        const newbBlog = new this.blogModel({
            title: dto.title,
            content: dto.content,
            sharedBy: currentUser.email,
            userId: currentUser._id,
        });
        const blog = await newbBlog.save();
        return blog;
    }
    async updateBlog(id: any, dto: BlogDto): Promise<Blog> {
        const blog = await this.blogModel.findById(id);
        if (dto.userId !== blog.userId) {
            throw new UnauthorizedException('You can update only your blogs!');
        }
        return await this.blogModel.findByIdAndUpdate(id, dto, { new: true });
    }

    async deleteBlog(id: any, dto: BlogDto): Promise<Blog> {
        const blog = await this.blogModel.findById(id);
        if (dto.userId !== blog.userId) {
            throw new UnauthorizedException('You can delete only your blogs!');
        }
        return await this.blogModel.findByIdAndRemove(id);
    }

    async getCurrentUserBlogs(req: any): Promise<Blog[]> {
        return await this.blogModel.find({ userId: req.user.id });
    }

    async getAllBlogs(): Promise<Blog[]> {
        return await this.blogModel.find();
    }

    async getOneBlog(id: any): Promise<Blog> {
        return await this.blogModel.findById(id);
    }
}
