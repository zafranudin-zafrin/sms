export interface SmsInterface {
	/**
	 * Send the message to the intended
	 * recipients
	 */
	send(): Promise<any>;
}

export interface SmsBody {
	from: string;

	to: string | string[];

	text: string;
}
