"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { toast } from "sonner";

interface ILoginFormProps extends React.ComponentPropsWithoutRef<"div"> {
  loginAction(formData: FormData): Promise<void | {
    error: string;
  }>;
}

export function LoginForm({
  className,
  loginAction,
  ...props
}: ILoginFormProps) {
  const [_, dispatchAction, isPending] = useActionState(
    async (_previousState: any, formData: FormData) => {
      const response = await loginAction(formData);

      if (response?.error) {
        toast.error("Invalid credentials")
        return null;
      }
    },
    null,
  );

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={dispatchAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2Icon className="animate-spin" />}
                Login
              </Button>
              <Button variant="outline" className="w-full" disabled={isPending}>
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
