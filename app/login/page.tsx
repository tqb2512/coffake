import LoginForm from "@/components/ui/login/form"

export default async function Login() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">Sign in</h1>
            <LoginForm />
        </div>
    )
}