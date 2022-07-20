import { BankAccount } from '../../models/BankAccount';

export interface UpdateBankAccountResponseDto
{
	error: number;
	error_message?: string;
	message: string | {
		BankAccount: BankAccount;
	}
}
