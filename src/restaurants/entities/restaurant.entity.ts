import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Category } from './category.entiy';
import { User } from 'src/users/entities/user.entity';

@InputType('RestauranInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: string;

  @Field((type) => String)
  @Column()
  @IsString()
  coverImg: string;

  @Field((type) => String)
  @Column()
  @IsString()
  address: string;

  @Field((type) => Category, { nullable: true })
  @ManyToOne((type) => Category, (category) => category.restaurants, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  category: Category;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.restaurants)
  owner: User;
}
