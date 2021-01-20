import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import validate = WebAssembly.validate;
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '@libs/db/models/user.model';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      // 从BearerToken里取出token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 用token还原secret
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

  // 用id查找用户信息
  async validate(id) {
    return this.userModel.findById(id);
  }
}
