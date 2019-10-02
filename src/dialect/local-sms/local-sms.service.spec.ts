import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule} from '@nestjs/common';
import {LocalSmsService} from './local-sms.service';

describe('LoansService', () => {
	let service: LocalSmsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				HttpModule,
			],
			providers: [
				LocalSmsService,
				{
					provide: 'SMS_OPTIONS',
					useValue: {
						dialect: 'infobip',
						sender: 'test',
					},
				},
			],
		}).compile();

		service = module.get<LocalSmsService>(LocalSmsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
