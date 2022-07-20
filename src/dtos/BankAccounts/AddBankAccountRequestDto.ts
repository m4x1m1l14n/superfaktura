export interface AddBankAccountRequestDto
{
	bank_account?: string;
	bank_code?: string;
	bank_name?: string;
	default?: number;
	iban?: string;
	show?: number;
	swift?: string;
}
