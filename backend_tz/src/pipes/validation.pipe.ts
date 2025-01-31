import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "src/exception/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform<any>{
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (metadata.type === 'body') {
            const obj = plainToClass(metadata.metatype, value);
            const errors = await validate(obj);
    
            if (errors.length) {
                let messages = errors.map(err => {
                    return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
                });
                throw new ValidationException(messages);
            }
            return value;
        }
    
        return value;
    }
    
}


// import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
// import { plainToClass } from "class-transformer";
// import { validate } from "class-validator";
// import { ValidationException } from "src/exception/validation.exception";

// @Injectable()
// export class ValidationPipe implements PipeTransform<any> {
//     async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
//         if (value.id) {
//             delete value.id;
//         }

//         console.log(metadata.metatype)
//         console.log('!'+value)

//         const obj = plainToClass(metadata.metatype, value);

//         const errors = await validate(obj);

//         if (errors.length) {
//             let messages = errors.map(err => {
//                 return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
//             });
//             throw new ValidationException(messages);
//         }

//         return value;
//     }
// }
