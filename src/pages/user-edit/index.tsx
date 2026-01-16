import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { usersApi, UserDto } from "@/shared/api";
import { usePageLoader } from "@/app/providers/page-loader/PageLoaderProvide";
import { MainMessage } from "@/widgets/MainMessage";
import { UsersToolbar } from "@/widgets/UsersToolbar";
import { UsersTable } from "@/widgets/UsersTable";
import { Pagination } from "@/widgets/Pagination";
import { UserEditMenu } from "@/features/user-edit/ui/UserEditMenu";
import { UserDeleteMenu } from "@/features/user-delete";
import { UserFilterMenu } from "@/features/user-filter";
import { syncAllUsers } from "@/shared/lib/storage";

export const UserEditPage = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [editUserId, setEditUserId] = useState<number | null>(null);
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
        mode="edit"
        activeFilter={email}
        onAddUser={() => setIsAddOpen(false)}
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
          mode="edit"
          users={users}
          onEdit={(id) => setEditUserId(id)}
        />
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => setSearchParams({ page: String(p) })}
      />
      {editUserId !== null && (
        <UserEditMenu
          userId={editUserId}
          onClose={() => setEditUserId(null)}
          onSuccess={async () => {
            setEditUserId(null);

            if (page !== 1) {
              setSearchParams({ page: "1" });
            } else {
              await loadUsers();
            }
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
