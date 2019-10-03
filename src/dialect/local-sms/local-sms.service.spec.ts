import {HttpService} from '@nestjs/common';
import {LocalSmsService} from './local-sms.service';

describe('LoansService', () => {
	let service: LocalSmsService;
	let http: HttpService;
	beforeEach(async () => {
		http = new HttpService();
		service = new LocalSmsService(http, {
			dialect: 'infobip',
			sender: 'test',
		});
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should send message through console', async () => {
		expect(await service.send()).toBeTruthy();
	});

});
