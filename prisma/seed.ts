import * as bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

const seed = async () => {
	const roles = await prisma.roles.createMany({
		data: [{ name: "SHIPPER" }, { name: "ADMIN" }, { name: "PILOT" }, { name: "OPERATOR" }],
	});

	const orderStatuses = await prisma.orderStatuses.createMany({
		data: [{ name: "CREATED" }, { name: "IN PROGRESS" }, { name: "DELETED" }, { name: "CANCELED" }],
	});

	const deliveryStatuses = await prisma.deliveryStatuses.createMany({
		data: [{ name: "CREATED" }, { name: "IN PROGRESS" }, { name: "DELETED" }, { name: "CANCELED" }],
	});

	const hashedAdminPassword = await bcrypt.hash("admin", 10);
	const hashedShipperPassword = await bcrypt.hash("shipper", 10);
	const hashedPilotPassword = await bcrypt.hash("pilot", 10);
	const hashedOperatorPassword = await bcrypt.hash("operator", 10);

	const users = await prisma.users.createMany({
		data: [
			{
				login: "admin",
				email: "admin@gmail.com",
				full_name: "Eva Administrator",
				password: hashedAdminPassword,
				role_id: 2,
			},
			{
				login: "shipperI",
				email: "shipperI@gmail.com",
				full_name: "User Oleg",
				password: hashedShipperPassword,
				client_type: "individual",
				role_id: 1,
			},
			{
				login: "shipperL",
				email: "shipperL@gmail.com",
				full_name: "User Oleg",
				password: hashedShipperPassword,
				client_type: "legal",
				role_id: 1,
			},
			{
				login: "pilot",
				email: "pilot@gmail.com",
				full_name: "Pilot Some",
				password: hashedPilotPassword,
				role_id: 3,
			},
			{
				login: "operator",
				email: "operator@gmail.com",
				full_name: "Operator Ivan",
				password: hashedOperatorPassword,
				role_id: 4,
			},
		],
	});

	console.log("Данные: ", {
		roles,
		users,
		orderStatuses,
		deliveryStatuses,
	});
};

seed()
	.catch((err) => {
		console.log("Error wit creating common data in db, error: ", err);
		process.exit(1);
	})
	.finally(async () => await prisma.$disconnect());
