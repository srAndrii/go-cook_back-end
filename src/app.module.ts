import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MongooseModule } from '@nestjs/mongoose'
import { CategoriesModule } from './categories/categories.module'

import { RecipesModule } from './recipes/recipes.module'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.fd8ttcy.mongodb.net/?retryWrites=true&w=majority'),
        CategoriesModule,
        RecipesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
