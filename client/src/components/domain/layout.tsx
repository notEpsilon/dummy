import type { FC, ReactNode } from "react";
import Header from "./header";
import Container from "./container";
import { Toaster } from "../ui/sonner";
import { useSession } from "@/hooks/use-session";
import { LucideLoader2 } from "lucide-react";
import { Redirect } from "wouter";

type Props = {
  children: ReactNode;
  protectedPage?: boolean;
};

const Layout: FC<Props> = ({ children, protectedPage = false }) => {
  const { user, isLoading } = useSession();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="min-h-[calc(100vh-4rem)] bg-slate-50">
        <Container>
          {protectedPage ? (
            isLoading ? (
              <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <LucideLoader2 className="h-9 w-9 animate-spin text-black" />
              </section>
            ) : user ? (
              children
            ) : (
              <Redirect to="/login" replace />
            )
          ) : isLoading ? (
            <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
              <LucideLoader2 className="h-9 w-9 animate-spin text-black" />
            </section>
          ) : user ? (
            <Redirect to="/todos" replace />
          ) : (
            children
          )}
        </Container>
      </main>
      <Toaster />
    </div>
  );
};

export default Layout;
