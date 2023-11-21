import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from 'src/schemas/role.schema';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.roleService.findOne(id);
  }
}
