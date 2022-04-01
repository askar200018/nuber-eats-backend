import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Category } from '../entities/category.entiy';

@ObjectType()
export class AllCategoriesOutput extends CoreOutput {
  @Field((type) => [Category], { nullable: true })
  categories?: Category[];
}
