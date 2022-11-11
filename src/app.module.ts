import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriesService } from './categories/categories.service'
import { CategoriesModule } from './categories/categories.module'

@Module({
    imports: [
        MongooseModule.forRoot(
            'mongodb+srv://admin:admin@cluster0.fd8ttcy.mongodb.net/?retryWrites=true&w=majority'
        ),
        CategoriesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
