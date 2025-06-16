
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Home, ArrowLeft } from 'lucide-react'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  
  const { signIn, signUp, resetPassword } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isForgotPassword) {
        const { error } = await resetPassword(email)
        
        if (error) {
          toast({
            title: "Reset Password Error",
            description: error.message,
            variant: "destructive",
          })
        } else {
          toast({
            title: "Password Reset Email Sent",
            description: "Please check your email for password reset instructions.",
          })
          setIsForgotPassword(false)
        }
      } else {
        const { error } = isSignUp 
          ? await signUp(email, password)
          : await signIn(email, password)

        if (error) {
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive",
          })
        } else {
          toast({
            title: isSignUp ? "Account Created!" : "Welcome back!",
            description: isSignUp 
              ? "Please check your email to verify your account." 
              : "You have been successfully signed in.",
          })
          if (!isSignUp) {
            navigate('/')
          }
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getTitle = () => {
    if (isForgotPassword) return 'Reset Password'
    return isSignUp ? 'Create Account' : 'Welcome Back'
  }

  const getDescription = () => {
    if (isForgotPassword) return 'Enter your email address to receive password reset instructions'
    return isSignUp 
      ? 'Enter your details to create your account'
      : 'Enter your credentials to access your dashboard'
  }

  const getButtonText = () => {
    if (isForgotPassword) return 'Send Reset Email'
    return isSignUp ? 'Create Account' : 'Sign In'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Home className="h-8 w-8" />
            <span className="text-2xl font-bold">Nest View</span>
          </div>
          <CardTitle className="text-2xl">
            {getTitle()}
          </CardTitle>
          <CardDescription>
            {getDescription()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            {!isForgotPassword && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  minLength={6}
                />
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {getButtonText()}
            </Button>
          </form>
          
          <div className="mt-4 text-center space-y-2">
            {isForgotPassword ? (
              <Button
                variant="link"
                onClick={() => setIsForgotPassword(false)}
                disabled={loading}
                className="text-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to sign in
              </Button>
            ) : (
              <>
                {!isSignUp && (
                  <Button
                    variant="link"
                    onClick={() => setIsForgotPassword(true)}
                    disabled={loading}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Forgot your password?
                  </Button>
                )}
                <div>
                  <Button
                    variant="link"
                    onClick={() => setIsSignUp(!isSignUp)}
                    disabled={loading}
                    className="text-sm"
                  >
                    {isSignUp 
                      ? 'Already have an account? Sign in'
                      : "Don't have an account? Sign up"
                    }
                  </Button>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
