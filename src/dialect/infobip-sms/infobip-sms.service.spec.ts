import {Test, TestingModule} from '@nestjs/testing';
import {InfobipSmsService} from './infobip-sms.service';
import {HttpModule} from '@nestjs/common';

describe('LoansService', () => {
	let service: InfobipSmsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				HttpModule,
			],
			providers: [
				InfobipSmsService,
				{
					provide: 'SMS_OPTIONS',
					useValue: {
						dialect: 'infobip',
						sender: 'test',
					},
				},
			],
		}).compile();

		service = module.get<InfobipSmsService>(InfobipSmsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
