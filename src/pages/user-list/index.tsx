import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { usersApi, UserDto } from "@/shared/api";
import { usePageLoader } from "@/app/providers/page-loader/PageLoaderProvide";
import { MainMessage } from "@/widgets/MainMessage";
import { UsersToolbar } from "@/widgets/UsersToolbar";
import { UsersTable } from "@/widgets/UsersTable";
import { Pagination } from "@/widgets/Pagination";
import { UserAddMenu } from "@/features/user-add/ui/UserAddMenu";
import { UserDeleteMenu } from "@/features/user-delete";
import { UserFilterMenu } from "@/features/user-filter";
import { syncAllUsers } from "@/shared/lib/storage";

export const UserListPage = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const email = searchParams.get("email") || undefined;

  const pageLoader = usePageLoader();
  const hasData = users.length > 0;

  const loadUsers = useCallback(async () => {
    try {
      pageLoader.show();

      const response = await usersApi.getUsers({
        page,
        email,
      });

      setUsers(response.data);
      setTotalPages(response.meta.totalPages);
    } finally {
      pageLoader.hide();
    }
  }, [page, email]);

  useEffect(() => {
    loadUsers();
    syncAllUsers();
  }, [page, email, loadUsers]);

  return (
    <>
      <MainMessage hasData={hasData} />
      <UsersToolbar
        mode="list"
        activeFilter={email}
        onAddUser={() => setIsAddOpen(true)}
        onDeleteUser={() => setIsDeleteOpen(true)}
        onFilterUser={() => setIsFilterOpen(true)}
        onResetFilter={() => {
          setSearchParams((prev) => {
            const params = new URLSearchParams(prev);
            params.delete("email");
            params.set("page", "1");
            return params;
          });
        }}
      />
      {hasData && (
        <UsersTable
          mode="list"
          users={users}
          onDeleteSuccess={async () => {
            if (page !== 1) {
              setSearchParams({ page: "1" });
            } else {
              await loadUsers();
            }
          }}
        />
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => setSearchParams({ page: String(p) })}
      />
      {isAddOpen && (
        <UserAddMenu
          onClose={() => setIsAddOpen(false)}
          onSuccess={() => {
            setIsAddOpen(false);
            setSearchParams({ page: "1" });
          }}
        />
      )}
      {isDeleteOpen && (
        <UserDeleteMenu
          onClose={() => setIsDeleteOpen(false)}
          onSuccess={() => {
            setIsDeleteOpen(false);
            setSearchParams({ page: "1" });
          }}
        />
      )}
      {isFilterOpen && (
        <UserFilterMenu
          onClose={() => setIsFilterOpen(false)}
          onSuccess={() => setIsFilterOpen(false)}
        />
      )}
    </>
  );
};
