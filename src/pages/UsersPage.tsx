import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUsers, usersQueryKey } from "../hooks/useUsers";
import UserCard from "../components/UserCard";
import StatusMessage from "../components/StatusMessage";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch, isFetching } = useUsers();

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return data ?? [];

    return (data ?? []).filter((user) =>
      user.name.toLowerCase().includes(term),
    );
  }, [data, search]);

  const handleRefetch = () => {
    refetch();
  };

  return (
    <section>
      <div className="page-hero">
        <div>
          <p className="eyebrow">Task 01 · Users List</p>
          <h1>Users Directory</h1>
          <p className="hero-text">
            Users are fetched and cached with TanStack Query.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={handleRefetch}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "↻ Refetch Users"}
        </button>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users by name..."
          />
        </div>

        <div className="query-chip">
          Query key: <code>{JSON.stringify(usersQueryKey)}</code>
        </div>
      </div>

      {isLoading && (
        <StatusMessage
          type="loading"
          title="Loading users..."
          message="Fetching data from JSONPlaceholder."
        />
      )}

      {isError && (
        <StatusMessage
          type="error"
          title="Unable to load users"
          message={error instanceof Error ? error.message : "Something went wrong."}
          action={
            <button className="primary-button small" onClick={handleRefetch}>
              Try Again
            </button>
          }
        />
      )}

      {!isLoading && !isError && filteredUsers.length === 0 && (
        <StatusMessage
          type="empty"
          title="No Users Found"
          message="Try another name."
        />
      )}

      {!isLoading && !isError && filteredUsers.length > 0 && (
        <>
          <div className="section-heading">
            <h2>{search ? "Search Results" : "All Users"}</h2>
            <span>{filteredUsers.length} users</span>
          </div>

          <div className="users-list">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </>
      )}

      <button
        className="hidden-cache-button"
        onClick={() => queryClient.invalidateQueries({ queryKey: usersQueryKey })}
      >
        Refresh from cache/query
      </button>
    </section>
  );
}