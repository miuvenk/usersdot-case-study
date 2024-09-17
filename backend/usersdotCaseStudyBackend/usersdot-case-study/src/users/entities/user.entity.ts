import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  @Unique(['email']) 
  export class User {
    @PrimaryGeneratedColumn() 
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    surname: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @Column({ nullable: true }) 
    phone: string;
  
    @Column({ nullable: true })
    age: number;
  
    @Column()
    country: string;
  
    @Column()
    district: string;
  
    @Column()
    role: string;
  
    @CreateDateColumn() 
    createdAt: Date;
  
    @UpdateDateColumn() 
    updatedAt: Date;
  }
  