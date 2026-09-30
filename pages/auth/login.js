import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     const result = await signIn("credentials", {
  //       email,
  //       password,
  //       redirect: false,
  //     });

  //     if (result?.error) {
  //       setError(result.error);
  //     } else {
  //       router.push("/");
  //     }
  //   } catch (error) {
  //     setError("An error occurred during login");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const handleGoogleLogin = async () => {
  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     const result = await signIn("google", {
  //       callbackUrl: "/",
  //       redirect: false,
  //     });

  //     if (result?.error) {
  //       setError(result.error);
  //     } else if (result?.url) {
  //       router.push(result.url);
  //     }
  //   } catch (error) {
  //     setError("An error occurred during Google login");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
      } else if (result?.ok) {
        // Use window.location for hard redirect to ensure session loads
        window.location.href = "/";
      } else {
        setError("An unexpected error occurred");
        setIsLoading(false);
      }
    } catch (error) {
      setError("An error occurred during login");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
      // Google sign-in will handle redirect automatically
    } catch (error) {
      setError("An error occurred during Google login");
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-brand transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border border-gray-200 shadow-lg bg-surface">
            <CardHeader className="space-y-1 text-center pb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <div className="p-2 rounded-lg bg-blue-50">
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 48 48"
                    className="text-brand"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="24"
                      fill="#D4FF4F"
                      fillOpacity="0.08"
                    />
                    <path
                      d="M24 14v12l8 4"
                      stroke="#D4FF4F"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-bold text-xl text-gray-900">
                  Interview Nerd
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CardTitle className="text-3xl font-bold text-gray-900 mb-3">
                  Welcome back
                </CardTitle>
                <p className="text-gray-600 leading-relaxed">
                  Sign in to your account to continue your interview prep
                  journey
                </p>
              </motion.div>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {error && (
                  <div className="p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 font-medium"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  Continue with Google
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-surface px-4 text-gray-500 font-medium">
                      Or continue with email
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-brand/60 focus:ring-brand/50 rounded-lg transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-brand/60 focus:ring-brand/50 rounded-lg transition-all duration-300 pr-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-brand hover:text-brand hover:underline font-medium transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-neutral-950 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 bg-brand hover:bg-brand/90"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing you in...
                    </>
                  ) : (
                    "Sign In to Your Account"
                  )}
                </Button>
              </motion.form>

              <motion.div
                className="text-center text-sm pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="text-gray-600">Dont have an account? </span>
                <Link
                  href="/auth/signup"
                  className="text-brand hover:text-brand font-semibold hover:underline transition-colors"
                >
                  Create one now
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
