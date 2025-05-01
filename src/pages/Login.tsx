
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      {/* Interactive Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="container max-w-md mx-auto px-4 py-8">
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-primary">NexCard</h1>
            <p className="text-muted-foreground">
              Log in to access your NexCard dashboard
            </p>
          </div>
          
          <div className="flex justify-center">
            <SignIn afterSignInUrl="/dashboard" />
          </div>
        </motion.div>
        
        <div className="text-center">
          <Link to="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
