
import { twMerge } from "tailwind-merge";

const Page = function({
  children,
  className="",
  ...rest
}) {

  return (
    <main className={twMerge("min-h-screen page", className)} {...rest}>
      {children}
    </main>
  );
}

export default Page;

