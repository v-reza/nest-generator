import { ResponseError } from '../../utils/response.list';
import { JWTConfig } from './../../config/jwt.config';
import { LoginResponse } from './../../type/response';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RegisterSchema } from './dto/register.dto';
import { User } from 'src/resource/users/entities/user.entity';
import { RegisterResponse } from 'src/type/response';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginSchema } from './dto/login.dto';
import { compare } from 'bcrypt';
import { omit } from "lodash"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async register(registerUserDto: RegisterSchema): Promise<RegisterResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: {
          email: registerUserDto.email
        }
      })
      if (user) throw new ResponseError('User already exists', HttpStatus.BAD_REQUEST).getResponse()
      await this.userRepository.save(registerUserDto)
      return {
        message: 'User created successfully',
        status: 200
      }
    } catch (error) {
      throw new ResponseError(error.message, HttpStatus.INTERNAL_SERVER_ERROR).getResponse()
    }
  }

  async login(loginUserDto: LoginSchema): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({ where: { email: loginUserDto.email }, select: ["email", "id", "password", "username"] })
    if (!user) throw new ResponseError('User not found', HttpStatus.NOT_FOUND).getResponse()
    const isPasswordValid = await compare(loginUserDto.password, user.password)
    if (!isPasswordValid) throw new ResponseError('Invalid password', HttpStatus.BAD_REQUEST).getResponse()
    const generate = await this.generateJwt(user)

    return {
      status: HttpStatus.OK,
      message: 'Login successfully',
      access_token: generate.access_token,
    }
  }

  async generateJwt(user: User) {
    const accessToken = await this.jwtService.sign({
      sub: user.id,
      user: omit(user, ["password"])
    }, { expiresIn: JWTConfig.expiresIn, secret: JWTConfig.secret })
    return {
      access_token: accessToken,
      user: omit(user, ["password"])
    }
  }

  async validateUser(userId: string): Promise<any> {
    const findUser = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })
    if (!findUser) throw new ResponseError('User not found', HttpStatus.NOT_FOUND).getResponse()
    return findUser
  }
}
