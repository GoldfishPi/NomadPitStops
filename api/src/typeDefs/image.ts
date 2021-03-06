
import { ObjectType, Field, ID } from "type-graphql";
@ObjectType()
export class ImageType {
    @Field(() => ID)
    id:string;

    @Field(() => ID)
    uid:string;

    @Field(() => String)
    link:string;
}
