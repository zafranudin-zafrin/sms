import {Test, TestingModule} from '@nestjs/testing';
import {HttpModule, HttpService} from '@nestjs/common';
import {TwilioSmsService} from './twilio-sms.service';
import {InfobipSmsService} from '../infobip-sms/infobip-sms.service';

describe('LoansService', () => {
	let service: TwilioSmsService;
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
});
