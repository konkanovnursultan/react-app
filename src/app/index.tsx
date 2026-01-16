import { AppRouter } from "./providers/router";
import { Header } from "../widgets/Header";
import { RequestLoaderProvider } from "./providers/request-loader/RequestLoaderProvider";
import { PageLoaderProvider } from "./providers/page-loader/PageLoaderProvide";
import { ToasterProvider } from "@/widgets/Toaster/ToasterProvider";
import { DeleteModalProvider } from "@/widgets/DeleteModal/DeleteModalProvider";

export const App = () => {
  return (
    <RequestLoaderProvider>
      <PageLoaderProvider>
        <ToasterProvider>
          <DeleteModalProvider>
            <Header />
            <AppRouter />
          </DeleteModalProvider>
        </ToasterProvider>
      </PageLoaderProvider>
    </RequestLoaderProvider>
  );
};
