import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  })
  await app.listen(8080, () => console.log(`Listening to request on port 8080`))
}
bootstrap()
