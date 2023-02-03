import { HttpStatus } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { ResponseError } from "src/utils/response.list";
import { DataSource } from "typeorm";

@ValidatorConstraint({ name: 'Unique', async: true })
export class UniqueRule implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) { }
  async validate(value: any, validationArguments?: ValidationArguments) {
    const [model, property = 'id', exceptField = null] = validationArguments.constraints;

    if (!value || !model) return false

    const record = await this.dataSource.getRepository(model).findOne({
      where: {
        [property]: value
      }
    })
    if (record) throw new ResponseError(`${validationArguments.property} is already exist`, HttpStatus.BAD_REQUEST).getResponse()
    if (!record) return true
    if (!exceptField) return false;
    const exceptFieldValue = (validationArguments.object as any)[exceptField];
    if (!exceptFieldValue) return false;

    return record[exceptField] === exceptFieldValue;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} is unique`
  }
}