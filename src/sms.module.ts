import Axios from 'axios';
import {AXIOS_INSTANCE_TOKEN, HTTP_MODULE_ID,} from './http.constants';
import {HttpService} from './http.service';
import {HttpModuleOptions,} from './interfaces';
import {DynamicModule, Module} from '@nestjs/common';

@Module({
	providers: [
		HttpService,
		{
			provide: AXIOS_INSTANCE_TOKEN,
			useValue: Axios,
		},
	],
	exports: [HttpService],
})
export class SmsModule {
	static register(config: HttpModuleOptions): DynamicModule {
		return {
			module: SmsModule,
			providers: [
				{
					provide: AXIOS_INSTANCE_TOKEN,
					useValue: Axios.create(config),
				},
				{
					provide: HTTP_MODULE_ID,
					useValue: randomStringGenerator(),
				},
			],
		};
	}
}
