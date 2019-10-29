export interface SmsInterface {
	/**
	 * Set the prefix number to prepend
	 * to the mobile number (if not found)
	 *
	 * Example: Prepend '6' to 0123456789
	 * to become 60123456789
	 */
	prefixNum: string;

	/**
	 * Set the common prefix found
	 * in mobile number.
	 *
	 * Example: In malaysia, mobile number
	 * start with 0. 0123456789
	 */
	commonPrefixNum: string;

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
