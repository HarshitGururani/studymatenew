"use client";
import ContentWrapper from "@/components/ContentWrapper";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignIn = () => {
  return (
    <ContentWrapper className="w-full md:w-[700px] px-6 md:px-0 mt-4">
      <Tabs defaultValue="register">
        <TabsList className="grid grid-cols-2 w-full ">
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <RegisterForm />
        </TabsContent>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </ContentWrapper>
  );
};
export default SignIn;
