import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //GET ALL USERS ENDPOINT --> NEED TO BE CHANGED
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('allUsers')
  async getUsers(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('search') search: string = '',
  ) {
    return this.usersService.getUsers(page, pageSize, search);
  }

  //GET USER ENDPOINT
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Partial<User> | null> {
    return this.usersService.findOne(id);
  }

  //USER SAVE ENDPOINT
  @Post('save')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  //UPDATE USER ENDPOINT
  @Post(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(id, updateUserDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
