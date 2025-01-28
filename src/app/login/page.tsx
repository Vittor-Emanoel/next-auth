import { LoginForm } from "@/components/login-form";
import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/loginSchema";

export default function Page() {
	async function loginAction(formData: FormData) {
		"use server";

		const { success, data } = loginSchema.safeParse(
			Object.fromEntries(formData),
		);

		if (!success) {
			return; //tratar
		}

		console.log(data);

		const { email, password } = data;

		await signIn("credentials", {
			email,
			password,
			redirectTo: "/",
		});
	}

	return (
		<div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm loginAction={loginAction} />
			</div>
		</div>
	);
}
