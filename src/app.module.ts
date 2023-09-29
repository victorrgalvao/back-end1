import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { FilmeModule } from './filme/filme.module';


@Module({
  imports: [UsuarioModule,FilmeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
