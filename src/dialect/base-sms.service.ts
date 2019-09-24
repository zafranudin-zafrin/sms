import {HttpService, Inject, Injectable} from '@nestjs/common';
import {SmsBody, SmsOptions} from '../interfaces';

@Injectable()
export class BaseSmsService {
	protected _headers = {
		'Content-Type': 'application/json',
	};
	protected _config = {
		headers: this._headers,
	};

	constructor(
		public httpService: HttpService,
		@Inject('SMS_OPTIONS') private readonly smsOptions: SmsOptions) {
		this._body.from = smsOptions.sender;
	}

	protected _response: any = '';

	get response() {
		return this._response || 'No response';
	}

	set response(response) {
		this._response = response;
	}

	protected _body: SmsBody = {
		from: '',
		to: [],
		text: '',
	};

	get body() {
		return this._body;
	}

	get from() {
		return this._body.from;
	}

	set from(sender: string) {
		this._body.from = sender;
	}

	get to() {
		return this._body.to;
	}

	set to(recipients) {
		this._body.to = recipients;
	}

	get text() {
		return this._body.text;
	}

	set text(message) {
		this._body.text = message;
	}
}
