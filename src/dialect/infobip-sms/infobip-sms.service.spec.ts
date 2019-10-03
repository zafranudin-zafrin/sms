import {Test, TestingModule} from '@nestjs/testing';
import {InfobipSmsService} from './infobip-sms.service';
import {HttpModule, HttpService} from '@nestjs/common';
import {AxiosResponse} from 'axios';
import {of} from 'rxjs';
import {CSmsModule} from '../../c-sms.module';

describe('InfobipSmsService', () => {
	let service: InfobipSmsService;
	let http: HttpService;
	beforeEach(async () => {
		http = new HttpService();
		service = new InfobipSmsService(http, {
			dialect: 'infobip',
			sender: 'test',
		});
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should send message', async () => {
		const result: AxiosResponse = {
			data: {
				name: 'Jane Doe',
				grades: [3.7, 3.8, 3.9, 4.0, 3.6],
			},
			status: 200,
			statusText: 'OK',
			headers: {},
			config: {},
		};
		jest.spyOn(http, 'post').mockImplementation((): any => {
			return of(result);
		});

		expect(await service.send()).toBe(result);
	});
});
