"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import {
  type UserNameFormValues,
  userNameSchema,
} from "@/lib/validation/user-schema"

export function NameSetupForm() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserNameFormValues>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: UserNameFormValues) => {
    setIsPending(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.updateUser({
        data: { full_name: values.name.trim() },
      })

      if (error) {
        setError("root", { message: error.message })
        return
      }

      router.refresh()
    } catch {
      setError("root", { message: "Failed to update name. Please try again." })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex-1 flex flex-col items-center justify-start">
        <div className=" flex flex-col w-full items-start space-y-8 max-w-xl">
          <div className="space-y-2.5">
            <div className="font-medium text-2xl text-center">
              Let's get started
            </div>

            <div className="text-muted-foreground">
              What should we call you?
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full flex gap-2">
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name" className="text-base sr-only">
                Full Name
              </FieldLabel>
              <Input
                id="name"
                placeholder="John Doe"
                disabled={isPending}
                {...register("name")}
              />
              <FieldError>{errors.name?.message}</FieldError>
            </Field>

            <Button
              type="submit"
              disabled={isPending}
              size="icon"
              data-testid="name-setup-submit"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <ArrowRight />
              )}
            </Button>
          </form>
          {errors.root && (
            <p className="text-sm text-destructive">{errors.root.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
