import { ValidationOptions, registerDecorator } from "class-validator";
import { UniqueRule } from "./rule/UniqueRule";

function Unique(
  model: any,
  property: string = 'id',
  exceptField: string = null,
  validationOptions?: ValidationOptions
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, property, exceptField],
      validator: UniqueRule
    })
  }
}
module.exports = {
  Unique
}