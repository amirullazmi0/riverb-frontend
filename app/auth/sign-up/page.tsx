import FormSignUp from "@/app/auth/sign-up/components/formSignUp";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
      <section className="w-full max-w-md rounded-md border border-border bg-card p-6 text-card-foreground">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your RiverB account.
          </p>
        </div>
        <FormSignUp />
      </section>
    </main>
  );
}
