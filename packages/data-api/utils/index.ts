import { PrismaClient, TransactionDetail } from '@prisma/client';

const prisma = new PrismaClient();

export const createWallet = async (walletAddress: string) => {
	try {
		const wallet = await prisma.wallet.findUnique({
			where: {
				address: walletAddress,
			},
		});

		if (!wallet) {
			const result = await prisma.wallet.create({
				data: {
					address: walletAddress,
				},
			});

			return result;
		} else {
			throw Error('Already have a wallet');
		}
	} catch (error) {
		console.log(error);
	}
};

export const createTransactions = async (
	transactions: TransactionDetail[]
) => {
	try {
		const result = await prisma.transactionDetail.createMany({
			data: transactions,
		});

		return result;
	} catch (error) {
		console.log(error);
	}
};

export const createAnalyzedData = async (analyzedData: any) => {
	try {
		const result = await prisma.analyzedTransaction.create({
			data: analyzedData,
		});

		return result;
	} catch (error) {
		console.log(error);
	}
};
