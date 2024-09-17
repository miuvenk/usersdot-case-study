import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.createQueryBuilder('user')
      .select(['user.id', 'user.name', 'user.surname', 'user.email'])
      .getMany(); 
  }

  //WITH PAGINATION
  async getUsers(page: number = 1, pageSize: number = 10, search: string = '') {

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (search) {
      queryBuilder.andWhere(
        `user.name ILIKE :search OR 
         user.surname ILIKE :search OR 
         user.email ILIKE :search OR 
         user.phone ILIKE :search OR 
         CAST(user.age AS TEXT) ILIKE :search OR
         user.country ILIKE :search OR 
         user.district ILIKE :search OR 
         user.role ILIKE :search`,
        { search: `%${search}%` },
      );
    }

    const total = await queryBuilder.getCount();

    const users = await queryBuilder
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getMany();

      if (!users.length) {
        return {
          message: 'No users found',
          total: 0,
          page,
          pageSize,
          users: [],
        };
      }

    return {
      total,
      page,
      pageSize,
      users,
    };
  }


  async findOne(id: number): Promise<Partial<User> | null> {
    const user = await this.userRepository.createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.surname',
        'user.email',
        'user.phone',
        'user.age',
        'user.country',
        'user.district',
        'user.role',
        'user.createdAt',
        'user.updatedAt'
      ]) 
      .where('user.id = :id', { id })
      .getOne();

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
    
    return user;
  }

  async createUser(createUserDto: any): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      
    const result = await this.userRepository.createQueryBuilder()
      .insert()
      .into(User)
      .values({
        name: createUserDto.name,
        surname: createUserDto.surname,
        email: createUserDto.email,
        password: hashedPassword,
        phone: createUserDto.phone,
        age: createUserDto.age,
        country: createUserDto.country,
        district: createUserDto.district,
        role: createUserDto.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning('id') 
      .execute();

    return result.raw[0]; 
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      updateUserDto.password = hashedPassword;
    }

    await this.userRepository.createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id = :id', { id })
      .execute();

    const updatedUser = await this.userRepository.createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.surname',
        'user.email',
        'user.phone',
        'user.age',
        'user.country',
        'user.district',
        'user.role',
        'user.createdAt',
        'user.updatedAt'
      ]) 
      .where('user.id = :id', { id })
      .getOne();

    return updatedUser;
  }

  // async remove(id: number): Promise<void> {
  //   await this.userRepository.delete(id);
  // }
}
