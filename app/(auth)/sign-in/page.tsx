"use client"

import { GoogleSignIn } from "@/components/auth/google-sign-in"
import ErrorMessage from "@/components/auth/error-message"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      // magic link sign-in
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <main className="w-screen h-screen flex  items-center justify-center p-4">
      <div className="p-7 max-w-md min-w-xs text-center border border-border rounded-4xl flex flex-col gap-3">
        <GoogleSignIn />

        <div className="text-muted-foreground text-sm">OR</div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {error && <ErrorMessage text={error} />}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="animate-spin" />}
            {!isLoading && "Continue with email"}
          </Button>
        </form>

        <div className="text-xs w-full text-muted-foreground leading-relaxed">
          <span>By continuing, you acknowledge Acme&apos;s&nbsp;</span>
          <Link
            href="/#"
            className="underline hover:text-primary transition-colors duration-300"
          >
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link
            href="/#"
            className="underline hover:text-primary transition-colors duration-300"
          >
            Privacy Policy.
          </Link>
        </div>
      </div>
    </main>
  )
}
