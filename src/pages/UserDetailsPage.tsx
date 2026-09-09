import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import StatusMessage from "../components/StatusMessage";

export default function UserDetailsPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const parsedId = Number(userId);
  const isValidId = Number.isInteger(parsedId) && parsedId > 0;
  const { data: user, isLoading, isError, error, refetch, isFetching } =
    useUser(isValidId ? parsedId : null);

  if (!isValidId) {
    return (
      <section>
        <div className="page-hero">
          <div>
            <p className="eyebrow">Task 03 · User Details</p>
            <h1>Invalid User ID</h1>
            <p className="hero-text">
              The URL must contain a positive numeric user ID.
            </p>
          </div>
        </div>

        <StatusMessage
          type="error"
          title="Invalid user ID"
          message={`Received "${userId ?? "undefined"}".`}
          action={
            <Link className="primary-button small" to="/users">
              Back to Users
            </Link>
          }
        />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section>
        <div className="page-hero compact">
          <div>
            <p className="eyebrow">Task 03 · User Details</p>
            <h1>User Details</h1>
          </div>
        </div>
        <StatusMessage type="loading" title="Loading user..." />
      </section>
    );
  }

  if (isError || !user) {
    return (
      <section>
        <div className="page-hero compact">
          <div>
            <p className="eyebrow">Task 03 · User Details</p>
            <h1>User Details</h1>
          </div>
        </div>
        <StatusMessage
          type="error"
          title="User not found"
          message={error instanceof Error ? error.message : "No user exists for this ID."}
          action={
            <div className="button-row">
              <button className="primary-button small" onClick={() => refetch()}>
                Try Again
              </button>
              <button className="outline-button" onClick={() => navigate("/users")}>
                Back to Users
              </button>
            </div>
          }
        />
      </section>
    );
  }

  return (
    <section>
      <div className="page-hero compact">
        <div>
          <p className="eyebrow">Task 03 · User Details</p>
          <h1>{user.name}</h1>
          <p className="hero-text">Detailed user data loaded using a dynamic query key.</p>
        </div>

        <button
          className="primary-button"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "↻ Refresh User"}
        </button>
      </div>

      <div className="query-key-banner">
        <span>TanStack Query key</span>
        <code>{JSON.stringify(["user", parsedId])}</code>
      </div>

      <div className="details-layout">
        <article className="profile-card">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2>{user.name}</h2>
          <p>@{user.username}</p>

          <div className="profile-stat">
            <span>User ID</span>
            <strong>#{user.id}</strong>
          </div>
        </article>

        <article className="details-card">
          <h2>Contact Information</h2>
          <div className="detail-grid">
            <Detail label="Email" value={user.email} />
            <Detail label="Phone" value={user.phone} />
            <Detail label="Website" value={user.website} />
            <Detail label="City" value={user.address.city} />
          </div>

          <div className="divider" />

          <h2>Company</h2>
          <div className="company-box">
            <strong>{user.company.name}</strong>
            <span>{user.company.catchPhrase}</span>
            <small>{user.company.bs}</small>
          </div>
        </article>
      </div>

      <Link className="back-link" to="/users">
        ← Back to Users
      </Link>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="detail-item">
      <span className="label">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}