import { Module } from '@nestjs/common';
import * as controllers from './controllers';
import * as services from './services';
import * as repositories from './repositories';
import { JwtModule } from '@nestjs/jwt';
import { CONFIG } from './config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: CONFIG.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [...Object.values(controllers)],
  providers: [...Object.values(services), ...Object.values(repositories)],
})
export class AppModule {}
